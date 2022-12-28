import * as React from 'react';
import styled from 'styled-components';
import { TCurrency, TTicket } from '../types';
import List from './List';
import TicketItem from './TicketItem';

const StyledTicketsList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;

  li + li {
    margin-top: 12px;
  }
`

interface ITicketsListProps {
  tickets: TTicket[]
  currency: TCurrency
}

const TicketsList: React.FunctionComponent<ITicketsListProps> = ({ tickets, currency }) => (
  <StyledTicketsList>
    {tickets &&
      <List
        <TTicket>
        items={tickets}
        renderItem={
          (ticket) =>
            <li key={ticket.origin + ticket.destination + ticket.carrier + ticket.price} >
              <TicketItem
                item={ticket}
                currency={currency}
              />
            </li>
        }
      />
    }
  </StyledTicketsList>
);

export default React.memo(TicketsList);
