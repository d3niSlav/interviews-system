import React, { Fragment, FunctionComponent, ReactNode } from 'react';

import { INITIAL_PAGE, MAX_NUMBER_OF_PAGE_BOXES_WITHOUT_DOTS } from './Pager.constants';
import { ReactComponent as ArrowHead } from '../../assets/images/svg/left-arrowhead.svg';

import styles from './Pager.module.scss';

type PagerProps = {
  currentPage?: number;
  onPageChange: (pageNumber: number) => void;
  totalPages: number;
};

const Pager: FunctionComponent<PagerProps> = ({ currentPage = INITIAL_PAGE, totalPages, onPageChange }) => {
  const pagerClasses = [styles.pagerWrapper];
  const pagerButtonArrowClasses = [styles.arrowButton];
  const pagerButtonClasses = [styles.pagerButton];
  const separatorClasses = [styles.separator];
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
    onPageChange && onPageChange(pageNumber);
  };

  const renderPagerArrow = (direction: string, disabled: boolean, label: string): ReactNode => {
    const arrowClasses = [styles.arrowIcon];

    if (direction !== 'left') {
      arrowClasses.push(styles.arrowReverse);
    }

    return (
      <button
        className={[...pagerButtonClasses, ...pagerButtonArrowClasses].join(' ')}
        disabled={disabled}
        title={label}
        onClick={(): void => {
          handlePageChange(direction === 'left' ? currentPage - 1 : currentPage + 1);
        }}
      >
        <ArrowHead className={arrowClasses.join(' ')} />
      </button>
    );
  };

  const renderPageButton = (pageNumber: number): ReactNode => {
    const customAttributes = pageNumber === currentPage ? { 'aria-current': 'page' as const } : {};

    return (
      <button
        {...customAttributes}
        className={pagerButtonClasses.join(' ')}
        onClick={(): void => handlePageChange(pageNumber)}
      >
        {pageNumber}
      </button>
    );
  };

  return (
    <div className={pagerClasses.join(' ')}>
      <div className={styles.pagerContent}>
        {renderPagerArrow('left', currentPage === 1, 'Fewer results')}
        {pages.map((pageNumber, index) => (
          <Fragment key={`pager-${index}`}>
            {pageNumber === '...' ? (
              <span className={separatorClasses.join(' ')}>...</span>
            ) : (
              renderPageButton(+pageNumber)
            )}
          </Fragment>
        ))}
        {renderPagerArrow('right', currentPage === totalPages, 'More results')}
      </div>
    </div>
  );
};

export default Pager;
