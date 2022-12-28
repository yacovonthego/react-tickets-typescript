import moment from "moment";
import { TCurrency, TDate } from "../types";

const numeralsDeclension = (value: number, words: string[]) => {
  value = Math.abs(value) % 100; 
  const left = value % 10;
  
  if(value > 10 && value < 20) return words[2]; 
  if(left > 1 && left < 5) return words[1];
  if(left == 1) return words[0]; 

  return words[2];
}

const applyCurrency = (price: number, currency: TCurrency) => ({
  'RUB': (price: number) => Math.floor(price / 1) + ' RUB',
  'USD': (price: number) => Math.floor(price / 71) + ' USD',
  'EUR': (price: number) => Math.floor(price / 76) + ' EUR',
})[currency](price)

const formatDate = (date: TDate) => {
  const [day, month, year] = date.split('.')

  return moment(new Date(2000 + +year, +month - 1, +day)).format('DD MMM YYYY, ddd')
}

export {
  numeralsDeclension,
  applyCurrency,
  formatDate
};
