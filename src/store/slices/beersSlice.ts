import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Beer } from '../../types';
import { ApiParams } from '../../types';

import { getBeer, getBeerList, getRandomBeerList, searchBeerList, getBeerMetaData } from '../../api';

export const fetchBeers = createAsyncThunk('beers/fetch', async (params?: ApiParams) => {
  try {
    return (await getBeerList(params)).data;
  } catch (error) {
    console.error(error);
    throw new Error('Something went wrong');
  }
});

/*interface FetchMoviesFunction {
    (options: { page: number; query: string }): Promise<any>; // Replace 'any' with the actual type of your response
  }
  
  const fetchMovies: FetchMoviesFunction = async ({ page, query }) => {
    try {
      return await getMoviesByQuery(page, query);
    } catch (error) {
      console.error(error);
      throw new Error("Something went wrong");
    }
  };*/

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
  data: Beer[]; // Replace 'any' with the actual type of your data
  isLoading: boolean;
  error: Error | null;
  page: number;
  hasNextPage: boolean;
  selectedBeer: any | null; // Replace 'any' with the actual type of your selected movie
}

const initialState: State = {
  query: null,
  data: [],
  isLoading: false,
  error: null,
  page: 1,
  hasNextPage: false,
  selectedBeer: null,
};

const beersSlice = createSlice({
  name: 'beers',
  initialState,
  reducers: {
    setQuery(state, action) {
      state.query = action.payload;
      state.page = 1;
      state.data = [];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchBeers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchBeers.fulfilled, (state, action) => {
        state.data = action.payload;
        console.log(action.payload);
        state.page += 1;
        state.isLoading = false;
      })
      .addCase(fetchBeers.rejected, (state, action) => {
        state.isLoading = false;
        //state.error = action.error;
      });
    /*.addCase(fetchMovieById.pending, (state) => {
        state.selectedMovie = null;
        state.error = null;
        state.isLoading = true;
      })
      .addCase(fetchMovieById.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.Response === "True") {
          state.selectedMovie = action.payload;
        } else {
          state.error = action.payload?.Error;
        }
      })
      .addCase(fetchMovieById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })*/
  },
});

export default beersSlice.reducer;
