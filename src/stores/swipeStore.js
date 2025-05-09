import { create } from "zustand";

const useSwipeStore = create((set) => ({
  swipeIndex: 0,
  setSwipeIndex: (index) => set({ swipeIndex: index }),
}));

export default useSwipeStore;
