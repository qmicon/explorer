import { Tooltip, Text } from '@swingby-protocol/pulsar';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import {
  ActionButtonMetanodesContainer,
  RowText,
  TextAPR,
  TextTitle,
  TextSwapFee,
  InfoIcon,
} from './styled';

export const ActionButtonMetanodes = () => {
  const apr = 30;
  return (
    <ActionButtonMetanodesContainer>
      <RowText>
        <div>
          <TextTitle variant="accent">
            <FormattedMessage id="pool.apr" />
          </TextTitle>
          <TextAPR variant="accent">
            <FormattedMessage id="common.percent" values={{ value: ' ' + apr }} />
          </TextAPR>
        </div>
        <div>
          <TextSwapFee>
            <FormattedMessage id="metanodes.swap-fee" />
          </TextSwapFee>
          <Tooltip
            content={
              <Tooltip.Content>
                <Text variant="normal">
                  <FormattedMessage id="metanodes.swap-fee.detail" />
                </Text>
              </Tooltip.Content>
            }
            targetHtmlTag="span"
          >
            <InfoIcon />
          </Tooltip>
        </div>
      </RowText>
    </ActionButtonMetanodesContainer>
  );
};
