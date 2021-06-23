import { atom, atomFamily, selector } from "recoil";

export const cartItems = atom({
  key: "cartItems",
  default: [],
});

export const inCart = atomFamily({
  key: "inCart",
  default: false,
});

export const cartCount = selector({
  key: "cartCount",
  get: ({ get }) => {
    const items = get(cartItems);
    const count = items.reduce((acc, cur) => acc + parseInt(cur.quantity), 0);
    const total = items
      .reduce((acc, cur) => acc + cur.price * cur.quantity, 0)
      .toFixed(2);
    const checkoutPost = {
      products: items.map((item) => ({ id: item.id, quantity: item.quantity })),
    };

    return { count, total, checkoutPost };
  },
});
