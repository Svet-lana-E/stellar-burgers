import { createAsyncThunk } from '@reduxjs/toolkit';
import { FEED_SLICE_NAME } from '@constants';
import { getFeedsApi } from '@api';

export const fetchFeeds = createAsyncThunk(
  `${FEED_SLICE_NAME}/fetchFeeds`,
  async () => {
    const data = await getFeedsApi();
    return data;
  }
);
