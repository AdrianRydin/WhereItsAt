import { create } from "zustand";

const eventsStore = create((set) => ({
  events: [],
  isLoading: false,
  error: null,
  fetchData: async () => {
    set({ isLoading: true });

    try {
      const response = await fetch(
        "https://santosnr6.github.io/Data/events.json"
      );
      const data = await response.json();

      if (Array.isArray(data)) {
        set({ events: data });
      } else if (Array.isArray(data.events)) {
        set({ events: data.events });
      } else {
        throw new Error("Not an array");
      }
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default eventsStore;
