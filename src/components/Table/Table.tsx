import React, { PropsWithChildren, ReactElement, ReactNode, useEffect } from 'react';
import {
  TableOptions,
  useColumnOrder,
  useExpanded,
  useFilters,
  useFlexLayout,
  useGroupBy,
  usePagination,
  useResizeColumns,
  useRowSelect,
  useSortBy,
  useTable,
} from 'react-table';

import { TablePageConfig } from './Table.constants';
import TablePagination from './components/TablePagination';
import TableSortLabel from './components/TableSortLabel';

import styles from './Table.module.scss';

const hooks = [
  useColumnOrder,
  useFilters,
  useGroupBy,
  useSortBy,
  useExpanded,
  useFlexLayout,
  usePagination,
  useResizeColumns,
  useRowSelect,
];

interface TableProperties<T extends Record<string, unknown>> extends TableOptions<T> {
  noDataText?: ReactNode;
  fetchData?: (data: TablePageConfig) => void;
}

function Table<T extends Record<string, unknown>>(props: PropsWithChildren<TableProperties<T>>): ReactElement {
  const { columns, fetchData, noDataText = 'No records!', ...tableProps } = props;
  const instance = useTable<T>(
    {
      ...tableProps,
      columns,
    },
    ...hooks,
  );

  const {
    getTableProps,
    headerGroups,
    getTableBodyProps,
    rows,
    prepareRow,
    state: { pageIndex, pageSize, sortBy: sortingOptions },
  } = instance;

  useEffect(() => {
    if (fetchData) {
      let orderBy = 'id';
      let orderDirection: 'asc' | 'desc' = 'asc';

      if (sortingOptions && sortingOptions[0]) {
        orderBy = sortingOptions[0].id;
        orderDirection = sortingOptions[0].desc ? 'desc' : 'asc';
      }

      fetchData({ pageIndex, pageSize, orderBy, orderDirection });
    }
  }, [fetchData, pageIndex, pageSize, sortingOptions]);

  return (
    <>
      <div className={styles.tableWrapper}>
        <table className={styles.table} {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup, index) => (
              // eslint-disable-next-line react/jsx-key
              <tr className={styles.header} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  // eslint-disable-next-line react/jsx-key
                  <th
                    {...column.getHeaderProps(
                      column.getSortByToggleProps({
                        title: column.isSorted
                          ? column.isSortedDesc
                            ? 'Reset sorting'
                            : 'Sort descending'
                          : 'Sort ascending',
                      }),
                    )}
                  >
                    {column.canSort ? (
                      <TableSortLabel
                        active={column.isSorted}
                        sortingDirection={
                          column.isSorted ? (column.isSortedDesc ? 'descending' : 'ascending') : undefined
                        }
                      >
                        {column.render('Header')}
                      </TableSortLabel>
                    ) : (
                      column.render('Header')
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                // eslint-disable-next-line react/jsx-key
                <tr className={styles.row} {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    // eslint-disable-next-line react/jsx-key
                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                  })}
                </tr>
              );
            })}
            {rows.length === 0 && (
              <tr className={`${styles.row} ${styles.emptyRow}`}>
                <td colSpan={columns.length}>{noDataText}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <TablePagination<T> instance={instance} />
    </>
  );
}

export default Table;
