import React, { ChangeEventHandler, FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

import { TableAction, TableHeaderColumnTypes } from '../Table.constants';
import Button from '../../Button';

import styles from './TableCell.module.scss';

interface StatusCell {
  label: string;
  color: string;
}

interface CustomData {
  [key: string]: string | number;
}

export type TableData = CustomData | StatusCell | string | number;

type TableCell = {
  rowId: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rowData: any;
  actions?: TableAction[];
  compact?: boolean;
  columnId?: string;
  columnType?: TableHeaderColumnTypes;
  data?: TableData;
  defaultRadioSelected?: number;
  checked?: boolean;
  path?: string;
  onRowRadioButtonChange?: ChangeEventHandler;
  onRowSelect?: ChangeEventHandler;
};

const TableCell: FunctionComponent<TableCell> = ({
  actions,
  checked = false,
  columnId,
  columnType,
  compact = false,
  data,
  defaultRadioSelected,
  onRowRadioButtonChange,
  onRowSelect,
  path,
  rowId,
  rowData,
}) => {
  const tableDetailClasses = [styles.tableCell];
  let cellContent = null;
  let tableDetailDataType = null;

  switch (columnType) {
    case TableHeaderColumnTypes.actions: {
      if (actions) {
        cellContent = (
          <div className={styles.actionsCell}>
            {actions &&
              actions.map(
                ({ disableIfDefault, disableIfEmpty, handleOnClick, label, dependentActions, icon }, index: number) => {
                  let labelText = label;
                  let handleRowActionClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
                    event?.preventDefault();
                    handleOnClick(rowId);
                  };

                  let isDisabled = false;
                  if (disableIfDefault) {
                    isDisabled = rowData.isDefault;
                  }
                  if (disableIfEmpty) {
                    isDisabled = rowData.rowsCount === 0 || isDisabled;
                  }

                  if (dependentActions) {
                    const dependentProperty =
                      rowData[dependentActions.property]?.key || rowData[dependentActions.property];
                    const action = dependentActions.action[dependentProperty];

                    if (action) {
                      labelText = action.label;
                      handleRowActionClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
                        event?.preventDefault();
                        action.handleOnClick(rowId);
                      };
                    }
                  }
                  return icon ? (
                    <button
                      key={`action-${rowId}-${index}`}
                      className="button__icon"
                      onClick={handleRowActionClick}
                      title={labelText}
                      disabled={isDisabled}
                    >
                      {icon}
                    </button>
                  ) : (
                    <Button
                      key={`action-${rowId}-${index}`}
                      onClick={handleRowActionClick}
                      text={labelText}
                      disabled={isDisabled}
                    />
                  );
                },
              )}
          </div>
        );
      }
      break;
    }
    case TableHeaderColumnTypes.currency:
    case TableHeaderColumnTypes.numeric: {
      tableDetailDataType = TableHeaderColumnTypes.numeric;
      tableDetailClasses.push('o-table__cell--numeric');
      cellContent = data || '0';
      break;
    }
    case TableHeaderColumnTypes.status: {
      const cellData = { ...(data as StatusCell) };
      if (cellData && cellData.label) {
        cellContent = <div>{cellData.label}</div>;
      }
      break;
    }
    case TableHeaderColumnTypes.link: {
      cellContent = data || '-';
      if (path) {
        let updatedPath = path;
        if (typeof data === 'string' || typeof data === 'number') {
          updatedPath = path.replace(`:${columnId}`, data.toString());
        }

        cellContent = <Link to={updatedPath.replace(':id', rowId.toString())}>{data}</Link>;
      }
      break;
    }
    case TableHeaderColumnTypes.count: {
      cellContent = Array.isArray(data) ? data.length : 0;
      break;
    }
    case TableHeaderColumnTypes.compositeLink: {
      cellContent = '-';
      if (data && path) {
        let updatedPath = path;
        const cellData: CustomData = { ...(data as CustomData) };
        const replacementKeys = path
          .split('/')
          .filter((routeParam: string) => routeParam.startsWith(':'))
          .map((routeParam: string) => routeParam.slice(1));

        if (columnId && rowData.hasOwnProperty(columnId) && typeof rowData[columnId] === 'string') {
          cellContent = rowData[columnId] || '-';
        } else {
          cellContent = cellData.label || cellData.key || '-';
        }

        replacementKeys.forEach((compositeKey: string) => {
          const [mainKey, ...otherKeys] = compositeKey.split('.');

          if (otherKeys.length > 0) {
            let data = rowData[mainKey];
            let depthLevel = 0;

            while (depthLevel < otherKeys.length) {
              if (data && data.hasOwnProperty(otherKeys[depthLevel])) {
                data = data[otherKeys[depthLevel]];
              } else {
                break;
              }

              depthLevel++;
            }

            updatedPath = updatedPath.replace(`:${compositeKey}`, data ? data.toString() : rowId);
          } else if (rowData.hasOwnProperty(mainKey) && rowData[mainKey]) {
            updatedPath = updatedPath.replace(`:${mainKey}`, rowData[mainKey].toString());
          }
        });

        cellContent = <Link to={updatedPath}>{cellContent}</Link>;
      }
      break;
    }
    default: {
      cellContent = data || '-';
    }
  }

  return (
    <td className={tableDetailClasses.join(' ')} data-o-table-data-type={tableDetailDataType}>
      {cellContent ?? '-'}
    </td>
  );
};

export default TableCell;
