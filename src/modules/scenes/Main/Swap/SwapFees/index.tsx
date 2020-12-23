import { Text } from '@swingby-protocol/pulsar';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';

import { calculateFixedFee, TTxRawObject } from '../../../../explorer';

import { Coin, CoinContainer, Row, SwapFeesContainer, TitleText } from './styled';

interface Props {
  tx: TTxRawObject;
}

export const SwapFees = (props: Props) => {
  const { tx } = props;
  const explorer = useSelector((state) => state.explorer);
  const { transactionFees } = explorer;
  const calculatedFees = transactionFees && calculateFixedFee(tx.feeCurrency, transactionFees);
  return (
    <SwapFeesContainer>
      <TitleText variant="accent">
        <FormattedMessage id="swap.swapFees" />
      </TitleText>
      <Row>
        <CoinContainer>
          <Coin symbol={tx.feeCurrency} />
          <Text variant="accent"> {tx.fee}</Text>
        </CoinContainer>
        <Text variant="masked">
          {calculatedFees && calculatedFees.fixedFee}% +{' '}
          {calculatedFees && calculatedFees.feePercent} {tx.feeCurrency}
        </Text>
      </Row>
    </SwapFeesContainer>
  );
};
