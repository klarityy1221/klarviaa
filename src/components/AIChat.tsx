import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useChatStream from '../hooks/useChatStream';

type Msg = { id?: number | string; role: 'user' | 'assistant'; content: string };

export default function AIChat() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const listRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const navigate = useNavigate();
  const { text, done, error, send: sendStream } = useChatStream();

  // Load history on mount
  useEffect(() => {
    async function loadHistory() {
      try {
        const uid = Number(localStorage.getItem('userId')) || 0;
        if (!uid) return;
        const res = await fetch(`/api/history?userId=${uid}&limit=200`);
        if (!res.ok) return;
        const data = await res.json();
        setMessages(data.reverse().map((m: any) => ({ id: m.id, role: m.role as any, content: m.content })));
      } catch (e) {
        // ignore
      }
    }
    loadHistory();
  }, []);

  // Append streaming text as assistant last message
  useEffect(() => {
    if (!text) return;
    setMessages(prev => {
      const last = prev[prev.length - 1];
      if (last && last.role === 'assistant') {
        // replace last assistant content
        const copy = [...prev];
        copy[copy.length - 1] = { ...last, content: last.content + text };
        return copy;
      }
      return [...prev, { role: 'assistant', content: text }];
    });
  }, [text]);

  // When stream done, mark loading false
  useEffect(() => { if (done) setLoading(false); }, [done]);

  // Auto-scroll
  useEffect(() => { if (!listRef.current) return; listRef.current.scrollTop = listRef.current.scrollHeight; }, [messages, text]);

  function send() {
    const trimmed = input.trim();
    if (!trimmed) return;
    const uid = Number(localStorage.getItem('userId')) || 0;
    if (!uid) { navigate('/login'); return; }
    // append user message
    setMessages(m => [...m, { role: 'user', content: trimmed }]);
    setInput('');
    setLoading(true);
    // start streaming
    sendStream({ userId: uid, message: trimmed });
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow p-6 flex flex-col h-[80vh]">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">AI Therapist</h2>
          <div>
            <button onClick={() => navigate('/user')} className="text-sm text-gray-500 hover:text-gray-700">Back</button>
          </div>
        </div>

        <div ref={listRef} className="flex-1 overflow-y-auto space-y-4 p-3 border border-gray-100 rounded-lg">
          {messages.map((m, idx) => (
            <div key={m.id ?? idx} className={`p-3 rounded-lg max-w-[85%] ${m.role === 'user' ? 'bg-klarvia-blue text-white ml-auto' : 'bg-gray-100 text-gray-800'}`}>
              <div className="whitespace-pre-wrap">{m.content}</div>
            </div>
          ))}
          {loading && (
            <div className="p-3 rounded-lg bg-gray-100 text-gray-600">Typing...</div>
          )}
        </div>

        <div className="mt-4">
          <textarea
            ref={inputRef}
            rows={2}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } }}
            placeholder="Type your message and press Enter to send. Shift+Enter for a newline."
            className="w-full border border-gray-200 rounded-lg p-3 focus:ring-2 focus:ring-klarvia-blue"
          />
          <div className="flex justify-end mt-2">
            <button onClick={send} disabled={loading || !input.trim()} className="bg-klarvia-blue text-white px-4 py-2 rounded-lg">Send</button>
          </div>
        </div>
      </div>
    </div>
  );
}
