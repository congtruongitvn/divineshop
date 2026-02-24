'use client';
import { createContext, useContext, useState, useEffect } from 'react';

interface CartItem { id: number; name: string; price: number; image?: string; quantity: number; slug?: string; }
interface CartCtx { items: CartItem[]; add: (item: CartItem) => void; remove: (id: number) => void; update: (id: number, qty: number) => void; clear: () => void; total: number; count: number; }

const CartContext = createContext<CartCtx>({ items: [], add: () => {}, remove: () => {}, update: () => {}, clear: () => {}, total: 0, count: 0 });

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('cart');
    if (saved) setItems(JSON.parse(saved));
  }, []);

  const save = (newItems: CartItem[]) => {
    setItems(newItems);
    localStorage.setItem('cart', JSON.stringify(newItems));
  };

  const add = (item: CartItem) => {
    const exists = items.find(i => i.id === item.id);
    if (exists) {
      save(items.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i));
    } else {
      save([...items, { ...item, quantity: 1 }]);
    }
  };

  const remove = (id: number) => save(items.filter(i => i.id !== id));
  const update = (id: number, qty: number) => {
    if (qty <= 0) return remove(id);
    save(items.map(i => i.id === id ? { ...i, quantity: qty } : i));
  };
  const clear = () => save([]);

  const total = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const count = items.reduce((s, i) => s + i.quantity, 0);

  return <CartContext.Provider value={{ items, add, remove, update, clear, total, count }}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);
