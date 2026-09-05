import { useState, useCallback } from 'react';

export type CartMode = 'rent' | 'buy';

export interface CartItem {
  agentId: string;
  agentName: string;
  mode: CartMode;
  days?: number;     // rent only
  qty?: number;      // buy only
  unitPrice: number;
  total: number;
}

// Simple module-level store (no external lib needed)
let _items: CartItem[] = [];
let _listeners: Array<() => void> = [];

function notify() {
  _listeners.forEach((l) => l());
}

export const cartStore = {
  getItems: () => _items,

  addItem(item: CartItem) {
    const existing = _items.findIndex(
      (i) => i.agentId === item.agentId && i.mode === item.mode
    );
    if (existing >= 0) {
      _items[existing] = item;
    } else {
      _items = [..._items, item];
    }
    notify();
  },

  removeItem(agentId: string, mode: CartMode) {
    _items = _items.filter((i) => !(i.agentId === agentId && i.mode === mode));
    notify();
  },

  clear() {
    _items = [];
    notify();
  },

  getTotal() {
    return _items.reduce((sum, i) => sum + i.total, 0);
  },

  subscribe(fn: () => void) {
    _listeners.push(fn);
    return () => {
      _listeners = _listeners.filter((l) => l !== fn);
    };
  },
};

export function useCart() {
  const [, forceUpdate] = useState(0);

  const subscribe = useCallback(() => {
    return cartStore.subscribe(() => forceUpdate((n) => n + 1));
  }, []);

  // Subscribe on first render
  useState(() => {
    const unsub = subscribe();
    return unsub;
  });

  return {
    items: cartStore.getItems(),
    total: cartStore.getTotal(),
    addItem: cartStore.addItem.bind(cartStore),
    removeItem: cartStore.removeItem.bind(cartStore),
    clear: cartStore.clear.bind(cartStore),
  };
}
