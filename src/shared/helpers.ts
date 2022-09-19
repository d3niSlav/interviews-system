import { OrderDirection, PageFilterConfig, PageSearchQueryConfig, TableListData } from './constants';

export interface ErrorResponseDto {
  errorMessage: string;
  errors: {
    [key: string]: string[];
  };
}

export interface FormErrors {
  [key: string]: string;
}

export const mapRequestErrors = (errorResponse: ErrorResponseDto, defaultErrorKey = 'name'): FormErrors => {
  const { errorMessage, errors } = errorResponse;
  const formErrors: FormErrors = {};

  if (errors) {
    Object.keys(errors).forEach((errorKey: string) => {
      formErrors[errorKey] = errors[errorKey][0];
    });
  }

  if (Object.keys(formErrors).length === 0 && errorMessage) {
    formErrors[defaultErrorKey] = errorMessage;
  }

  return formErrors;
};

export const generateSearchQuery = (pageConfig: PageSearchQueryConfig): string => {
  const { filter, limit, order, page, sortBy, search } = pageConfig;
  const queryParams = [];

  if (page) {
    queryParams.push(`page=${page}`);
  }

  if (limit) {
    queryParams.push(`limit=${limit}`);
  }

  if (sortBy) {
    queryParams.push(`sortBy=${sortBy}`);
  }

  if (order) {
    queryParams.push(`order=${order}`);
  }

  if (search) {
    queryParams.push(`search=${search.trim()}`);
  }

  if (filter) {
    queryParams.push(
      Object.entries(filter).reduce(
        (filterQuery, [key, value]): string =>
          Array.isArray(value)
            ? value.reduce(
                (currentFilterQuery, filterValue): string =>
                  `filter[${key}]=${filterValue}${currentFilterQuery ? `&${currentFilterQuery}` : ''}`,
                '',
              ) + `${filterQuery ? `&${filterQuery}` : ''}`
            : `filter[${key}]=${value}`,
        '',
      ),
    );
  }

  return queryParams.length ? `?${queryParams.filter((param) => !!param).join('&')}` : '';
};

export const getTableListDefaultState = <T>(): TableListData<T> => ({
  data: [] as T[],
  pagination: {
    page: 1,
    limit: 10,
    totalCount: 0,
    totalPages: 1,
  },
  sortOrder: {
    order: 'DESC' as OrderDirection,
    sortBy: 'createdAt',
  },
  search: '',
  filter: {} as PageFilterConfig,
});
