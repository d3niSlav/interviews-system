import React, { FunctionComponent, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';

import {
  clearCurrentQuestionAction,
  deleteQuestionAction,
  loadQuestionAction,
  loadQuestionListAction,
} from './questions.actions';
import { selectQuestionsPageConfiguration, selectQuestionsTableData } from './questions.selectors';
import QuestionForm from './components/QuestionForm';
import { loadAllTopicsAction } from '../Topics';
import Table, { TableHeaderColumnTypes } from '../../components/TableNew';
import Pager, { INITIAL_PAGE } from '../../components/Pager';
import Modal, { MODAL_ANIMATION_DURATION } from '../../components/Modal';
import Button from '../../components/Button';
import { ReactComponent as EditIcon } from '../../assets/images/svg/edit-icon.svg';
import { ReactComponent as DeleteIcon } from '../../assets/images/svg/delete-icon.svg';

const Questions: FunctionComponent = () => {
  const dispatch = useDispatch();
  const pageConfig = useSelector(selectQuestionsPageConfiguration);
  const questionsData = useSelector(selectQuestionsTableData);
  const [isQuestionEdit, setIsQuestionEdit] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState('');

  useEffect(() => {
    dispatch(loadQuestionListAction(pageConfig));
    dispatch(loadAllTopicsAction());
  }, [dispatch]);

  useEffect(() => {
    if (isEditModalOpen) {
      closeEditModal();
    }

    if (itemToDelete) {
      setItemToDelete('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionsData]);

  const handleSortByChanged = (fieldName: string): void => {
    const orderDirection = pageConfig.sortBy !== fieldName ? 'DESC' : pageConfig.order === 'ASC' ? 'DESC' : 'ASC';
    dispatch(loadQuestionListAction({ ...pageConfig, sortBy: fieldName, order: orderDirection }));
  };

  const handlePageChanged = (page: number): void => {
    dispatch(loadQuestionListAction({ ...pageConfig, page }));
  };

  const openEditPopup = (entityId?: string | number): void => {
    if (entityId) {
      dispatch(loadQuestionAction(entityId as string));
      setIsQuestionEdit(true);
    } else {
      setIsQuestionEdit(false);
    }

    setIsEditModalOpen(true);
  };

  const closeEditModal = (): void => {
    setIsEditModalOpen(false);
    setTimeout(() => {
      dispatch(clearCurrentQuestionAction());
    }, MODAL_ANIMATION_DURATION);
  };

  const openDeletePopup = (entityId?: string | number): void => {
    setItemToDelete(entityId as string);
  };

  const closeDeletePopup = (): void => {
    setItemToDelete('');
  };

  const deleteQuestion = () => {
    dispatch(deleteQuestionAction(itemToDelete));
    closeDeletePopup();
  };

  const questionsTableConfig = [
    {
      id: 'id',
      title: 'ID',
      sorting: true,
    },
    {
      id: 'text',
      sorting: true,
      title: 'Question',
    },
    {
      id: 'topics',
      sorting: false,
      title: 'Topics',
      type: TableHeaderColumnTypes.count,
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
        <title>Questions | Expooze</title>
      </Helmet>
      <div style={{ padding: '10px' }}>
        <div className="header">
          <div className="header__title">Questions</div>
          <div>
            <Button text="Add" type="button" onClick={() => openEditPopup()} />
          </div>
        </div>
        <Table
          id="schools-list"
          columns={questionsTableConfig}
          data={questionsData}
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
          id="save-question-modal"
          title={`${isQuestionEdit ? 'Edit' : 'Create new'} question`}
          isOpen={isEditModalOpen}
          onClose={closeEditModal}
        >
          <QuestionForm isEdit={isQuestionEdit} isOpen={isQuestionEdit} onFormClose={closeEditModal} />
        </Modal>
        <Modal id="delete-question-modal" title="Delete tag" isOpen={!!itemToDelete} onClose={closeDeletePopup}>
          Are you sure you want to delete this question?
          <br />
          <br />
          <div className="modal-actions">
            <Button text="Delete" onClick={() => deleteQuestion()} />
            <Button onClick={() => closeDeletePopup()} text="Cancel" />
          </div>
        </Modal>
      </div>
    </>
  );
};

export default Questions;
