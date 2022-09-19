import React, { FunctionComponent, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';

import { clearCurrentTagAction, deleteTagAction, loadTagAction, loadTagListAction } from './tags.actions';
import { selectTagsPageConfiguration, selectTagsTableData } from './tags.selectors';
import TagForm from './components/TagForm';
import Table, { TableHeaderColumnTypes } from '../../components/TableNew';
import Pager, { INITIAL_PAGE } from '../../components/Pager';
import Modal, { MODAL_ANIMATION_DURATION } from '../../components/Modal';
import Button from '../../components/Button';
import { ReactComponent as EditIcon } from '../../assets/images/svg/edit-icon.svg';
import { ReactComponent as DeleteIcon } from '../../assets/images/svg/delete-icon.svg';

const Tags: FunctionComponent = () => {
  const dispatch = useDispatch();
  const pageConfig = useSelector(selectTagsPageConfiguration);
  const tagsData = useSelector(selectTagsTableData);
  const [isTagEdit, setIsTagEdit] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState('');

  useEffect(() => {
    dispatch(loadTagListAction(pageConfig));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    if (isEditModalOpen) {
      closeEditModal();
    }

    if (itemToDelete) {
      setItemToDelete('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tagsData]);

  const handleSortByChanged = (fieldName: string): void => {
    const orderDirection = pageConfig.sortBy !== fieldName ? 'DESC' : pageConfig.order === 'ASC' ? 'DESC' : 'ASC';
    dispatch(loadTagListAction({ ...pageConfig, sortBy: fieldName, order: orderDirection }));
  };

  const handlePageChanged = (page: number): void => {
    dispatch(loadTagListAction({ ...pageConfig, page }));
  };

  const openEditPopup = (entityId?: string | number): void => {
    if (entityId) {
      dispatch(loadTagAction(entityId as string));
      setIsTagEdit(true);
    } else {
      setIsTagEdit(false);
    }

    setIsEditModalOpen(true);
  };

  const closeEditModal = (): void => {
    setIsEditModalOpen(false);
    setTimeout(() => {
      dispatch(clearCurrentTagAction());
    }, MODAL_ANIMATION_DURATION);
  };

  const openDeletePopup = (entityId?: string | number): void => {
    setItemToDelete(entityId as string);
  };

  const closeDeletePopup = (): void => {
    setItemToDelete('');
  };

  const deleteTag = () => {
    dispatch(deleteTagAction(itemToDelete));
    closeDeletePopup();
  };

  const tagsTableConfig = [
    {
      id: 'title',
      sorting: true,
      title: 'Title',
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
        <title>Tags | Expooze</title>
      </Helmet>
      <div style={{ padding: '0 25px' }}>
        <div className="header">
          <div className="header__title">Tags</div>
          <div>
            <Button text="Add" type="button" onClick={() => openEditPopup()} />
          </div>
        </div>
        <Table
          id="schools-list"
          columns={tagsTableConfig}
          data={tagsData}
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
          id="save-tag-modal"
          title={`${isTagEdit ? 'Edit' : 'Create new'} tag`}
          isOpen={isEditModalOpen}
          onClose={closeEditModal}
        >
          <TagForm isEdit={isTagEdit} isOpen={isEditModalOpen} onFormClose={closeEditModal} />
        </Modal>
        <Modal id="delete-tag-modal" title="Delete tag" isOpen={!!itemToDelete} onClose={closeDeletePopup}>
          Are you sure you want to delete this tag?
          <br />
          <br />
          <div className="modal-actions">
            <Button text="Delete" onClick={() => deleteTag()} />
            <Button onClick={() => closeDeletePopup()} text="Cancel" />
          </div>
        </Modal>
      </div>
    </>
  );
};

export default Tags;
