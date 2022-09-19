import React, { FunctionComponent, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';

import { clearCurrentTopicAction, deleteTopicAction, loadTopicAction, loadTopicListAction } from './topics.actions';
import { selectTopicsPageConfiguration, selectTopicsTableData } from './topics.selectors';
import TopicForm from './components/TopicForm';
import { loadAllSubjectsAction } from '../Subjects';
import { loadAllTagsAction } from '../Tags';
import Table, { TableHeaderColumnTypes } from '../../components/TableNew';
import Pager, { INITIAL_PAGE } from '../../components/Pager';
import Modal, { MODAL_ANIMATION_DURATION } from '../../components/Modal';
import Button from '../../components/Button';

import { ReactComponent as EditIcon } from '../../assets/images/svg/edit-icon.svg';
import { ReactComponent as DeleteIcon } from '../../assets/images/svg/delete-icon.svg';

const Topics: FunctionComponent = () => {
  const dispatch = useDispatch();
  const pageConfig = useSelector(selectTopicsPageConfiguration);
  const topicsData = useSelector(selectTopicsTableData);
  const [isTopicEdit, setIsTopicEdit] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState('');

  useEffect(() => {
    dispatch(loadTopicListAction(pageConfig));
    dispatch(loadAllSubjectsAction());
    dispatch(loadAllTagsAction());
  }, [dispatch]);

  useEffect(() => {
    if (isEditModalOpen) {
      closeEditModal();
    }

    if (itemToDelete) {
      setItemToDelete('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topicsData]);

  const handleSortByChanged = (fieldName: string): void => {
    const orderDirection = pageConfig.sortBy !== fieldName ? 'DESC' : pageConfig.order === 'ASC' ? 'DESC' : 'ASC';
    dispatch(loadTopicListAction({ ...pageConfig, sortBy: fieldName, order: orderDirection }));
  };

  const handlePageChanged = (page: number): void => {
    dispatch(loadTopicListAction({ ...pageConfig, page }));
  };

  const openEditPopup = (entityId?: string | number): void => {
    if (entityId) {
      dispatch(loadTopicAction(entityId as string));
      setIsTopicEdit(true);
    } else {
      setIsTopicEdit(false);
    }

    setIsEditModalOpen(true);
  };

  const closeEditModal = (): void => {
    setIsEditModalOpen(false);
    setTimeout(() => {
      dispatch(clearCurrentTopicAction());
    }, MODAL_ANIMATION_DURATION);
  };

  const openDeletePopup = (entityId?: string | number): void => {
    setItemToDelete(entityId as string);
  };

  const closeDeletePopup = (): void => {
    setItemToDelete('');
  };

  const deleteTopic = () => {
    dispatch(deleteTopicAction(itemToDelete));
    closeDeletePopup();
  };

  const topicsTableConfig = [
    {
      id: 'id',
      title: 'ID',
      sorting: true,
    },
    {
      id: 'title',
      sorting: true,
      title: 'Title',
    },
    {
      id: 'order',
      sorting: true,
      title: 'Order',
    },
    {
      id: 'difficulty',
      sorting: true,
      title: 'Difficulty',
    },
    {
      id: 'subject.title',
      sorting: false,
      title: 'Subject',
    },
    {
      id: 'questions',
      sorting: false,
      title: 'Questions',
      type: TableHeaderColumnTypes.count,
    },
    {
      id: 'tags',
      sorting: false,
      title: 'Tags',
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
        <title>Topics | Expooze</title>
      </Helmet>
      <div style={{ padding: '10px' }}>
        <div className="header">
          <div className="header__title">Topics</div>
          <div>
            <Button text="Add" type="button" onClick={() => openEditPopup()} />
          </div>
        </div>
        <Table
          id="schools-list"
          columns={topicsTableConfig}
          data={topicsData}
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
          id="save-topic-modal"
          title={`${isTopicEdit ? 'Edit' : 'Create new'} topic`}
          isOpen={isEditModalOpen}
          onClose={closeEditModal}
        >
          <TopicForm isEdit={isTopicEdit} isOpen={isTopicEdit} onFormClose={closeEditModal} />
        </Modal>
        <Modal id="delete-topic-modal" title="Delete tag" isOpen={!!itemToDelete} onClose={closeDeletePopup}>
          Are you sure you want to delete this topic?
          <br />
          <br />
          <div className="modal-actions">
            <Button text="Delete" onClick={() => deleteTopic()} />
            <Button onClick={() => closeDeletePopup()} text="Cancel" />
          </div>
        </Modal>
      </div>
    </>
  );
};

export default Topics;
