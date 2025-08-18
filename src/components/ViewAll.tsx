import { useSearchParams, useNavigate } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { fetchTherapists, fetchExercises, fetchResources, resolveFileUrl } from '../api';

export default function ViewAll({ defaultType }: { defaultType?: string }) {
  const [search] = useSearchParams();
  const navigate = useNavigate();
  const typeParam = search.get('type');
  const type = (typeParam || defaultType || 'therapists').toLowerCase();
  const [items, setItems] = useState<any[]>([]);
  const [activeExercise, setActiveExercise] = useState<any | null>(null);
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<'newest' | 'alpha'>('newest');

  useEffect(() => {
    async function load() {
      try {
        if (type === 'therapists') setItems(await fetchTherapists());
        else if (type === 'exercises') setItems(await fetchExercises());
        else if (type === 'resources') setItems(await fetchResources());
        else setItems([]);
      } catch (e) { setItems([]); }
    }
    load();
  }, [type]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let arr = items.slice();
    if (q) arr = arr.filter(i => ((i.title || i.name) + ' ' + (i.category || '') + ' ' + (i.specialization || '')).toLowerCase().includes(q));
    if (sort === 'alpha') arr.sort((a, b) => ((a.title || a.name) || '').localeCompare((b.title || b.name) || ''));
    else arr.sort((a, b) => (b.id || 0) - (a.id || 0));
    return arr;
  }, [items, query, sort]);

  // subtle background tint per type
  const bgClass = type === 'therapists'
    ? 'bg-gradient-to-br from-slate-50 to-white'
    : type === 'exercises'
      ? 'bg-gradient-to-br from-white to-green-50'
      : 'bg-gradient-to-br from-white to-indigo-50';

  return (
    <div className={`${bgClass} min-h-screen py-10`}> 
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-heading font-bold text-gray-900">{type === 'therapists' ? 'Therapists' : `All ${type.charAt(0).toUpperCase() + type.slice(1)}`}</h1>
            <p className="text-gray-600 mt-1">Browse full list and view details.</p>
          </div>
          <div className="flex items-center space-x-3">
            <input value={query} onChange={e => setQuery(e.target.value)} className="px-4 py-2 rounded-lg border border-gray-200" placeholder="Search" />
            <select value={sort} onChange={e => setSort(e.target.value as any)} className="px-3 py-2 rounded-lg border border-gray-200">
              <option value="newest">Newest</option>
              <option value="alpha">A → Z</option>
            </select>
            <button className="text-gray-600" onClick={() => navigate(-1)}>Back</button>
          </div>
        </div>

        {type === 'resources' ? (
          // Group resources by type (podcast, audiobook, course, etc.)
          <div className="space-y-8">
            {Object.entries(filtered.reduce((acc: Record<string, any[]>, r: any) => {
              const k = r.type || 'other';
              (acc[k] = acc[k] || []).push(r);
              return acc;
            }, {} as Record<string, any[]>)).map(([group, list]) => (
              <div key={group}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">{group.charAt(0).toUpperCase() + group.slice(1)}</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {list.map((it: any) => {
                    const raw = it.fileUrl || '';
                    const isVideo = (it.mimeType && /^video\//i.test(it.mimeType)) || /\.(mp4|webm|mov|ogg)$/i.test(raw);
                    return (
                      <div key={it.id} className="glass-card rounded-2xl p-6 cursor-pointer transform hover:-translate-y-1 hover:shadow-2xl transition">
                        <div className="relative flex items-start space-x-4">
                          <div className="w-20 h-20 bg-gradient-to-br from-white to-gray-100 rounded-xl flex items-center justify-center overflow-hidden shrink-0">
                            {it.image ? <img src={it.image} alt={it.title} className="w-full h-full object-cover" /> : <span className="text-xl font-semibold text-gray-700">{(it.title || '').charAt(0)}</span>}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 text-lg">{it.title}</h4>
                            <p className="text-sm text-gray-600 mt-1">{it.category || ''}</p>
                            <div className="mt-3 flex items-center space-x-2">
                              <span className="inline-flex items-center px-3 py-1 bg-white/60 border border-white/30 rounded-full text-xs text-gray-700">{it.duration || '—'}</span>
                              <span className="inline-flex items-center px-3 py-1 bg-klarvia-blue/10 text-klarvia-blue rounded-full text-xs">{group}</span>
                            </div>
                          </div>
                          <div className="absolute right-4 top-4 flex items-center space-x-2">
                            <button className="bg-white/90 p-2 rounded-full shadow-sm hover:shadow-md text-gray-700 text-sm" onClick={() => {
                              // prevent parent click
                              try { window.event && (window.event as any).stopPropagation(); } catch(e){}
                              if (isVideo) navigate('/video', { state: { resource: { ...it, url: raw } } });
                              else navigate('/audio', { state: { resource: { ...it, url: raw } } });
                            }}>▶</button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((it: any) => (
              <div key={it.id} className="glass-card rounded-2xl p-6 transform hover:-translate-y-1 hover:shadow-2xl transition cursor-pointer" onClick={() => {
                if (type === 'exercises') {
                  setActiveExercise(it);
                  return;
                }
                if (it.fileUrl) {
                  // fallback: open the resource in audio/video
                  const raw = it.fileUrl || '';
                  const isV = (it.mimeType && /^video\//i.test(it.mimeType)) || /\.(mp4|webm|mov|ogg)$/i.test(raw);
                  if (isV) navigate('/video', { state: { resource: { ...it, url: raw } } });
                  else navigate('/audio', { state: { resource: { ...it, url: raw } } });
                }
              }}>
                <div className="flex items-start space-x-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-white to-gray-100 rounded-xl flex items-center justify-center overflow-hidden shrink-0">
                    {it.image ? <img src={it.image} alt={it.name || it.title} className="w-full h-full object-cover" /> : <span className="text-xl font-semibold text-gray-700">{(it.name || it.title || '').charAt(0)}</span>}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 text-lg">{it.name || it.title}</h3>
                    {it.specialization && <p className="text-sm text-gray-600">{it.specialization}</p>}
                    {it.duration && <p className="text-sm text-gray-600 mt-1">Duration: {it.duration}</p>}
                    {it.category && <p className="text-sm text-gray-600">Category: {it.category}</p>}
                    <div className="mt-3 flex items-center space-x-3">
                      {type === 'therapists' && (
                        <button className="bg-klarvia-blue text-white px-3 py-2 rounded-md text-sm" onClick={(e) => { e.stopPropagation(); navigate('/therapists/' + it.id); }}>
                          View Profile
                        </button>
                      )}
                      {it.fileUrl && <a className="text-klarvia-blue text-sm" href={resolveFileUrl(it.fileUrl)} onClick={(e) => e.stopPropagation()}>Open</a>}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {/* Exercise modal */}
        {activeExercise && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/50" onClick={() => setActiveExercise(null)} />
            <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 z-10">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-semibold">{activeExercise.title}</h2>
                  <p className="text-sm text-gray-600">{activeExercise.duration}</p>
                </div>
                <button className="text-gray-500" onClick={() => setActiveExercise(null)}>Close</button>
              </div>
              <div className="prose max-w-none text-gray-700 mb-4">{activeExercise.description || 'No description available.'}</div>
              <div className="flex justify-end space-x-3">
                <button className="px-4 py-2 rounded-lg border" onClick={() => setActiveExercise(null)}>Cancel</button>
                <button className="px-4 py-2 rounded-lg bg-klarvia-blue text-white" onClick={() => {
                  // potential navigation to a dedicated exercise page
                  setActiveExercise(null);
                  navigate('/exercise/' + activeExercise.id, { state: { exercise: activeExercise } });
                }}>Open Exercise Page</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
