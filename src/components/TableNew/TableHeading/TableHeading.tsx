import React, { FunctionComponent, ReactNode } from 'react';

import { TableHeadingAction, TableHeadingActionType, TableHeadingOptions } from './TableHeading.constants';
import Button from '../../Button';

export type TableHeadingProps = {
  tableId: string;
  compact?: boolean;
  selectedRows?: string[];
  areAllRowsSelected?: boolean;
};

type Props = TableHeadingProps & TableHeadingOptions;

const TableHeading: FunctionComponent<Props> = ({
  tableId,
  compact = false,
  heading,
  actions,
  selectedRows,
  areAllRowsSelected,
}) => {
  const buttonSize = compact ? 'small' : 'medium';

  const renderActionButton = ({ id, label, type, handleOnClick }: TableHeadingAction): ReactNode => {
    let text = label;
    let onClickHandler = (event: React.MouseEvent<HTMLButtonElement>): void => {
      event.preventDefault();
      handleOnClick();
    };

    if (type === TableHeadingActionType.selection) {
      const numberOfSelectedRows = selectedRows?.length || 0;
      if (numberOfSelectedRows === 0) {
        return;
      }

      text = `${label} ${areAllRowsSelected ? 'all' : `(${numberOfSelectedRows} rows)`}`;

      onClickHandler = (event: React.MouseEvent<HTMLButtonElement>): void => {
        event.preventDefault();
        handleOnClick(selectedRows, areAllRowsSelected);
      };
    }

    return <Button key={id} text={text} size={buttonSize} onClick={onClickHandler} />;
  };

  return (
    <div className="mba-heading--wrapper mba-heading--table">
      {heading && <div>{heading}</div>}
      {actions && (
        <div className="mba-actions">
          {actions.map((action: TableHeadingAction, index: number) =>
            renderActionButton({
              ...action,
              id: `${tableId}-action-${index}`,
            }),
          )}
        </div>
      )}
    </div>
  );
};

export default TableHeading;
