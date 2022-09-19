import React, { FunctionComponent, PropsWithChildren } from 'react';

import { ReactComponent as ArrowsIcon } from '../../../../assets/images/svg/sort.svg';

import styles from './TableSortLabel.module.scss';

interface TableSortLabelProps {
  active: boolean;
  sortingDirection?: 'ascending' | 'descending';
}

const TableSortLabel: FunctionComponent<PropsWithChildren<TableSortLabelProps>> = ({
  active,
  children,
  sortingDirection,
}) => {
  const iconClasses: string[] = [styles.arrows];
  const labelClasses: string[] = [];

  if (active) {
    labelClasses.push(styles.active);
  }

  if (sortingDirection) {
    iconClasses.push(styles[sortingDirection]);
  }

  return (
    <span className={styles.wrapper}>
      <span className={labelClasses.join(' ')}>{children}</span>
      <ArrowsIcon className={iconClasses.join(' ')} />
    </span>
  );
};

export default TableSortLabel;
