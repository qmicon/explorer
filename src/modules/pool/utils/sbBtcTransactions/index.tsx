import { CONTRACTS, SkybridgeBridge } from '@swingby-protocol/sdk';
import { AbiItem } from 'web3-utils';

import { CoinSymbol } from '../../../coins';
import { CONTRACT_SB_BTC, mode } from '../../../env';
import { createWeb3Instance, getUserBal } from '../../../web3';

export const getSbBtcContract = (bridge: SkybridgeBridge) => {
  switch (bridge) {
    case 'btc_erc':
      return CONTRACT_SB_BTC;

    default:
      return CONTRACT_SB_BTC;
  }
};

export const getSbBTCBalance = async (
  userAddress: string,
  bridge: SkybridgeBridge,
): Promise<number> => {
  try {
    const web3 = createWeb3Instance({ mode, bridge });
    const currency = CoinSymbol.ERC20_SB_BTC;
    const contract = new web3.eth.Contract(
      CONTRACTS.coins[currency].production.abi as AbiItem[],
      CONTRACTS.coins[currency][mode].address,
    );
    const bal = await getUserBal({ address: userAddress, contract });
    return Number(bal);
  } catch (error) {
    return 0;
  }
};
