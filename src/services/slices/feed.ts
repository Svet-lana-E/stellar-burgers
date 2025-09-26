import { createSlice } from '@reduxjs/toolkit';
import { FEED_SLICE_NAME, RequestStatus } from '../constants';
import { TFeedsResponse } from '@api';
import { fetchFeeds } from '../thunk/feedThunk';

interface FeedState {
  ordersData: Omit<TFeedsResponse, 'success'>;
  requestStatus: RequestStatus;
}

const initialState: FeedState = {
  ordersData: {
    orders: [],
    total: 0,
    totalToday: 0
  },
  requestStatus: RequestStatus.IDLE
};

const FeedSlice = createSlice({
  name: FEED_SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFeeds.pending, (state) => {
        state.requestStatus = RequestStatus.LOADING;
      })
      .addCase(fetchFeeds.fulfilled, (state, action) => {
        state.ordersData = action.payload;
        state.requestStatus = RequestStatus.SUCCESS;
      });
  },
  selectors: {
    selectOrdersList: (state) => state.ordersData.orders,
    selectOrdersAll: (state) => state.ordersData.total,
    selectOrdersToday: (state) => state.ordersData.totalToday
  }
});

export const feedSelectors = FeedSlice.selectors;
export default FeedSlice;
