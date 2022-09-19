import React, { FunctionComponent, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';

import {
  clearCurrentJobPositionAction,
  deleteJobPositionAction,
  loadJobPositionAction,
  loadJobPositionListAction,
} from './job-positions.actions';
import { selectJobPositionsPageConfiguration, selectJobPositionsTableData } from './job-positions.selectors';
import JobPositionForm from './components/JobPositionForm';
import { loadAllJobTitlesAction } from '../JobTitles';
import Table, { TableHeaderColumnTypes } from '../../components/TableNew';
import Pager, { INITIAL_PAGE } from '../../components/Pager';
import Modal, { MODAL_ANIMATION_DURATION } from '../../components/Modal';
import Button from '../../components/Button';
import { ReactComponent as EditIcon } from '../../assets/images/svg/edit-icon.svg';
import { ReactComponent as DeleteIcon } from '../../assets/images/svg/delete-icon.svg';

const JobPositions: FunctionComponent = () => {
  const dispatch = useDispatch();
  const pageConfig = useSelector(selectJobPositionsPageConfiguration);
  const jobPositionsData = useSelector(selectJobPositionsTableData);
  const [isJobPositionEdit, setIsJobPositionEdit] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState('');

  useEffect(() => {
    dispatch(loadJobPositionListAction(pageConfig));
    dispatch(loadAllJobTitlesAction());
  }, [dispatch]);

  useEffect(() => {
    if (isEditModalOpen) {
      closeEditModal();
    }

    if (itemToDelete) {
      setItemToDelete('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jobPositionsData]);

  const handleSortByChanged = (fieldName: string): void => {
    const orderDirection = pageConfig.sortBy !== fieldName ? 'DESC' : pageConfig.order === 'ASC' ? 'DESC' : 'ASC';
    dispatch(loadJobPositionListAction({ ...pageConfig, sortBy: fieldName, order: orderDirection }));
  };

  const handlePageChanged = (page: number): void => {
    dispatch(loadJobPositionListAction({ ...pageConfig, page }));
  };

  const openEditPopup = (entityId?: string | number): void => {
    if (entityId) {
      dispatch(loadJobPositionAction(entityId as string));
      setIsJobPositionEdit(true);
    } else {
      setIsJobPositionEdit(false);
    }

    setIsEditModalOpen(true);
  };

  const closeEditModal = (): void => {
    setIsEditModalOpen(false);
    setTimeout(() => {
      dispatch(clearCurrentJobPositionAction());
    }, MODAL_ANIMATION_DURATION);
  };

  const openDeletePopup = (entityId?: string | number): void => {
    setItemToDelete(entityId as string);
  };

  const closeDeletePopup = (): void => {
    setItemToDelete('');
  };

  const deleteJobPosition = () => {
    dispatch(deleteJobPositionAction(itemToDelete));
    closeDeletePopup();
  };

  const jobPositionsTableConfig = [
    {
      id: 'title',
      sorting: true,
      title: 'Title',
    },
    {
      id: 'jobTitle.shortTitle',
      sorting: true,
      title: 'Short Title',
    },
    {
      id: 'jobTitle.minSalary',
      sorting: true,
      title: 'Minimum Salary',
    },
    {
      id: 'jobTitle.averageSalary',
      sorting: true,
      title: 'Average Salary',
    },
    {
      id: 'jobTitle.maxSalary',
      sorting: true,
      title: 'Maximum Salary',
    },
    {
      id: 'createdAt',
      sorting: true,
      title: 'Date Created',
    },
    {
      id: 'updatedAt',
      sorting: true,
      title: 'Date Updated',
    },
    {
      id: 'actions',
      title: 'Actions',
      type: TableHeaderColumnTypes.actions,
      width: '90px',
      actions: [
        {
          icon: (
            <EditIcon
              style={{
                width: '20px',
                height: '20px',
              }}
            />
          ),
          label: 'Edit',
          handleOnClick: openEditPopup,
        },
        {
          icon: (
            <DeleteIcon
              style={{
                width: '20px',
                height: '20px',
              }}
            />
          ),
          label: 'Delete',
          handleOnClick: openDeletePopup,
        },
      ],
    },
  ];

  return (
    <>
      <Helmet>
        <title>Open Positions | Expooze</title>
      </Helmet>
      <div style={{ padding: '10px' }}>
        <div className="header">
          <div className="header__title">Open Positions</div>
          <div>
            <Button text="Add" type="button" onClick={() => openEditPopup()} />
          </div>
        </div>
        <Table
          id="open-positions-list"
          columns={jobPositionsTableConfig}
          data={jobPositionsData}
          sortingOptions={{
            order: pageConfig.order || 'DESC',
            sortBy: pageConfig.sortBy || 'createdAt',
          }}
          onSortByColumn={handleSortByChanged}
        />
        {pageConfig && pageConfig.totalPages !== INITIAL_PAGE && (
          <Pager
            currentPage={pageConfig.page}
            totalPages={pageConfig.totalPages || INITIAL_PAGE}
            onPageChange={handlePageChanged}
          />
        )}
        <Modal
          id="save-job-position-modal"
          title={`${isJobPositionEdit ? 'Edit' : 'Create new'} job position`}
          isOpen={isEditModalOpen}
          onClose={closeEditModal}
        >
          <JobPositionForm isEdit={isJobPositionEdit} isOpen={isJobPositionEdit} onFormClose={closeEditModal} />
        </Modal>
        <Modal id="delete-job-position-modal" title="Delete tag" isOpen={!!itemToDelete} onClose={closeDeletePopup}>
          Are you sure you want to delete this job position?
          <br />
          <br />
          <div className="modal-actions">
            <Button text="Delete" onClick={() => deleteJobPosition()} />
            <Button onClick={() => closeDeletePopup()} text="Cancel" />
          </div>
        </Modal>
      </div>
    </>
  );
};

export default JobPositions;
