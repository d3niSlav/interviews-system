import React, { Fragment, PropsWithChildren, ReactElement, ReactNode } from 'react';
import { TableInstance } from 'react-table';

import { INITIAL_PAGE, MAX_NUMBER_OF_PAGE_BOXES_WITHOUT_DOTS } from './TablePagination.constants';

import styles from './TablePagination.module.scss';

function TablePagination<T extends Record<string, unknown>>({
  instance,
}: PropsWithChildren<{ instance: TableInstance<T> }>): ReactElement | null {
  const {
    state: { pageIndex, pageSize },
    gotoPage,
    setPageSize,
    pageCount: totalPages,
  } = instance;
  const currentPage = pageIndex + 1;
  let pages: (string | number)[];

  if (totalPages <= MAX_NUMBER_OF_PAGE_BOXES_WITHOUT_DOTS) {
    pages = Array.from({ length: totalPages }, (_, index: number) => index + 1);
  } else {
    switch (true) {
      case currentPage < 3 || currentPage > totalPages - 2: {
        pages = [INITIAL_PAGE, INITIAL_PAGE + 1, INITIAL_PAGE + 2, '...', totalPages - 2, totalPages - 1, totalPages];
        break;
      }
      case currentPage === 3: {
        pages = [INITIAL_PAGE, currentPage - 1, currentPage, currentPage + 1, '...', totalPages - 1, totalPages];
        break;
      }
      case currentPage === totalPages - 2: {
        pages = [INITIAL_PAGE, INITIAL_PAGE + 1, '...', currentPage - 1, currentPage, currentPage + 1, totalPages];
        break;
      }
      default: {
        pages = [INITIAL_PAGE, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
      }
    }
  }

  const handlePageChange = (pageNumber: number): void => {
    gotoPage(pageNumber);
  };

  const renderPagerArrow = (direction: string, disabled: boolean, label: string, text: ReactNode): ReactNode => (
    <button
      className={styles.arrowButton}
      disabled={disabled}
      onClick={(): void => {
        handlePageChange(direction === 'left' ? currentPage - 1 : currentPage + 1);
      }}
    >
      <span title={label}>{text}</span>
    </button>
  );

  const renderPageButton = (pageNumber: number): ReactNode => {
    const buttonClasses = [styles.pageButton];

    if (currentPage === pageNumber) {
      buttonClasses.push(styles.active);
    }

    return (
      <button className={buttonClasses.join(' ')} onClick={(): void => handlePageChange(pageNumber)}>
        {pageNumber}
      </button>
    );
  };

  return (
    <div className="text-center">
      {renderPagerArrow('left', currentPage === 1, 'Fewer results', '<')}
      <div className={styles.pagesContainer}>
        {pages.map((pageNumber, index) => (
          <Fragment key={`pager-${index}`}>
            {pageNumber === '...' ? <span className={styles.separator}>...</span> : renderPageButton(+pageNumber)}
          </Fragment>
        ))}
      </div>
      {renderPagerArrow('right', currentPage === totalPages, 'More results', '>')}
    </div>
  );
}

export default TablePagination;
