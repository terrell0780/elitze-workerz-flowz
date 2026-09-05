import { useEffect } from 'react';

type ShortcutHandler = (e: KeyboardEvent) => void;
const handlers = new Map<string, Set<ShortcutHandler>>();

export function useShortcuts() {
  const register = (key: string, handler: ShortcutHandler) => {
    if (!handlers.has(key)) handlers.set(key, new Set());
    handlers.get(key)?.add(handler);
  };

  const unregister = (key: string, handler: ShortcutHandler) => {
    handlers.get(key)?.delete(handler);
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const isCmd = e.metaKey || e.ctrlKey;
      let key = '';
      if (isCmd && e.key.toLowerCase() === 'k') key = 'cmd+k';
      if (isCmd && e.key === '/') key = 'cmd+/';
      if (isCmd && e.key.toLowerCase() === 's') key = 'cmd+s';
      if (isCmd && e.key.toLowerCase() === 'p') key = 'cmd+p';

      if (key && handlers.has(key)) {
        e.preventDefault();
        handlers.get(key)?.forEach(h => h(e));
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return { register, unregister };
}
