import { create } from "zustand";

interface SearchQueryStore {
  search: string;
  setSearchQuery: (searchQuery: string) => void;
}

const useStore = create<SearchQueryStore>((set) => ({
  search: "Believe",
  setSearchQuery: (searchQuery) => set(() => ({ search: searchQuery })),
}));

export default useStore;
