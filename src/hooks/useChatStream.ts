import { useCallback, useEffect, useRef, useState } from 'react';

export default function useChatStream() {
  const [text, setText] = useState('');
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const esRef = useRef<EventSource | null>(null);

  const send = useCallback(({ userId, message }:{ userId:number, message:string }) => {
    // Close any existing stream
    if (esRef.current) {
      esRef.current.close();
      esRef.current = null;
    }
    setText('');
    setDone(false);
    setError(null);

    const params = new URLSearchParams({ userId: String(userId), message });
    const url = `/api/chat/stream?${params.toString()}`;
    const es = new EventSource(url);
    esRef.current = es;

    es.onmessage = (ev) => {
      const data = ev.data;
      if (data === '[DONE]') {
        setDone(true);
        es.close();
        esRef.current = null;
        return;
      }
      try {
        // data is JSON stringified token content
        const decoded = JSON.parse(data);
        setText(t => t + decoded);
      } catch (e) {
        // fallback: append raw
        setText(t => t + data);
      }
    };

    es.onerror = (err) => {
      setError('Stream error');
      setDone(true);
      try { es.close(); } catch (e) {}
      esRef.current = null;
    };
  }, []);

  useEffect(() => {
    return () => {
      if (esRef.current) {
        try { esRef.current.close(); } catch (e) {}
      }
    };
  }, []);

  return { text, done, error, send };
}
