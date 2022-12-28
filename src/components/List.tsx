import * as React from 'react';

interface IListProps<T> {
  items: T[]
  renderItem: (item: T) => React.ReactNode
}

export default function List<T>({ items, renderItem }: IListProps<T>) {
  return (
    <>
      {items.map(item => renderItem(item))}
    </>
  );
};
