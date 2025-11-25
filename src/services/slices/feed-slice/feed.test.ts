import { expect, describe } from '@jest/globals';
import FeedSlice, {
  feedActions,
  feedReducer,
  FeedState,
  initialState,
  feedSelectors
} from './feed';
import { configureStore } from '@reduxjs/toolkit';
import { mockOrdersData } from '../../../../mocks/feed';
import { RequestStatus } from '../../constants';

const { selectOrdersAll, selectOrdersList, selectOrdersToday } = feedSelectors;

const { fetchFeeds } = feedActions;

const mockFeedState: FeedState = {
  ordersData: {
    orders: mockOrdersData.orders,
    total: mockOrdersData.total,
    totalToday: mockOrdersData.totalToday
  },
  requestStatus: RequestStatus.SUCCESS
};

describe('feed reducer', () => {
  it('корректная инициализация', () => {
    const state = FeedSlice.reducer(undefined, { type: '' });
    expect(state).toEqual(initialState);
  });
});

describe('тесты асинхронных экшенов', () => {
  it('fetchFeeds pending', () => {
    const action = fetchFeeds.pending('', undefined);
    const newState = feedReducer(initialState, action);
    expect(newState.requestStatus).toBe(RequestStatus.LOADING);
    expect(newState.ordersData.orders).toEqual([]);
    expect(newState.ordersData.total).toBe(0);
    expect(newState.ordersData.totalToday).toBe(0);
  });

  it('fetchFeeds fulfilled', () => {
    const action = fetchFeeds.fulfilled(mockOrdersData, '', undefined);
    const newState = feedReducer(initialState, action);
    expect(newState.requestStatus).toBe(RequestStatus.SUCCESS);
    expect(newState.ordersData.orders).toEqual(mockOrdersData.orders);
    expect(newState.ordersData.total).toBe(mockOrdersData.total);
    expect(newState.ordersData.totalToday).toBe(mockOrdersData.totalToday);
  });

  it('fetchFeeds rejected', () => {
    const error = new Error('Error');
    const action = fetchFeeds.rejected(error, '', undefined);

    const newState = feedReducer(initialState, action);
    expect(newState.requestStatus).toBe(RequestStatus.FAILED);
    expect(newState.ordersData.orders).toEqual([]);
    expect(newState.ordersData.total).toBe(0);
    expect(newState.ordersData.totalToday).toBe(0);
  });
});

describe('тесты селекторов feedSlice', () => {
  const store = configureStore({
    reducer: {
      feed: feedReducer
    },
    preloadedState: {
      feed: mockFeedState
    }
  });

  it('получение общего количества заказов', () => {
    const ordersAll = selectOrdersAll(store.getState());
    expect(ordersAll).toEqual(mockFeedState.ordersData.total);
  });

  it('получение количества заказов за сегодня', () => {
    const ordersToday = selectOrdersToday(store.getState());
    expect(ordersToday).toEqual(mockFeedState.ordersData.totalToday);
  });

  it('получение общего списка заказов', () => {
    const ordersList = selectOrdersList(store.getState());
    expect(ordersList).toHaveLength(mockFeedState.ordersData.orders.length);
    expect(ordersList).toEqual(mockFeedState.ordersData.orders);
  });
});
