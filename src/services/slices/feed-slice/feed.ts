import { createSlice } from '@reduxjs/toolkit';
import { FEED_SLICE_NAME, RequestStatus } from '../../constants';
import { TFeedsResponse } from '../../../utils/burger-api';
import { fetchFeeds } from '../../thunk/feedThunk';

export interface FeedState {
  ordersData: Omit<TFeedsResponse, 'success'>;
  requestStatus: RequestStatus;
}

export const initialState: FeedState = {
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
      })
      .addCase(fetchFeeds.rejected, (state) => {
        state.requestStatus = RequestStatus.FAILED;
      });
  },
  selectors: {
    selectOrdersList: (state) => state.ordersData.orders,
    selectOrdersAll: (state) => state.ordersData.total,
    selectOrdersToday: (state) => state.ordersData.totalToday
  }
});

export const feedActions = { ...FeedSlice.actions, fetchFeeds };
export const feedSelectors = FeedSlice.selectors;
export const feedReducer = FeedSlice.reducer;
export default FeedSlice;
