import { getStatusColor, PulsarThemeType } from '@swingby-protocol/pulsar';
import { DateTime, Interval } from 'luxon';
import { transparentize } from 'polished';
import { FormattedDate, FormattedRelativeTime, FormattedTime } from 'react-intl';

import { TransactionStatus } from '../../../../generated/graphql';
import { CoinSymbol } from '../../../coins';
import { TStatus } from '../../index';

export const TxStatus = {
  COMPLETED: 'COMPLETED',
  REJECTED: 'REJECTED',
  CANCELED: 'CANCELED',
  WAITING: 'WAITING',
  BROADCASTED: 'BROADCASTED',
  SENDING: 'SENDING',
  PENDING: 'PENDING',
  SIGNING: 'SIGNING',
  SENT: 'SENT',
  REFUNDING: 'REFUNDING',
  SIGNING_REFUND: 'SIGNING_REFUND',
  REFUNDED: 'REFUNDED',
  SENDING_REFUND: 'SENDING_REFUND',
  EXPIRED: 'EXPIRED',
};

export const getBorderColor = ({
  status,
  theme,
}: {
  status: TStatus;
  theme: PulsarThemeType;
}): string => {
  return `2px solid ${transparentize(0.65)(getStatusColor({ status, theme }))}`;
};

export const currencyNetwork = (currency: string): string => {
  switch (currency) {
    case CoinSymbol.BTC:
      return CoinSymbol.BTC;

    case CoinSymbol.SKYPOOL_WBTC:
      return 'WBTC on Skypools';

    case CoinSymbol.SKYPOOL_SB_BTC:
      return 'sbBTC on Skypools';

    case CoinSymbol.WBTC:
      return 'WBTC on Ethereum';

    case CoinSymbol.ERC20_SB_BTC:
      return 'sbBTC on Ethereum';

    default:
      return currency;
  }
};

export const getDiffDays = (unixTimestamp: number) => {
  const ts = unixTimestamp * 1000;
  const txTime = DateTime.fromMillis(ts).toLocal();
  const now = DateTime.local();
  const diffDays = Math.floor(Math.abs(now.endOf('day').diff(txTime).as('days')));
  return <FormattedRelativeTime value={diffDays} unit="day" numeric="auto" />;
};

export const convertTxTime = (txTimeParam: number | DateTime) => {
  const txTime =
    typeof txTimeParam === 'number'
      ? DateTime.fromMillis(txTimeParam * 1000).toLocal()
      : txTimeParam;
  const ts = txTime.toMillis();

  const now = DateTime.local();
  const Ago60Mins = now.minus({ hours: 1 });

  if (Interval.fromDateTimes(Ago60Mins, now).contains(txTime)) {
    return (
      <FormattedRelativeTime
        value={(ts - Date.now()) / 1000}
        numeric="auto"
        updateIntervalInSeconds={1}
        style="short" // eslint-disable-line react/style-prop-object
      />
    );
  }

  const diffDays = Math.floor(Math.abs(now.endOf('day').diff(txTime).as('days')));
  if (diffDays < 2) {
    return (
      <>
        <FormattedTime value={ts} hourCycle="h23" />
        &nbsp;
        <FormattedRelativeTime value={-diffDays} unit="day" numeric="auto" />
      </>
    );
  }

  return (
    <FormattedDate
      value={ts}
      hour="numeric"
      minute="numeric"
      year="numeric"
      month="short"
      day="2-digit"
      hourCycle="h23"
    />
  );
};

export const convertDateTime = (unixTimestamp: number) => {
  const ts = unixTimestamp * 1000;

  return (
    <FormattedDate
      value={ts}
      hour="numeric"
      minute="numeric"
      year="numeric"
      month="short"
      day="2-digit"
      hourCycle="h23"
    />
  );
};

export const capitalize = (s: string): string => {
  if (s === TxStatus.SIGNING_REFUND) {
    return 'Signing refund';
  }
  if (s === TxStatus.SENDING_REFUND) {
    return 'Sending refund';
  }
  const word = s.toLowerCase();
  return word.charAt(0).toUpperCase() + word.slice(1);
};

export const getRequiredBlockConfirmations = (currencyIn: CoinSymbol) => {
  if (currencyIn === CoinSymbol.BTC) {
    return '< 2';
  } else {
    return '< 10';
  }
};

export const castUiStatus = (status: TransactionStatus) => {
  if (status === TxStatus.SIGNING) {
    return 'Processing';
  } else {
    return capitalize(status);
  }
};
