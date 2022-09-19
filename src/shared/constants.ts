// Colors
export const ACCENT_COLOR = '#5a66f1';

export const ACCENT_COLOR_DARK = '#2b3aed';

export const BACKGROUND_COLOR = '#fefeff';

export const BACKGROUND_CONTRAST_COLOR = '#dbdde4';

export const BACKGROUND_CONTRAST_DARK_COLOR = '#bec1ce';

export const TEXT_COLOR = '#223263';

export const TEXT_WHITE = '#fefeff';

// Routes
export const HOME_ROUTE = '/';

export const LOGIN_ROUTE = '/login';

export const REGISTER_ROUTE = '/register';

export const RECOVER_PASSWORD_ROUTE = '/recover';

export const RESET_PASSWORD_ROUTE = '/reset';

export const NOT_FOUND_ROUTE = '/404';

export const SERVICE_UNAVAILABLE_ROUTE = '/service-unavailable';

export interface Resource {
  key: number;
  label: string;
  shortLabel?: string;
}

export interface Status extends Resource {
  color?: string;
}

export interface FormErrors {
  [key: string]: string[];
}

export interface Pagination {
  page: number;
  limit: number;
  totalCount: number;
  totalPages: number;
}

export type OrderDirection = 'ASC' | 'DESC';

export interface SortOrder {
  order: OrderDirection;
  sortBy: string;
}

export interface PageFilterConfig {
  [key: string]: string | string[];
}

export interface BasicResponseDTO {
  message: string;
}

export interface DefaultResponseDTO<T> {
  message: string;
  data: T;
}

export interface PagedResponseDTO<T> extends DefaultResponseDTO<T> {
  pagination: Pagination;
  sortOrder: SortOrder;
}

export interface TableListData<T> {
  data: T[];
  errorMessage?: string;
  filter?: PageFilterConfig;
  pagination: Pagination;
  search?: string;
  sortOrder: SortOrder;
}

export interface PageSearchQueryConfig {
  filter?: PageFilterConfig;
  limit?: number;
  order?: OrderDirection;
  page?: number;
  sortBy?: string;
  totalPages?: number;
  search?: string;
}
