import React, { FunctionComponent, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';

import {
  clearCurrentSubjectAction,
  deleteSubjectAction,
  loadSubjectAction,
  loadSubjectListAction,
} from './subjects.actions';
import { selectSubjectsPageConfiguration, selectSubjectsTableData } from './subjects.selectors';
import SubjectForm from './components/SubjectForm';
import { loadAllTagsAction } from '../Tags';
import { loadAllTopicsAction } from '../Topics';
import Table, { TableHeaderColumnTypes } from '../../components/TableNew';
import Pager, { INITIAL_PAGE } from '../../components/Pager';
import Modal, { MODAL_ANIMATION_DURATION } from '../../components/Modal';
import Button from '../../components/Button';
import { ReactComponent as EditIcon } from '../../assets/images/svg/edit-icon.svg';
import { ReactComponent as DeleteIcon } from '../../assets/images/svg/delete-icon.svg';

const Subjects: FunctionComponent = () => {
  const dispatch = useDispatch();
  const pageConfig = useSelector(selectSubjectsPageConfiguration);
  const subjectsData = useSelector(selectSubjectsTableData);
  const [isSubjectEdit, setIsSubjectEdit] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState('');

  useEffect(() => {
    dispatch(loadSubjectListAction(pageConfig));
    dispatch(loadAllTagsAction());
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
  }, [subjectsData]);

  const handleSortByChanged = (fieldName: string): void => {
    const orderDirection = pageConfig.sortBy !== fieldName ? 'DESC' : pageConfig.order === 'ASC' ? 'DESC' : 'ASC';
    dispatch(loadSubjectListAction({ ...pageConfig, sortBy: fieldName, order: orderDirection }));
  };

  const handlePageChanged = (page: number): void => {
    dispatch(loadSubjectListAction({ ...pageConfig, page }));
  };

  const openEditPopup = (entityId?: string | number): void => {
    if (entityId) {
      dispatch(loadSubjectAction(entityId as string));
      setIsSubjectEdit(true);
    } else {
      setIsSubjectEdit(false);
    }

    setIsEditModalOpen(true);
  };

  const closeEditModal = (): void => {
    setIsEditModalOpen(false);
    setTimeout(() => {
      dispatch(clearCurrentSubjectAction());
    }, MODAL_ANIMATION_DURATION);
  };

  const openDeletePopup = (entityId?: string | number): void => {
    setItemToDelete(entityId as string);
  };

  const closeDeletePopup = (): void => {
    setItemToDelete('');
  };

  const deleteSubject = () => {
    dispatch(deleteSubjectAction(itemToDelete));
    closeDeletePopup();
  };

  const subjectsTableConfig = [
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
      id: 'topics',
      sorting: false,
      title: 'Topics',
      type: TableHeaderColumnTypes.count,
    },
    {
      id: 'tags',
      sorting: true,
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
        <title>Subjects | Expooze</title>
      </Helmet>
      <div style={{ padding: '10px' }}>
        <div className="header">
          <div className="header__title">Subjects</div>
          <div>
            <Button text="Add" type="button" onClick={() => openEditPopup()} />
          </div>
        </div>
        <Table
          id="subjects-list"
          columns={subjectsTableConfig}
          data={subjectsData}
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
          id="save-subject-modal"
          title={`${isSubjectEdit ? 'Edit' : 'Create new'} subject`}
          isOpen={isEditModalOpen}
          onClose={closeEditModal}
        >
          <SubjectForm isEdit={isSubjectEdit} isOpen={isSubjectEdit} onFormClose={closeEditModal} />
        </Modal>
        <Modal id="delete-subject-modal" title="Delete tag" isOpen={!!itemToDelete} onClose={closeDeletePopup}>
          Are you sure you want to delete this subject?
          <br />
          <br />
          <div className="modal-actions">
            <Button text="Delete" onClick={() => deleteSubject()} />
            <Button onClick={() => closeDeletePopup()} text="Cancel" />
          </div>
        </Modal>
      </div>
    </>
  );
};

export default Subjects;
