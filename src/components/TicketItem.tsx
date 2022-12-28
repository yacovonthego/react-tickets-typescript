import moment from 'moment';
import 'moment/locale/ru';
import * as React from 'react';
import styled from 'styled-components';
import { applyCurrency, formatDate, numeralsDeclension } from '../helpers';

import logo from '../assets/img/TA_logo.png';
import { TCurrency, TTicket } from '../types';

moment.locale('ru')

const StyledTicketItem = styled.div`
  background: #fff;
  display: flex;
  padding: 12px;
  border-radius: 5px;
`
const ActionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
  border-right: 1px solid rgb(110 110 110 / 28%);
  min-width: 218px;

  img {
    margin-bottom: 18px;
    width: 140px;
  }
`
const PurchaseButton = styled.button`
  flex: 1;
  display: flex;
  justify-content: center;
  cursor: pointer;
  background: #FF6D00;
  color: #fff;
  padding: 5px 35px;
  border: none;
  border-radius: 5px;
  min-width: 170px;

  &:active {
    opacity: .8;
  }
`
const DestinationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 1;
  padding: 32px;
`
const PointItem = styled.div<IPointItemProps>`
  display: flex;
  flex-direction: column;
  align-items: ${({ alignRight }) => alignRight ? 'flex-end' : 'flex-start'};

  .time {
    font-size: 36px;
    font-weight: 500;
    margin-bottom: 8px;
  }
  .name {
    margin-bottom: 4px;
  }
  .date {
    color: #5d5d5daa;
  }
`
const TransfetItem = styled.div`
  color: #5d5d5daa;
  text-transform: uppercase;
  flex: 1;
  display: flex;
  justify-content: center;
  margin: 0 20px;
  border-bottom: 1px solid #b3b3b3aa;
  max-height: 28px;
`

interface IPointItemProps {
  alignRight?: boolean
}
interface ITicketItemProps {
  item: TTicket
  currency: TCurrency
}

const TicketItem: React.FunctionComponent<ITicketItemProps> = ({ item, currency }) => {
  return (
    <StyledTicketItem>
      <ActionsContainer>
        <img src={logo} alt="Carrier logo" />

        <PurchaseButton>
          Купить <br/>
          за {applyCurrency(item.price, currency)}
        </PurchaseButton>
      </ActionsContainer>

      <DestinationContainer>
        <PointItem>
          <div className="time">{item.departure_time}</div>
          <div className="name">{item.origin}, {item.origin_name}</div>
          <div className="date">{formatDate(item.departure_date)}</div>
        </PointItem>

        <TransfetItem>
          { item.stops ?
            `${item.stops} ` + numeralsDeclension(item.stops, ['пересадка', 'пересадки', 'пересадок'])
            : 'Без пересадок'
          }
        </TransfetItem>

        <PointItem alignRight>
          <div className="time">{item.arrival_time}</div>
          <div className="name">{item.destination}, {item.destination_name}</div>
          <div className="date">{formatDate(item.arrival_date)}</div>
        </PointItem>
      </DestinationContainer>
    </StyledTicketItem>
  );
};

export default TicketItem;
