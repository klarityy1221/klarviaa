import fetch from 'node-fetch';

(async function(){
  try {
    const res = await fetch('http://localhost:4000/api/resources');
    const text = await res.text();
    console.log('Resources endpoint status:', res.status);
    let json = null;
    try { json = JSON.parse(text); console.log('Parsed resources:', json); } catch { console.log('Raw response:', text); }
    if (Array.isArray(json) && json.length > 0) {
      const r = json[0];
      const fileUrl = r.fileUrl || r.fileurl || r.file || null;
      console.log('First resource fileUrl raw:', fileUrl);
      if (fileUrl) {
        // Normalize to absolute
        const base = 'http://localhost:4000';
        const abs = fileUrl.startsWith('http') ? fileUrl : (fileUrl.startsWith('/') ? `${base}${fileUrl}` : `${base}/${fileUrl}`);
        console.log('Attempting to fetch file at', abs);
        const fr = await fetch(abs);
        console.log('File fetch status:', fr.status);
        const ct = fr.headers.get('content-type');
        console.log('Content-Type:', ct);
      }
    }
    process.exit(0);
  } catch (e) {
    console.error('Fetch failed', e && e.message ? e.message : e);
    process.exit(2);
  }
})();
