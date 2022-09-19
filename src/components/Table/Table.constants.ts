import { OrderDirection } from '../../shared/constants';

export interface TablePageConfig {
  orderBy?: string;
  orderDirection?: OrderDirection;
  pageIndex?: number;
  pageSize?: number;
}
