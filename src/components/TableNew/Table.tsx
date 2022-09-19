import React, { ChangeEvent, FunctionComponent, ReactNode, useEffect, useState } from 'react';

import { ColumnDefinition, TableHeaderColumnTypes } from './Table.constants';
import TableBody from './TableBody';
import TableHeader from './TableHeader';
import TableHeading, { TableHeadingOptions } from './TableHeading';
import { OrderDirection, SortOrder } from '../../shared/constants';
import styles from './Table.module.scss';

type TableProps = {
  id: string;
  columns: ColumnDefinition[];
  compact?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
  defaultRadioSelected?: number;
  sortingOptions?: SortOrder;
  headingOptions?: TableHeadingOptions;
  lines?: boolean;
  selection?: boolean;
  stripes?: boolean;
  onRowRadioButtonClick?: (rowId: number) => void;
  onSortByColumn?: (fieldId: string) => void;
};

const Table: FunctionComponent<TableProps> = ({
  id,
  columns,
  compact = false,
  data,
  defaultRadioSelected,
  sortingOptions,
  headingOptions,
  lines = true,
  onSortByColumn,
  onRowRadioButtonClick,
  selection = false,
  stripes = true,
}) => {
  const tableClasses = [styles.table];
  const [columnsConfig, setColumnsConfig] = useState([...columns]);
  const [fieldToSortBy, setFieldToSortBy] = useState('');
  const [order, setOrder] = useState('DESC' as OrderDirection);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [areAllRowsSelected, setAreAllRowsSelected] = useState(false);

  useEffect(() => {
    if (sortingOptions) {
      const { order: newOrder, sortBy } = sortingOptions;
      if (order !== newOrder) {
        setOrder(order);
      }

      if (fieldToSortBy !== sortBy) {
        setFieldToSortBy(sortBy);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortingOptions]);

  const onRowSelectChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const rowId = event.target.name;
    const currentSelectedRows = [...selectedRows];
    const indexOfRow = currentSelectedRows.indexOf(rowId);
    if (indexOfRow >= 0) {
      currentSelectedRows.splice(indexOfRow, 1);
    } else {
      currentSelectedRows.push(rowId);
    }

    /**
     * The origami classes do not catch the react synthetic event for checked and indeterminate,
     * so that is why it is handled via vanilla JS.
     */
    const selectAllInput: HTMLInputElement | null = document.querySelector(`#${id} thead input[type=checkbox]`);
    if (selectAllInput) {
      const numberOfSelectedRows = currentSelectedRows.length;
      selectAllInput.indeterminate = numberOfSelectedRows > 0;
      selectAllInput.checked = numberOfSelectedRows === data.length;
    }

    setSelectedRows(currentSelectedRows);
    setAreAllRowsSelected(false);
  };

  const onRowRadioButtonChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const rowId = event.target.value;
    onRowRadioButtonClick && onRowRadioButtonClick(+rowId);
  };

  const onSelectAllClick = (): void => {
    let newSelectedRows = [];
    let areAllSelected = false;
    if (selectedRows.length === 0) {
      areAllSelected = true;
      newSelectedRows = data.reduce((values, rowData) => [...values, rowData.id.toString()], []);
    }

    /**
     * The origami classes do not catch the react synthetic event for checked and indeterminate,
     * so that is why it is handled via vanilla JS.
     */
    const rowSelectInputs: NodeListOf<HTMLInputElement> | null = document.querySelectorAll(
      `#${id} tbody input[type=checkbox]`,
    );
    if (rowSelectInputs) {
      rowSelectInputs.forEach((rowSelectInput: HTMLInputElement) => {
        rowSelectInput.checked = newSelectedRows.length > 0;
      });
    }

    const selectAllInput: HTMLInputElement | null = document.querySelector(`#${id} thead input[type=checkbox]`);
    if (selectAllInput) {
      selectAllInput.checked = newSelectedRows.length > 0;
    }

    setAreAllRowsSelected(areAllSelected);
    setSelectedRows(newSelectedRows);
  };

  if (lines) {
    tableClasses.push('o-table--horizontal-lines');
  }

  if (stripes) {
    tableClasses.push('o-table--row-stripes');
  }

  if (compact) {
    tableClasses.push('o-table--compact');
  }

  useEffect(() => {
    const tableColumnsConfig = [...columns];

    if (selection) {
      tableColumnsConfig.unshift({
        id: TableHeaderColumnTypes.selection,
        type: TableHeaderColumnTypes.selection,
      });
    }

    setColumnsConfig(tableColumnsConfig);
  }, [columns, selection]);

  const sortColumnByField = (fieldId: string): void => {
    if (onSortByColumn) {
      const newOrder = fieldId === fieldToSortBy && order === 'DESC' ? 'ASC' : 'DESC';
      setFieldToSortBy(fieldId);
      setOrder(newOrder);
      onSortByColumn(fieldId);
    }
  };

  const renderTableHeader = (): ReactNode => (
    <TableHeader
      numberOfRows={data.length}
      numberOfSelectedRows={selectedRows.length}
      onRowsSelect={onSelectAllClick}
      orderBy={fieldToSortBy}
      orderDirection={order}
      onColumnSort={sortColumnByField}
      columns={columnsConfig}
    />
  );

  const renderTableBody = (): ReactNode => (
    <TableBody
      columns={columnsConfig}
      compact={compact}
      data={data}
      defaultRadioSelected={defaultRadioSelected}
      selectedRows={selectedRows}
      onRowSelect={onRowSelectChange}
      onRowRadioButtonChange={onRowRadioButtonChange}
    />
  );

  return (
    <div className="o-table-container mba-full-width">
      <div className="o-table-scroll-wrapper">
        {headingOptions && (
          <TableHeading
            {...headingOptions}
            tableId={id}
            compact={compact}
            selectedRows={selectedRows}
            areAllRowsSelected={areAllRowsSelected}
          />
        )}
        <table className={tableClasses.join(' ')} data-o-component="o-table" id={id}>
          {renderTableHeader()}
          {renderTableBody()}
        </table>
      </div>
    </div>
  );
};

export default Table;
