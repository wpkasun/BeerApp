import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Beer } from '../../types';
import { ApiParams } from '../../types';

import { getBeer, getBeerList, getRandomBeerList, searchBeerList, getBeerMetaData } from '../../api';

export const fetchBeers = createAsyncThunk('beers/fetch', async (params: ApiParams) => {
  try {
    return (await getBeerList(params)).data;
  } catch (error) {
    console.error(error);
    throw new Error('Something went wrong');
  }
});

export const fetchBeerById = createAsyncThunk('fetchBeerById', async (id: string) => {
  try {
    return await getBeer(id);
  } catch (error) {
    console.error(error);
    throw new Error('Something went wrong');
  }
});

interface State {
  query: string | null;
  beers: Beer[];
  favoriteBeers: Beer[];
  isLoading: boolean;
  error: Error | null;
  page: number;
  selectedBeer: any | null;
}

const initialState: State = {
  query: null,
  beers: [],
  favoriteBeers: [],
  isLoading: false,
  error: null,
  page: 1,
  selectedBeer: null,
};

const beersSlice = createSlice({
  name: 'beers',
  initialState,
  reducers: {
    addFavoriteBeer(state, action) {
      state.favoriteBeers.push(action.payload);
    },
    resetFavoriteBeers(state, action) {
      //const index = state.indexOf(action.payload);
      //state.splice(index, 1);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchBeers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchBeers.fulfilled, (state, action) => {
        state.beers = action.payload;
        const { page } = action.meta.arg;
        state.page = page ? page : 1;
        state.isLoading = false;
      })
      .addCase(fetchBeers.rejected, (state, action) => {
        state.isLoading = false;
        //state.error = action.error;
      });
  },
});

export default beersSlice.reducer;
export const { addFavoriteBeer } = beersSlice.actions;
