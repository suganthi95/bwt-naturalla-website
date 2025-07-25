import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface FilterState {
  keywords: string[];
  searchInput: string;
  minPrice: number;
  maxPrice: number;
  categories: string[];
  sortByPrice: string;
  sortByDate: string;
  sorybyAlphabetic: string;
}

const getStoredPrice = () => {
  const saved = localStorage.getItem("priceRange");
  if (saved) {
    const pasrsed = JSON.parse(saved);
    if (pasrsed?.min_price !== undefined && pasrsed?.max_price !== undefined) {
      return pasrsed;
    }
  }
};
const initialState: FilterState = {
  keywords: [],
  searchInput: "",
  minPrice: getStoredPrice()?.min_price,
  maxPrice: getStoredPrice()?.max_price,
  categories: [],
  sortByPrice: "",
  sortByDate: "",
  sorybyAlphabetic: "",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setSearchInput: (state, action: PayloadAction<string>) => {
      state.searchInput = action.payload;
    },
    addKeywords: (state, action: PayloadAction<string[]>) => {
      action.payload.forEach((keyword) => {
        if (!state.keywords.includes(keyword)) {
          state.keywords.push(keyword);
        }
      });
    },
    addKeyword: (state, action: PayloadAction<string>) => {
      const keyword = action.payload.trim().toLowerCase();
      const existingItem = state.keywords.includes(keyword);
      if (!existingItem) {
        state.keywords.push(keyword);
      }
    },
    removeKeyword: (state, action: PayloadAction<string>) => {
      state.keywords = state.keywords.filter(
        (k) => k.toLowerCase().trim() !== action.payload.toLowerCase().trim()
      );
    },
    setPriceRanges: (
      state,
      action: PayloadAction<{ min: number; max: number }>
    ) => {
      state.minPrice = action.payload.min;
      state.maxPrice = action.payload.max;
    },
    setCategories: (state, action: PayloadAction<string[]>) => {
      state.categories = action.payload;
    },
    toggleCategory: (state, action: PayloadAction<string>) => {
      const index = state.categories.indexOf(action.payload);
      if (index >= 0) state.categories.splice(index, 1);
      else state.categories.push(action.payload);
    },
    setSortByPrice: (
      state,
      action: PayloadAction<FilterState["sortByPrice"]>
    ) => {
      state.sortByPrice = action.payload;
    },
    setSortDate: (state, action: PayloadAction<string>) => {
      state.sortByDate = action.payload;
    },
    setSortByAlphabetic: (
      state,
      action: PayloadAction<FilterState["sorybyAlphabetic"]>
    ) => {
      state.sorybyAlphabetic = action.payload;
    },
    clearFilters: () => initialState,
  },
});

export const {
  setSearchInput,
  addKeywords,
  addKeyword,
  removeKeyword,
  setPriceRanges,
  setCategories,
  toggleCategory,
  setSortByPrice,
  setSortByAlphabetic,
  setSortDate,
  clearFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
