import { createAsyncThunk } from '@reduxjs/toolkit';
import { loadError, loadStart, loadSuccess } from './slice';

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

export const loadPosts = createAsyncThunk(
  'posts/load', async (_params, { dispatch }) => {
    dispatch(loadStart());

    try {
      const response = await fetch(POSTS_URL);

      if (response.ok) {
        const data = await response.json();

        dispatch(loadSuccess({ data }));
      } else {
        dispatch(loadError());
      }
    } catch (error) {
      dispatch(loadError());
    }
  }
);