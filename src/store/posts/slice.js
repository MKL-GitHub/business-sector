import { createSlice } from '@reduxjs/toolkit';

const searchParams = new URLSearchParams(window.location.search);

const initialState = {
  data: null,
  loading: 'none', // none, pending, success, error
  sortParams: {
    prop: 'id',
    isAscending: true,
  },
  params: {
    page: searchParams.get('page') || '1',
    limit: searchParams.get('limit') || '10',
    search: searchParams.get('search') || '',
  }

};

export const slice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    loadStart: state => {
      state.data = null;
      state.loading = 'pending';
    },
    loadSuccess: (state, action) => {
      state.data = action.payload.data;
      state.loading = 'success';
    },
    loadError: state => {
      state.data = null;
      state.loading = 'error';
    },
    sort: (state, actions) => {
      state.params.page = 1;
      state.sortParams = {
        prop: actions.payload.prop,
        isAscending: state.sortParams.prop === actions.payload.prop
          ? !state.sortParams.isAscending
          : false,
      };
    },
    moveToPage: (state, actions) => {
      state.params.page = actions.payload.page;
    },
    changeSearch: (state, actions) => {
      state.params.page = 1;
      state.params.search = actions.payload.search;
    }
  }
});

export const posts = slice.reducer;

export const {
  loadStart,
  loadSuccess,
  loadError,
  sort,
  moveToPage,
  changeSearch,
} = slice.actions;