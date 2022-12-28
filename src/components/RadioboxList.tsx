import * as React from 'react';
import styled from 'styled-components';
import { TCurrency } from '../types';
import List from './List';

const StyledRadiobox = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  h4 {
    text-transform: uppercase;
    color: #00000075; 
    padding: 0 16px;
  }
  ul {
    flex: 0;
    display: flex;
    margin: 0 0 16px 0;
    padding: 0 16px;
    border-radius: 5px;
    list-style: none;
  }
  label {
    cursor: pointer;
    display: block;
    padding: 12px 24px;
  }
  li {
    margin-top: -1px;
    border: 1px solid #949494;

    &[data-checked="true"] {
      background: #2196F3;
      border-color: #2196F3;
      color: #fff;

      &:hover {
        color: #fff;
      }
    }

    &:hover {
      border-color: #2196F3;
      color: #2196F3;
      z-index: 2;
    }

    & + li {
      margin-left: -1px;
    }

    &:first-child {
      border-top-left-radius: 5px 5px;
      border-bottom-left-radius: 5px 5px;
    }
    &:last-of-type {
      border-top-right-radius: 5px 5px;
      border-bottom-right-radius: 5px 5px;
    }
  }
`
const StyledRadioboxItem = styled.input`
  
`

interface IRadioboxListProps {
  items: TCurrency[]
  onChange: (active: TCurrency) => void
  title: string
}

const RadioboxList: React.FunctionComponent<IRadioboxListProps> = ({ items, onChange, title }) => {
  const [active, setActive] = React.useState<TCurrency>(items[0])

  const handleChange = (item: TCurrency) => {
    setActive(item)
    onChange(item)
  }

  return (
    <StyledRadiobox>
      <h4>{title}</h4>

      <ul>
        <List items={items} renderItem={(item) => (
            <li key={item} data-checked={item === active}>
              <label>
                <StyledRadioboxItem type='radio' checked={item === active} onChange={() => handleChange(item)} name={`${title}-radio`} hidden/>
                <div className='text'>{item}</div>
              </label>
            </li>
          )} />
      </ul>
    </StyledRadiobox>
  );
};

export default React.memo(RadioboxList);
