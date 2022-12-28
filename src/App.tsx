import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import CheckboxList from './components/CheckboxList';
import RadioboxList from './components/RadioboxList';
import TicketsList from './components/TicketsList';
import { TAllItem, TCheckboxItem, TCurrency, TJSONResponse, TTicket } from './types';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: Roboto, Open-Sans, Helvetica, Sans-Serif;
    background: #F3F7FA;
  }
`
const Wrapper = styled.div`
  max-width: 1280px;
  min-height: 100vh;
  margin: 0 auto;
  padding: 16px;
  position: relative;
  flex: 1;
  display: flex;
  align-items: flex-start;

  aside {
    top: 0;
    position: sticky;
    display: flex;
    flex-direction: column;
    width: 270px;
    background: #fff;
    margin-right: 12px;
    border-radius: 5px;
  }
  section {
    flex: 1;
  }
`
const CURRENCIES: TCurrency[] = ['RUB', 'USD', 'EUR']

const CHECKBOX_ITEMS: TCheckboxItem[] = [
  {
    text: 'Без пересадок',
    value: 0
  },
  {
    text: '1 пересадка',
    value: 1
  },
  {
    text: '2 пересадки',
    value: 2
  },
  {
    text: '3 пересадки',
    value: 3
  }
]

const ALLITEM: TAllItem = {
  text: 'Все'
}

function App() {
  const [tickets, setTickets] = React.useState<TTicket[]>([])
  const [currency, setCurrency] = React.useState<TCurrency>(CURRENCIES[0])
  const [stops, setStops] = React.useState<number[]>([])

  const applyFilters = (stops: number[]) => stops.length ? tickets.filter(item => stops.includes(item.stops)) : tickets

  const filteredTickets: TTicket[] = React.useMemo(() => applyFilters(stops), [stops, tickets]);
  const handleRadioChange = React.useCallback((active: TCurrency) => setCurrency(active), [])
  const handleCheckboxChange = React.useCallback((active: number[]) => setStops(active), [])

  const fetchTickets = async () => {
    const res = await fetch('/tickets.json', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })

    const { tickets, errors }: TJSONResponse = await res.json()

    if (res.ok) {

      if (tickets) {
        return tickets
      } else {
        return Promise.reject(new Error(`No tickets today brother`))
      }
    } else {
      // handle the graphql errors
      const error = new Error(errors?.map(e => e.message).join('\n') ?? 'unknown')
      return Promise.reject(error)
    }
  }

  React.useEffect(() => {
    fetchTickets()
      .then(data => setTickets(data))
      .catch(errors => console.log(errors))
  }, [])

  return (
    <>
      <GlobalStyle />
      <div className="App">
        <Wrapper>
          <aside>
            <RadioboxList
              title={'Валюта'}
              items={CURRENCIES}
              onChange={handleRadioChange}
            />
            <CheckboxList
              title={'Количество пересадок'}
              items={CHECKBOX_ITEMS}
              allItem={ALLITEM}
              onChange={handleCheckboxChange}
            />
          </aside>
          <section>
            <TicketsList tickets={filteredTickets} currency={currency} />
          </section>
        </Wrapper>
      </div>
    </>
  );
}

export default App;
