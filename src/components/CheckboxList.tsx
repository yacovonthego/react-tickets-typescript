import * as React from 'react';
import styled from 'styled-components';
import { ReactComponent as Check } from '../assets/img/Check.svg';
import { TAllItem, TCheckboxItem } from '../types';
import List from './List';

const StyledCheckboxItem = styled.input``

const StyledCheckboxList = styled.form`
  flex: 1;
  display: flex;
  flex-direction: column;

  h4 {
   text-transform: uppercase;
   color: #00000075; 
   padding: 0 16px;
  }

  ul {
    margin: 0;
    padding: 0 0 20px 0;
    list-style: none;
  }
  li {
    cursor: pointer;
    padding: 6px 18px;

    &:hover {
      background: #F1FCFF;
    }
  }
  label {
    cursor: pointer;
    display: flex;
    align-items: center;
  }

  .mark {
    color: #2196F3;
    display: flex;
    margin-right: 5px;
    border: 1px solid #949494;
    border-radius: 5px;
    width: 24px;
    height: 24px;
    position: relative;

    svg {
      opacity: 0;
      width: 16px;
      height: 16px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

  ${StyledCheckboxItem} {

    &:checked + .mark {
      border: 1px solid #2196F3;

      svg {
        opacity: 1;
      }
    }
  }
`

interface ICheckboxListProps {
  title: string
  items: TCheckboxItem[]
  onChange: (active: number[]) => void
  allItem?: TAllItem
}

const CheckboxList: React.FunctionComponent<ICheckboxListProps> = ({ items, title, onChange, allItem }) => {
  const [active, setActive] = React.useState<number[]>([])

  const handleChange = (item: number, isActive: boolean) => {
    let newValue = [...active];

    if (isActive) {
      newValue.splice(active.indexOf(item), 1);
      setActive(newValue)
    } else {
      newValue = [...newValue, item]; 
      setActive(newValue)
    }
    onChange(newValue)
  }
  
  const handleSelectAll = () => {
    setActive(items.map(item => item.value))
  }

  return (
    <StyledCheckboxList>
      <h4>{title}</h4>

      <ul>
        { allItem && 
          <li key={'select-all'}>
            <label>
              <StyledCheckboxItem type='checkbox' checked={active.length === items.length} onChange={handleSelectAll} hidden/>
              <span className='mark'>
                <Check />
              </span>
              <span className='text'>{allItem.text}</span>
            </label>
          </li>          
        }
        <List items={items} renderItem={(item) => {
          const isActive = active.includes(item.value)

          return (
            <li key={item.text}>
              <label>
                <StyledCheckboxItem type='checkbox' checked={isActive} onChange={() => handleChange(item.value, isActive)} hidden/>
                <span className='mark'>
                  <Check />
                </span>
                <span className='text'>{item.text}</span>
              </label>
            </li>
          )
        }} />
      </ul>
    </StyledCheckboxList>
  );
};

export default React.memo(CheckboxList);
