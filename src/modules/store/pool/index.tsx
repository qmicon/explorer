import { Reducer } from 'redux';

import { PoolMode } from '../../pool';

enum Actions {
  SetBalanceLP = 'Pool/SET_BALANCE_LP',
  TogglePoolMode = 'Pool/TOGGLE_POOL_MODE',
  GetRecentTxs = 'Pool/GET_RECENT_TXS',
  ResetPoolState = 'Pool/RESET_POOL_STATE',
  GetMinimumWithdrawAmount = 'Pool/GET_MINIMUM_WITHDRAW_AMOUNT',
}

const initialState = {
  mode: PoolMode.Summary,
  recentTxs: null,
  minimumWithdrawAmount: null,
};

type State = typeof initialState;

export const pool: Reducer<State, Action> = (state = initialState, action) => {
  if (action.type === Actions.TogglePoolMode) {
    return { ...state, mode: action.data };
  }
  if (action.type === Actions.GetRecentTxs) {
    return { ...state, recentTxs: action.data };
  }

  if (action.type === Actions.GetMinimumWithdrawAmount) {
    return { ...state, minimumWithdrawAmount: action.data };
  }

  if (action.type === Actions.ResetPoolState) {
    return initialState;
  }

  return state;
};

export const resetPoolState = () => ({ type: Actions.ResetPoolState } as const);

export const togglePoolMode = (data: PoolMode) => ({ type: Actions.TogglePoolMode, data } as const);

export const getRecentTxs = (data) => ({ type: Actions.GetRecentTxs, data } as const);

export const getMinimumWithdrawAmount = (data) =>
  ({ type: Actions.GetMinimumWithdrawAmount, data } as const);

type Action =
  | ReturnType<typeof resetPoolState>
  | ReturnType<typeof togglePoolMode>
  | ReturnType<typeof getRecentTxs>
  | ReturnType<typeof getMinimumWithdrawAmount>;

export {
  poolMinimumWithdrawAmountSelector,
  poolModeSelector,
  poolRecentTxsSelector,
  poolSelector,
} from './selectors';
