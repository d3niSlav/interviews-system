import React, { FunctionComponent } from 'react';

import styles from './TableRowNoRecords.module.scss';
import rowStyles from '../TableBody/TableBody.module.scss';

type TableNoRecordsRowProps = {
  columnsCount?: number;
};

const TableRowNoRecords: FunctionComponent<TableNoRecordsRowProps> = ({ columnsCount = 1 }) => (
  <tr className={[styles.noContentRow, rowStyles.tableRow].join(' ')}>
    <td colSpan={columnsCount} className={styles.noContentCell}>
      No records.
    </td>
  </tr>
);

export default TableRowNoRecords;
