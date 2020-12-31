import { CoinIcon, Dropdown, Text, TextInput } from '@swingby-protocol/pulsar';
import { rem } from 'polished';
import styled from 'styled-components';

import { StylingConstants } from '../../../../styles';

const { media } = StylingConstants;

interface DropDownProps {
  isDarkMode: boolean;
}
interface ReceivingAddressProps {
  isERC20: boolean;
}

export const AddLiquidityContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (min-width: ${rem(media.md)}) {
    height: ${({ theme }) => rem(420)};
  }
`;

export const Box = styled.div`
  border-radius: 0.75em;
  border: 1px solid ${({ theme }) => theme.pulsar.color.border.normal};
  margin-top: ${({ theme }) => rem(theme.pulsar.size.room)};
  @media (min-width: ${rem(media.md)}) {
    margin-top: 0;
  }
`;

export const ColumnForm = styled.div`
  width: 100%;
  margin-top: ${({ theme }) => rem(theme.pulsar.size.town)};
  margin-bottom: ${({ theme }) => rem(theme.pulsar.size.town)};
  margin-left: ${({ theme }) => rem(theme.pulsar.size.closet)};
  margin-right: ${({ theme }) => rem(theme.pulsar.size.closet)};
  @media (min-width: ${rem(media.sm)}) {
    width: ${rem(460)};
  }
  margin-right: ${({ theme }) => rem(theme.pulsar.size.street)};
  @media (min-width: ${rem(media.md)}) {
    margin-left: ${({ theme }) => rem(theme.pulsar.size.street)};
    margin-right: ${({ theme }) => rem(theme.pulsar.size.street)};
  }
  @media (min-width: ${rem(media.lg)}) {
    margin-left: ${({ theme }) => rem(theme.pulsar.size.city)};
    margin-right: ${({ theme }) => rem(theme.pulsar.size.city)};
  }
`;

export const Top = styled.div`
  margin-bottom: ${({ theme }) => rem(theme.pulsar.size.street)};
  width: 100%;
`;

export const RowText = styled.div`
  margin-bottom: ${({ theme }) => rem(theme.pulsar.size.drawer)};
`;

export const RowTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const RowBottom = styled(RowTop)`
  margin-top: ${({ theme }) => rem(theme.pulsar.size.street)};
  margin-bottom: ${({ theme }) => rem(theme.pulsar.size.street)};
  padding-right: ${({ theme }) => rem(theme.pulsar.size.street)};
  @media (min-width: ${rem(media.sm)}) {
    padding-right: 0;
  }
`;

export const InputAmount = styled(TextInput)`
  padding-left: ${({ theme }) => rem(theme.pulsar.size.drawer)};
  padding-right: ${({ theme }) => rem(theme.pulsar.size.street)};
  align-self: flex-end;
  @media (min-width: ${rem(media.sm)}) {
    width: ${({ theme }) => rem(360)};
    padding-left: ${({ theme }) => rem(theme.pulsar.size.town)};
    padding-right: 0;
  }
`;

export const Bottom = styled.div`
  width: 100%;
`;

export const InputReceivingAddress = styled(TextInput)<ReceivingAddressProps>`
  width: 100%;
  padding-right: ${({ theme }) => rem(theme.pulsar.size.street)};
  label {
    color: ${({ theme }) => theme.pulsar.color.text.masked};
  }
  input {
    cursor: ${(props) => (props.isERC20 ? 'not-allowed' : 'text')};
  }
  @media (min-width: ${rem(media.sm)}) {
    padding-right: 0;
  }
`;

// Request: Please add border props into Pulsar
export const DropdownCurrency = styled(Dropdown)<DropDownProps>`
  border: ${(props) =>
    props.isDarkMode ? `2px solid #1c232f` : `2px solid ${props.theme.pulsar.color.border.normal}`};
  background: ${(props) => props.isDarkMode && `#1c232f`};
  border-radius: 0.25em;
  transition: all ${({ theme }) => theme.pulsar.duration.normal} ease-in-out;
  :focus-within {
    border: 2px solid ${({ theme }) => theme.pulsar.color.primary.active};
    transition: all ${({ theme }) => theme.pulsar.duration.normal} ease-in-out;
  }
`;

export const DefaultTarget = styled(Dropdown.DefaultTarget)`
  padding-left: ${({ theme }) => rem(theme.pulsar.size.room)};
  margin-top: ${({ theme }) => rem(theme.pulsar.size.box / 2)};
  margin-bottom: ${({ theme }) => rem(theme.pulsar.size.box / 2)};
`;

export const TextLabel = styled(Text)`
  padding-left: ${({ theme }) => rem(theme.pulsar.size.box)};
  font-size: ${({ theme }) => rem(theme.pulsar.size.room)};
  font-weight: 500;
`;

export const TextDescription = styled(Text)`
  display: flex;
  font-size: ${({ theme }) => rem(theme.pulsar.size.room)};
  font-weight: 500;
`;

export const TextFee = styled(TextDescription)`
  text-align: right;
`;

export const ColumnDropdown = styled.div`
  display: grid;
  grid-template-rows: ${({ theme }) => rem(theme.pulsar.size.town)} auto;
  width: ${rem(146)};
`;

export const Coin = styled(CoinIcon)`
  font-size: ${({ theme }) => rem(theme.pulsar.size.street)};
`;

export const TargetCoin = styled(Coin)`
  margin-right: ${({ theme }) => rem(theme.pulsar.size.drawer)};
`;

export const CoinDropDown = styled(CoinIcon)`
  margin-bottom: ${({ theme }) => rem(-theme.pulsar.size.box / 2)};
  font-size: ${({ theme }) => rem(theme.pulsar.size.house)};
  margin-right: ${({ theme }) => rem(theme.pulsar.size.box)};
`;

export const ButtonRow = styled.div`
  padding-right: ${({ theme }) => rem(theme.pulsar.size.street)};
  @media (min-width: ${rem(media.sm)}) {
    padding-right: 0;
  }
`;

export const AmountValidation = styled.div`
  margin-top: ${({ theme }) => rem(theme.pulsar.size.box / 2)};
  margin-left: ${rem(130)};
  @media (min-width: ${rem(media.sm)}) {
    margin-left: ${rem(168)};
  }
`;
