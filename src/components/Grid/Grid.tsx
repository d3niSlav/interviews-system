import React, { FunctionComponent } from 'react';

import { DEFAULT_GRID_COLSPAN_SIZE, GridColSpanSize } from './Grid.constants';

import styles from './Grid.module.scss';

type GridProps = {
  bleed?: boolean;
  className?: string;
  compact?: boolean;
  container?: boolean;
  item?: boolean;
  xs?: boolean | GridColSpanSize;
  sm?: boolean | GridColSpanSize;
  md?: boolean | GridColSpanSize;
  lg?: boolean | GridColSpanSize;
  xl?: boolean | GridColSpanSize;
};

const Grid: FunctionComponent<GridProps> = ({
  bleed = false,
  className,
  compact = false,
  container = false,
  item = false,
  xs = DEFAULT_GRID_COLSPAN_SIZE,
  sm = false,
  md = false,
  lg = false,
  xl = false,
  children,
}) => {
  const gridClasses = [];
  let content = <div>children</div>;

  if (className) {
    gridClasses.push(className);
  }

  if (container) {
    gridClasses.push(styles.container);
    const rowClasses = [styles.row];

    if (bleed) {
      gridClasses.push('o-grid-container--bleed');
    }

    if (compact) {
      rowClasses.push('o-grid-row--compact');
    }

    content = (
      <div className={gridClasses.join(' ')}>
        <div className={rowClasses.join(' ')}>{children}</div>
      </div>
    );
  } else if (item) {
    gridClasses.push(styles.col);
    const colspan = {
      xs: styles[`col${typeof xs === 'number' ? xs : DEFAULT_GRID_COLSPAN_SIZE}`],
      sm: typeof sm === 'number' ? styles[`colsm${sm}`] : false,
      md: typeof md === 'number' ? styles[`colmd${md}`] : false,
      lg: typeof lg === 'number' ? styles[`collg${lg}`] : false,
      xl: typeof xl === 'number' ? styles[`colxl${xl}`] : false,
    };

    gridClasses.push(
      Object.values(colspan)
        .filter((colValue) => !!colValue)
        .join(' '),
    );

    content = <div className={gridClasses.join(' ')}>{children}</div>;
  }

  return content;
};

export default Grid;
