import { SkybridgeBridge } from '@swingby-protocol/sdk';

import { IEtherscanTransaction } from '../..';
import { fetch } from '../../../fetch';

const organizeTxs = (txs: IEtherscanTransaction[], address: string) => {
  return txs.map((tx: IEtherscanTransaction) => {
    const { timeStamp, hash, value, from } = tx;
    const walletAddress = address.toLowerCase();
    return {
      hash,
      timeStamp: Number(timeStamp),
      value: from === walletAddress ? '-' + value : value,
    };
  });
};

export const fetchRecentTransaction = async (
  address: string,
  page: number,
  previousTxsWithPage,
  bridge: SkybridgeBridge,
) => {
  let txsWithPage = { data: {}, total: 0 };
  if (previousTxsWithPage !== null) {
    txsWithPage = previousTxsWithPage;
  }

  const results = await Promise.all([
    fetch<IEtherscanTransaction[] | string>(
      `/api/v1/etherscan/get-sbbtc-transaction?address=${address}&bridge=${bridge}&page=${page}`,
    ),
    fetch<IEtherscanTransaction[] | string>(
      `/api/v1/etherscan/get-sbbtc-transaction?address=${address}&bridge=${bridge}&page=${
        page + 1
      }`,
    ),
  ]);

  let fetchedHistories = [];
  let nextPageFetchedHistories = [];

  if (!results[0].ok && typeof results[0].response !== 'string') {
    fetchedHistories = results[0].response as IEtherscanTransaction[];
  }

  if (!results[1].ok && typeof results[1].response !== 'string') {
    nextPageFetchedHistories = results[1].response as IEtherscanTransaction[];
  }

  if (page === 1) {
    const res = await fetch<number>(
      `/api/v1/etherscan/get-total?address=${address}&bridge=${bridge}`,
    );
    const totalTxs = res.ok && res.response;
    txsWithPage = {
      data: {
        ...txsWithPage.data,
        [page]: fetchedHistories && organizeTxs(fetchedHistories, address),
        [page + 1]: fetchedHistories && organizeTxs(nextPageFetchedHistories, address),
      },
      total: totalTxs,
    };
  } else {
    // Memo: No need to check `total` again
    txsWithPage = {
      data: {
        ...txsWithPage.data,
        [page]: fetchedHistories && organizeTxs(fetchedHistories, address),
        [page + 1]: fetchedHistories && organizeTxs(nextPageFetchedHistories, address),
      },
      total: txsWithPage.total,
    };
  }

  return txsWithPage;
};

export const orgFloor = (value: number, decimal: number): number => {
  const base = Number(1 + '0'.repeat(decimal));
  return Math.floor(value * base) / base;
};
