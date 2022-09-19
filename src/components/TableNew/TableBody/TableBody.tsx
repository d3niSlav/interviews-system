import React, { ChangeEventHandler, FunctionComponent, ReactNode } from 'react';

import { ColumnDefinition } from '../Table.constants';
import TableCell from '../TableCell';
import TableRowNoRecords from '../TableRowNoRecords';

import styles from './TableBody.module.scss';

type TableBody = {
  columns: ColumnDefinition[];
  compact?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
  defaultRadioSelected?: number;
  selectedRows?: string[];
  onRowRadioButtonChange?: ChangeEventHandler;
  onRowSelect?: ChangeEventHandler;
};

const TableBody: FunctionComponent<TableBody> = ({
  columns,
  compact = false,
  data,
  defaultRadioSelected,
  selectedRows,
  onRowRadioButtonChange,
  onRowSelect,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderTableRow = (rowData: any, index: number): ReactNode => (
    <tr key={`row-${index}-${rowData.id}`} className={styles.tableRow}>
      {columns.map((columnDefinition: ColumnDefinition) => {
        const dataKey = columnDefinition.id;
        let data = rowData[columnDefinition.id];

        if (dataKey.includes('.')) {
          const keyParts = dataKey.split('.');

          data = keyParts.reduce((acc, key) => {
            return acc.hasOwnProperty(key) ? acc[key] : acc;
          }, rowData);
        }

        return (
          <TableCell
            key={`${columnDefinition.id}-${rowData.id}`}
            rowId={rowData.id}
            rowData={rowData}
            actions={columnDefinition.actions}
            data={data}
            defaultRadioSelected={defaultRadioSelected}
            compact={compact}
            columnId={columnDefinition.id}
            columnType={columnDefinition.type}
            onRowRadioButtonChange={onRowRadioButtonChange}
            onRowSelect={onRowSelect}
            path={columnDefinition.path}
            checked={selectedRows && selectedRows.indexOf(rowData.id.toString()) >= 0}
          />
        );
      })}
    </tr>
  );

  const renderTableBody = (): ReactNode => {
    let content: ReactNode = <TableRowNoRecords columnsCount={columns.length} />;

    if (columns && data && data.length > 0) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      content = data.map((rowData: any, index: number) => renderTableRow(rowData, index));
    }

    return content;
  };

  return <tbody>{renderTableBody()}</tbody>;
};

export default TableBody;
