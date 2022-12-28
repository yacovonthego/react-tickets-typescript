export type TCarrierName = string
export type TDate = string
export type TCurrency = 'RUB' | 'USD' | 'EUR'
export type TCheckboxItem = {
  text: string
  value: number
}
export type TAllItem = {
  text: string
}
export type TTicket = {
  origin: string
  origin_name: string
  destination: string
  destination_name: string
  departure_date: TDate
  departure_time: string
  arrival_date: TDate
  arrival_time: string
  carrier: TCarrierName
  stops: number
  price: number
}
export type TJSONResponse = {
  tickets?: TTicket[]
  errors?: Array<{ message: string }>
}