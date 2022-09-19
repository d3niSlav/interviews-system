import React, { FunctionComponent, useEffect, useState } from 'react';

import styles from './HeaderCell.module.scss';

type HeaderCellProps = {
  title?: string;
  columnKey?: string;
  sortable?: boolean;
  sortBy?: string;
  sortOrder?: string;
  onSortChange?: (sortBy: string, sortDirection: string) => void;
  width?: number | string;
};

const HeaderCell: FunctionComponent<HeaderCellProps> = ({
  title,
  columnKey,
  sortable = true,
  sortBy,
  sortOrder,
  onSortChange,
  width,
}) => {
  const [sortDirection, setSortDirection] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const rowHeaderClasses = [styles.rowHeader];

  useEffect(() => {
    setIsActive(sortBy === columnKey);
    // eslint-disable-next-line
  }, [sortBy]);

  if (isActive) {
    rowHeaderClasses.push(styles.active);
  }

  if (sortable) {
    rowHeaderClasses.push(styles.sortable);
  }

  const onHeaderClick = (event: any) => {
    event.preventDefault();
  };

  return (
    <div
      className={rowHeaderClasses.join(' ')}
      style={{ width }}
      role="rowheader"
      tabIndex={0}
      onClick={onHeaderClick}
      onKeyPress={onHeaderClick}
    >
      {title}
    </div>
  );
};

export default HeaderCell;
