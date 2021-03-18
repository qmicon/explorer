export { useInterval } from './useInterval';
export { useRunCountDown } from './useRunCountDown';
export { useLinkToWidget } from './useLinkToWidget';
export { useToggleBridge } from './useToggleBridge';
export { usePoolWithdrawCoin } from './usePoolWithdrawCoin';

export interface ICountdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}
