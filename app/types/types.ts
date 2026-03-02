

export interface City {
  id: string;
  name: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface EventForm {
  id: string;
  title: string;
  description: string;
  image?: string;
  location: string;
  category: Category;
  city: City;
  price: string;
  eventDate: string;
  categoryId: string;
  cityId: string;
}

export type EventsAdmin = Pick<
  EventForm,
  | "city"
  | "category"
  | "id"
  | "title"
  | "image"
  | "location"
  | "cityId"
  | "categoryId"
  | "eventDate"
  | "price"
>;

export interface PaginationInfo {
  hasNextPage: boolean;
  hasPrevPage: boolean;
  totalPage: number;
  totalItems: number;
  currentPage: number;
  itemPerPage: number;
  offset: number;
}

export interface apiRes {
  data: EventForm[];
  Pagination: PaginationInfo;
}

export interface Buyer {
  id: string;
  name: string
  email: string
  phone: string
}

export interface Tickets {
  id: string;
  quantity: number;
  totalPrice: number;
  event: EventForm;
  buyer: Buyer;
  city: City;
  sessionId: string;
  createdAt: string;
}

export interface apiResTicket {
  data: Tickets[];
  Pagination: PaginationInfo;
}

export interface apiResCards {
  eventData: EventForm[];
  ticketData: Tickets[]
}

export interface TopEvent {
  id: string;
  title: string;
  location: string;
  image: string
  category: string;
  city: string
  date: string;
  ticketsSold: number;
  revenue: number;
}

export interface apiResTopEvents {
  data: TopEvent[];
  Pagination: PaginationInfo;
}

export interface TopCity{
  ranking: number
  city: string
  ticketsSold: number
  revenue: number
}

export interface apiResTopCities {
  revenueEach: CityPercentage[]
  data: TopCity[];
  Pagination: PaginationInfo;
}

export interface CityPercentage {
  name: string
  revenue: number
  totalRevenue: number
}

export interface SortedCategory{
  name: string;
  revenue: number
}