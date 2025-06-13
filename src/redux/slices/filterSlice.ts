import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface FilterState {
  keywords: string[];
  searchInput: string;
  minPrice: number;
  maxPrice: number;
  categories: string[];
  sortByPrice: "priceLowHigh" | "priceHighLow";
  sortByDate: "dateNewOld" | "dateOldNew";
  sorybyAlphabetic: string;
}

const initialState: FilterState = {
  keywords: [],
  searchInput: "",
  minPrice: 0,
  maxPrice: 10000,
  categories: [],
  sortByPrice: "priceLowHigh",
  sortByDate: "dateNewOld",
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

    removeKeyword: (state, action: PayloadAction<string>) => {
      state.keywords = state.keywords.filter((k) => k !== action.payload);
    },
    setPriceRange: (
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
    setSortByDate: (
      state,
      action: PayloadAction<FilterState["sortByDate"]>
    ) => {
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
  removeKeyword,
  setPriceRange,
  setCategories,
  toggleCategory,
  setSortByPrice,
  setSortByAlphabetic,
  setSortByDate,
  clearFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
