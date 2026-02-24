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
  offset: number
}

export interface apiRes {
  data: EventForm[],
  Pagination: PaginationInfo
}