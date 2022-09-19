import React, { FunctionComponent, useEffect, useState } from 'react';
import { Form } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import CandidateRow from './CandidateRow';

import styles from './CandidatesTable.module.scss';
import HeaderCell from './HeaderCell';
import { selectCandidatesPageConfiguration, selectCandidatesTableData } from '../../index';
import { deleteCandidateAction, loadCandidateListAction } from '../../index';
import Button from '../../../../components/Button';
import Modal from '../../../../components/Modal';
import Pager, { INITIAL_PAGE } from '../../../../components/Pager';

const CandidatesTable: FunctionComponent = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const pageConfig = useSelector(selectCandidatesPageConfiguration);
  const candidatesData = useSelector(selectCandidatesTableData);
  const [itemToDelete, setItemToDelete] = useState('');

  useEffect(() => {
    dispatch(loadCandidateListAction(pageConfig));
  }, [dispatch]);

  const handleSortByChanged = (fieldName: string): void => {
    const orderDirection = pageConfig.sortBy !== fieldName ? 'DESC' : pageConfig.order === 'ASC' ? 'DESC' : 'ASC';
    dispatch(loadCandidateListAction({ ...pageConfig, sortBy: fieldName, order: orderDirection }));
  };

  const handlePageChanged = (page: number): void => {
    dispatch(loadCandidateListAction({ ...pageConfig, page }));
  };

  const openDeletePopup = (entityId?: string | number): void => {
    setItemToDelete(entityId as string);
  };

  const closeDeletePopup = (): void => {
    setItemToDelete('');
  };

  const deleteCandidate = () => {
    dispatch(deleteCandidateAction(itemToDelete));
    closeDeletePopup();
  };

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const goToCreatePage = () => {
    history.push('/candidates/create');
  };

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.tableWrapper}>
          <div className={styles.tableContainer}>
            <div className="header">
              <div className="header__title">Candidates</div>
              <div>
                <Button text="Add" type="button" onClick={() => goToCreatePage()} />
              </div>
            </div>
            <Form
              onSubmit={onSubmit}
              render={({ handleSubmit, submitting, pristine }) => (
                <form onSubmit={handleSubmit} className={`full-width ${styles.form}`}>
                  <div className={styles.tableHeaders}>
                    <HeaderCell title="Name" width="250px" columnKey="firstName" />
                    <HeaderCell title="Contacts" width="130px" sortable={false} />
                    <HeaderCell title="Job title" width="calc(100% - 1005px)" columnKey="jobTitle" />
                    <HeaderCell title="Seniority" width="100px" columnKey="seniority" />
                    <HeaderCell title="Social media" width="200px" sortable={false} />
                    <HeaderCell title="Status" width="100px" columnKey="status" />
                    <HeaderCell title="Actions" width="150px" sortable={false} />
                  </div>
                  <div className={styles.tableBody} role="rowgroup">
                    {candidatesData.map((data, index) => (
                      <CandidateRow key={index} {...data} handleOnDelete={openDeletePopup} />
                    ))}
                  </div>
                </form>
              )}
            />
            {pageConfig && pageConfig.totalPages !== INITIAL_PAGE && (
              <Pager
                currentPage={pageConfig.page}
                totalPages={pageConfig.totalPages || INITIAL_PAGE}
                onPageChange={handlePageChanged}
              />
            )}
          </div>
        </div>
        <Modal id="delete-candidate-modal" title="Delete tag" isOpen={!!itemToDelete} onClose={closeDeletePopup}>
          Are you sure you want to delete this candidate?
          <br />
          <br />
          <div className="modal-actions">
            <Button text="Delete" onClick={() => deleteCandidate()} />
            <Button onClick={() => closeDeletePopup()} text="Cancel" />
          </div>
        </Modal>
      </div>
    </>
  );
};

export default CandidatesTable;
