import React, { FunctionComponent, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';

import {
  clearCurrentInterviewAction,
  deleteInterviewAction,
  loadInterviewAction,
  loadInterviewListAction,
} from './interviews.actions';
import { selectInterviewsPageConfiguration, selectInterviewsTableData } from './interviews.selectors';
import InterviewForm from './components/InterviewForm';
import { loadAllCandidatesAction } from '../Candidates';
import { loadAllJobPositionsAction } from '../JobPositions';
import { loadAllProgrammingLanguagesAction } from '../JobTitles';
import { loadAllTagsAction } from '../Tags';
import Table, { TableHeaderColumnTypes } from '../../components/TableNew';
import Pager, { INITIAL_PAGE } from '../../components/Pager';
import Modal, { MODAL_ANIMATION_DURATION } from '../../components/Modal';
import Button from '../../components/Button';
import { ReactComponent as EditIcon } from '../../assets/images/svg/edit-icon.svg';
import { ReactComponent as DeleteIcon } from '../../assets/images/svg/delete-icon.svg';

const Interviews: FunctionComponent = () => {
  const dispatch = useDispatch();
  const pageConfig = useSelector(selectInterviewsPageConfiguration);
  const interviewsData = useSelector(selectInterviewsTableData);
  const [isInterviewEdit, setIsInterviewEdit] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState('');

  useEffect(() => {
    dispatch(loadInterviewListAction(pageConfig));
    dispatch(loadAllCandidatesAction());
    dispatch(loadAllTagsAction());
    dispatch(loadAllJobPositionsAction());
    dispatch(loadAllProgrammingLanguagesAction());
  }, [dispatch]);

  useEffect(() => {
    if (isEditModalOpen) {
      closeEditModal();
    }

    if (itemToDelete) {
      setItemToDelete('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [interviewsData]);

  const handleSortByChanged = (fieldName: string): void => {
    const orderDirection = pageConfig.sortBy !== fieldName ? 'DESC' : pageConfig.order === 'ASC' ? 'DESC' : 'ASC';
    dispatch(loadInterviewListAction({ ...pageConfig, sortBy: fieldName, order: orderDirection }));
  };

  const handlePageChanged = (page: number): void => {
    dispatch(loadInterviewListAction({ ...pageConfig, page }));
  };

  const openEditPopup = (entityId?: string | number): void => {
    if (entityId) {
      dispatch(loadInterviewAction(entityId as string));
      setIsInterviewEdit(true);
    } else {
      setIsInterviewEdit(false);
    }

    setIsEditModalOpen(true);
  };

  const closeEditModal = (): void => {
    setIsEditModalOpen(false);
    setTimeout(() => {
      dispatch(clearCurrentInterviewAction());
    }, MODAL_ANIMATION_DURATION);
  };

  const openDeletePopup = (entityId?: string | number): void => {
    setItemToDelete(entityId as string);
  };

  const closeDeletePopup = (): void => {
    setItemToDelete('');
  };

  const deleteInterview = () => {
    dispatch(deleteInterviewAction(itemToDelete));
    closeDeletePopup();
  };

  const interviewsTableConfig = [
    {
      id: 'title',
      sorting: true,
      title: 'Title',
    },
    {
      id: 'position.title',
      sorting: false,
      title: 'Job Position',
    },
    {
      id: 'programmingLanguage.title',
      sorting: false,
      title: 'Language',
    },
    {
      id: 'interviewDate',
      sorting: true,
      title: 'Date',
    },
    {
      id: 'candidates',
      sorting: true,
      title: 'No of Candidates',
      type: TableHeaderColumnTypes.count,
    },
    {
      id: 'tags',
      sorting: true,
      title: 'Tags',
      type: TableHeaderColumnTypes.count,
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
        <title>Interviews | Expooze</title>
      </Helmet>
      <div style={{ padding: '10px' }}>
        <div className="header">
          <div className="header__title">Interviews</div>
          <div>
            <Button text="Add" type="button" onClick={() => openEditPopup()} />
          </div>
        </div>
        <Table
          id="schools-list"
          columns={interviewsTableConfig}
          data={interviewsData}
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
          id="save-interview-modal"
          title={`${isInterviewEdit ? 'Edit' : 'Create new'} interview`}
          isOpen={isEditModalOpen}
          onClose={closeEditModal}
        >
          <InterviewForm isEdit={isInterviewEdit} isOpen={isInterviewEdit} onFormClose={closeEditModal} />
        </Modal>
        <Modal id="delete-interview-modal" title="Delete tag" isOpen={!!itemToDelete} onClose={closeDeletePopup}>
          Are you sure you want to delete this interview?
          <br />
          <br />
          <div className="modal-actions">
            <Button text="Delete" onClick={() => deleteInterview()} />
            <Button onClick={() => closeDeletePopup()} text="Cancel" />
          </div>
        </Modal>
      </div>
    </>
  );
};

export default Interviews;
