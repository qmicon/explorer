import { getFiatAssetFormatter, Text, Tooltip } from '@swingby-protocol/pulsar';
import { SKYBRIDGE_BRIDGES } from '@swingby-protocol/sdk';
import { useRouter } from 'next/router';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { PulseLoader } from 'react-spinners';
import { useTheme } from 'styled-components';

import { GenerateChart } from '../../../../../components/GenerateChart';
import { LoaderComingSoon } from '../../../../../components/LoaderComingSoon';
import { PATH } from '../../../../env';
import { useGetStatsChartData, useToggleMetanode } from '../../../../hooks';
import { explorerLoadingSelector, statsSelector, usdPricesSelector } from '../../../../store';

import {
  ChartBox,
  DataDiv,
  DataRow,
  IconInfo,
  InfoContainer,
  InfosContainer,
  Left,
  Network,
  NetworkCapacity,
  NetworkLock,
  NetworkMetanodes,
  NetworkRewards,
  Right,
  Row,
  RowValidator,
  StatsInfoContainer,
  StatsWithoutChart,
  TextValue,
  ValidatorLinkSpan,
  RowReward,
} from './styled';

export const StatsInfo = () => {
  const theme = useTheme();
  const router = useRouter();
  const { locale } = useIntl();
  const { formatMessage } = useIntl();

  const formattedMetanodes = formatMessage({ id: 'metanodes.metanodes' });
  const formattedRewards = formatMessage({ id: 'home.network.rewards' });

  const stats = useSelector(statsSelector);
  const usd = useSelector(usdPricesSelector);
  const isLoading = useSelector(explorerLoadingSelector);

  const { bridge, reward, isLoading: isLoadingMetanode } = useToggleMetanode(PATH.ROOT);
  const {
    volumes,
    floatHistories,
    lockHistories,
    isLoading: isLoadingGetChart,
  } = useGetStatsChartData();

  const isLoadingAll =
    isLoading || isLoadingMetanode || isLoadingGetChart || stats.volume1wksBTC === 0;
  const placeholderLoader = (
    <PulseLoader margin={3} size={4} color={theme.pulsar.color.text.normal} />
  );

  const lockedAmount = Number(lockHistories[lockHistories.length - 1].amount);
  const floatAmount = Number(floatHistories[floatHistories.length - 1].amount);

  const rewardsTotal = reward ? reward.total : 0;
  const rewardsSwingby = reward ? reward.stakingRewards : 0;
  const rewardsSbBtcUsd = reward ? reward.networkRewards : 0;

  const dataChart = usd && [
    {
      key: 'volume',
      isLoading: isLoadingAll,
      icon: <Network />,
      description: <FormattedMessage id="home.network.volume" />,
      chart: volumes,
      value: getFiatAssetFormatter({
        locale,
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(Number(stats.volume1wksBTC) * usd.BTC),
    },
    {
      key: 'swingbyLocked',
      isLoading: isLoadingAll ? isLoadingAll : lockedAmount > 1 ? false : true,
      icon: <NetworkLock />,
      description: 'Swingby Locked',
      chart: lockHistories,
      value: getFiatAssetFormatter({
        locale,
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(lockedAmount),
    },
    {
      key: 'capacity',
      isLoading: isLoadingAll ? isLoadingAll : floatAmount > 1 ? false : true,
      icon: <NetworkCapacity />,
      description: <FormattedMessage id="home.network.capacity" />,
      chart: floatHistories,
      value: getFiatAssetFormatter({
        locale,
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(floatAmount),
    },
  ];

  const data = [
    {
      key: 'metanodes',
      isLoading: isLoadingAll ? isLoadingAll : stats.metanodes > 1 ? false : true,
      icon: <NetworkMetanodes />,
      description: formattedMetanodes,
      value: stats.metanodes,
    },
    {
      key: 'rewards',
      isLoading: isLoadingAll ? isLoadingAll : Number(rewardsTotal) > 1 ? false : true,
      icon: <NetworkRewards />,
      description: formattedRewards,
      value: getFiatAssetFormatter({
        locale,
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(Number(rewardsTotal)),
    },
  ];

  const earningSwingbyUsd = getFiatAssetFormatter({
    locale,
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Number(rewardsSwingby));

  const earningSbBtcUsd = getFiatAssetFormatter({
    locale,
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Number(rewardsSbBtcUsd));

  const loader = <LoaderComingSoon isPlaceholder={false} isSmallWindow={true} />;

  return (
    <StatsInfoContainer>
      <InfosContainer>
        {usd &&
          dataChart.map((info) => {
            return (
              <InfoContainer key={info.key}>
                <Left>
                  {info.icon}
                  <DataDiv>
                    <Row>
                      <Text variant="label">{info.description}</Text>
                    </Row>
                    {info.isLoading ? (
                      placeholderLoader
                    ) : (
                      <Row>
                        <TextValue variant="accent">{info.value}</TextValue>
                      </Row>
                    )}
                  </DataDiv>
                </Left>
                <Right>
                  <ChartBox>
                    <GenerateChart
                      chart={info.chart}
                      isLoading={info.isLoading}
                      minHeight={76}
                      loader={loader}
                      isAxis={false}
                    />
                  </ChartBox>
                </Right>
              </InfoContainer>
            );
          })}

        <StatsWithoutChart>
          {usd &&
            data.map((info) => {
              return (
                <InfoContainer key={info.key}>
                  <DataRow>
                    {info.icon}
                    <DataDiv>
                      {info.description === formattedMetanodes ? (
                        <RowValidator>
                          <Text variant="label">{info.description}</Text>
                          <ValidatorLinkSpan
                            variant="accent"
                            onClick={() =>
                              router.push({
                                pathname: PATH.METANODES,
                                query: { bridge: bridge ? bridge : SKYBRIDGE_BRIDGES[0] },
                              })
                            }
                          >
                            <FormattedMessage id="common.all" />
                          </ValidatorLinkSpan>
                        </RowValidator>
                      ) : (
                        <RowReward>
                          <Text variant="label">{info.description}</Text>
                          <Tooltip
                            content={
                              <Tooltip.Content>
                                <Text variant="accent">
                                  <FormattedMessage
                                    id="metanodes.swingby"
                                    values={{ value: earningSwingbyUsd }}
                                  />
                                </Text>
                                <br />
                                <Text variant="accent">
                                  <FormattedMessage
                                    id="metanodes.sbBTC"
                                    values={{ value: earningSbBtcUsd }}
                                  />
                                </Text>
                              </Tooltip.Content>
                            }
                            data-testid="tooltip"
                          >
                            <IconInfo />
                          </Tooltip>
                        </RowReward>
                      )}
                      {info.isLoading ? (
                        placeholderLoader
                      ) : (
                        <Row>
                          <TextValue variant="accent">{info.value}</TextValue>
                        </Row>
                      )}
                    </DataDiv>
                  </DataRow>
                </InfoContainer>
              );
            })}
        </StatsWithoutChart>
      </InfosContainer>
    </StatsInfoContainer>
  );
};
