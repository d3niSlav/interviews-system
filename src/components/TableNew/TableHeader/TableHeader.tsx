import React, { ChangeEventHandler, FunctionComponent, ReactNode } from 'react';

import {
  ASCENDING_ORDER_DIRECTION_LABEL,
  ColumnDefinition,
  DESCENDING_ORDER_DIRECTION_LABEL,
  NO_ORDER_DIRECTION_LABEL,
  TableHeaderColumnTypes,
  TableHeaderSortingDirection,
} from '../Table.constants';
import Checkbox from '../../FormFields/Fields/CheckboxesField';
import { OrderDirection } from '../../../shared/constants';
import { ReactComponent as ArrowsIcon } from '../../../assets/images/svg/sort.svg';

import styles from './TableHeader.module.scss';

export type TableHeaderProps = {
  columns: ColumnDefinition[];
  onColumnSort?: (columnId: string) => void;
  onRowsSelect?: (event?: any) => void;
  orderBy?: string;
  orderDirection?: OrderDirection;
  numberOfRows?: number;
  numberOfSelectedRows?: number;
};

const TableHeader: FunctionComponent<TableHeaderProps> = ({
  columns,
  onColumnSort,
  onRowsSelect,
  orderBy,
  orderDirection,
  numberOfRows = 0,
  numberOfSelectedRows = 0,
}) => {
  const renderHeader = (): ReactNode => {
    return columns
      .filter((columnDef: ColumnDefinition) => !columnDef.hidden)
      .map((columnDef: ColumnDefinition) => {
        const labelClasses: string[] = [styles.label];
        let content: ReactNode = columnDef.title;
        let sortOrder: TableHeaderSortingDirection = NO_ORDER_DIRECTION_LABEL;
        let sortLabel: TableHeaderSortingDirection = DESCENDING_ORDER_DIRECTION_LABEL;

        if (onColumnSort && columnDef.sorting) {
          const iconClasses: string[] = [styles.arrows];

          const sortColumn = (event?: React.MouseEvent<HTMLButtonElement>): void => {
            onColumnSort(columnDef.id);
          };

          if (columnDef.id === orderBy) {
            labelClasses.push(styles.active);

            if (orderDirection === 'ASC') {
              iconClasses.push(styles.ascending);
              sortOrder = DESCENDING_ORDER_DIRECTION_LABEL;
              sortLabel = DESCENDING_ORDER_DIRECTION_LABEL;
            } else if (orderDirection === 'DESC') {
              iconClasses.push(styles.descending);
              sortOrder = ASCENDING_ORDER_DIRECTION_LABEL;
              sortLabel = ASCENDING_ORDER_DIRECTION_LABEL;
            }
          }

          content = (
            <button
              className={styles.sortingButton}
              title={`Sort table by "${content}" ${sortLabel}`}
              onClick={sortColumn}
            >
              <span className={labelClasses.join(' ')}>{content}</span>
              <ArrowsIcon className={iconClasses.join(' ')} />
            </button>
          );
        }

        const tableHeaderClasses = [styles.tableHeaderCell];
        let headerDataType = null;

        switch (columnDef.type) {
          case TableHeaderColumnTypes.currency:
          case TableHeaderColumnTypes.numeric: {
            headerDataType = TableHeaderColumnTypes.numeric;
            tableHeaderClasses.push('o-table__cell--numeric');
            break;
          }
          case TableHeaderColumnTypes.status: {
            tableHeaderClasses.push(styles.status);
            break;
          }
          case TableHeaderColumnTypes.selection: {
            tableHeaderClasses.push(styles.selection);
            content = <Checkbox name="table-header" id="select-all" checked={numberOfSelectedRows === numberOfRows} />;
            break;
          }
        }

        return (
          <th
            className={tableHeaderClasses.join(' ')}
            key={columnDef.id}
            scope="col"
            role="columnheader"
            aria-sort={sortOrder}
            style={{ width: columnDef.width }}
            title={columnDef.tooltip}
          >
            <span className={labelClasses.join(' ')}>{content}</span>
          </th>
        );
      });
  };

  return (
    <thead>
      <tr>{renderHeader()}</tr>
    </thead>
  );
};

export default TableHeader;
