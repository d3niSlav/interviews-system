import React, { FunctionComponent, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';

import {
  clearCurrentJobTitleAction,
  deleteJobTitleAction,
  loadJobTitleAction,
  loadJobTitleListAction,
} from './job-titles.actions';
import { selectJobTitlesPageConfiguration, selectJobTitlesTableData } from './job-titles.selectors';
import JobTitleForm from './components/JobTitleForm';
import Table, { TableHeaderColumnTypes } from '../../components/TableNew';
import Pager, { INITIAL_PAGE } from '../../components/Pager';
import Modal, { MODAL_ANIMATION_DURATION } from '../../components/Modal';
import Button from '../../components/Button';
import { ReactComponent as EditIcon } from '../../assets/images/svg/edit-icon.svg';
import { ReactComponent as DeleteIcon } from '../../assets/images/svg/delete-icon.svg';

const JobTitles: FunctionComponent = () => {
  const dispatch = useDispatch();
  const pageConfig = useSelector(selectJobTitlesPageConfiguration);
  const jobTitlesData = useSelector(selectJobTitlesTableData);
  const [isJobTitleEdit, setIsJobTitleEdit] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState('');

  useEffect(() => {
    dispatch(loadJobTitleListAction(pageConfig));
  }, [dispatch]);

  useEffect(() => {
    if (isEditModalOpen) {
      closeEditModal();
    }

    if (itemToDelete) {
      setItemToDelete('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jobTitlesData]);

  const handleSortByChanged = (fieldName: string): void => {
    const orderDirection = pageConfig.sortBy !== fieldName ? 'DESC' : pageConfig.order === 'ASC' ? 'DESC' : 'ASC';
    dispatch(loadJobTitleListAction({ ...pageConfig, sortBy: fieldName, order: orderDirection }));
  };

  const handlePageChanged = (page: number): void => {
    dispatch(loadJobTitleListAction({ ...pageConfig, page }));
  };

  const openEditPopup = (entityId?: string | number): void => {
    if (entityId) {
      dispatch(loadJobTitleAction(entityId as string));
      setIsJobTitleEdit(true);
    } else {
      setIsJobTitleEdit(false);
    }

    setIsEditModalOpen(true);
  };

  const closeEditModal = (): void => {
    setIsEditModalOpen(false);
    setTimeout(() => {
      dispatch(clearCurrentJobTitleAction());
    }, MODAL_ANIMATION_DURATION);
  };

  const openDeletePopup = (entityId?: string | number): void => {
    setItemToDelete(entityId as string);
  };

  const closeDeletePopup = (): void => {
    setItemToDelete('');
  };

  const deleteJobTitle = () => {
    dispatch(deleteJobTitleAction(itemToDelete));
    closeDeletePopup();
  };

  const jobTitlesTableConfig = [
    {
      id: 'title',
      sorting: true,
      title: 'Title',
    },
    {
      id: 'shortTitle',
      sorting: true,
      title: 'Short Title',
    },
    {
      id: 'minSalary',
      sorting: true,
      title: 'Minimum Salary',
    },
    {
      id: 'averageSalary',
      sorting: true,
      title: 'Average Salary',
    },
    {
      id: 'maxSalary',
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
        <title>Job Titles | Expooze</title>
      </Helmet>
      <div style={{ padding: '10px' }}>
        <div className="header">
          <div className="header__title">Job Titles</div>
          <div>
            <Button text="Add" type="button" onClick={() => openEditPopup()} />
          </div>
        </div>
        <Table
          id="schools-list"
          columns={jobTitlesTableConfig}
          data={jobTitlesData}
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
          id="save-job-title-modal"
          title={`${isJobTitleEdit ? 'Edit' : 'Create new'} job title`}
          isOpen={isEditModalOpen}
          onClose={closeEditModal}
        >
          <JobTitleForm isEdit={isJobTitleEdit} isOpen={isJobTitleEdit} onFormClose={closeEditModal} />
        </Modal>
        <Modal id="delete-job-title-modal" title="Delete tag" isOpen={!!itemToDelete} onClose={closeDeletePopup}>
          Are you sure you want to delete this job title?
          <br />
          <br />
          <div className="modal-actions">
            <Button text="Delete" onClick={() => deleteJobTitle()} />
            <Button onClick={() => closeDeletePopup()} text="Cancel" />
          </div>
        </Modal>
      </div>
    </>
  );
};

export default JobTitles;
