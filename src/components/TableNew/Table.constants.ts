import { ReactNode } from 'react';

export enum TableHeaderColumnTypes {
  actions = 'actions',
  capitalize = 'capitalize',
  currency = 'currency',
  compositeLink = 'compositeLink',
  count = 'count',
  date = 'date',
  link = 'link',
  numeric = 'numeric',
  radio = 'radio',
  selection = 'selection',
  status = 'status',
}

export const NO_ORDER_DIRECTION_LABEL = 'none';

export const ASCENDING_ORDER_DIRECTION_LABEL = 'ascending';

export const DESCENDING_ORDER_DIRECTION_LABEL = 'descending';

export const OTHER_ORDER_DIRECTION_LABEL = 'other';

export type TableHeaderSortingDirection = 'none' | 'ascending' | 'descending' | 'other';

export enum TableHeaderColumnAlignment {
  left = 'left',
  center = 'center',
  right = 'right',
}

export interface TableAction {
  disableIfDefault?: boolean;
  disableIfEmpty?: boolean;
  label: string;
  handleOnClick: (entityId?: string | number) => void;
  dependentActions?: {
    property: string;
    action: { [val: string]: TableAction };
  };
  icon?: ReactNode;
}

export interface ColumnDefinition {
  id: string;
  actions?: TableAction[];
  align?: TableHeaderColumnAlignment;
  hidden?: boolean;
  path?: string;
  sorting?: boolean;
  title?: string;
  tooltip?: string;
  type?: TableHeaderColumnTypes;
  width?: number | string;
}
