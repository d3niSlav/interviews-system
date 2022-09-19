import React, { FunctionComponent, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';

import {
  clearCurrentEmployeeAction,
  deleteEmployeeAction,
  loadEmployeeAction,
  loadEmployeeListAction,
} from './employees.actions';
import { selectEmployeesPageConfiguration, selectEmployeesTableData } from './employees.selectors';
import EmployeeForm from './components/EmployeeForm';
import { loadAllCandidatesAction } from '../Candidates';
import { loadAllJobTitlesAction } from '../JobTitles';
import Table, { TableHeaderColumnTypes } from '../../components/TableNew';
import Pager, { INITIAL_PAGE } from '../../components/Pager';
import Modal, { MODAL_ANIMATION_DURATION } from '../../components/Modal';
import Button from '../../components/Button';
import { ReactComponent as EditIcon } from '../../assets/images/svg/edit-icon.svg';
import { ReactComponent as DeleteIcon } from '../../assets/images/svg/delete-icon.svg';

const Employees: FunctionComponent = () => {
  const dispatch = useDispatch();
  const pageConfig = useSelector(selectEmployeesPageConfiguration);
  const employeesData = useSelector(selectEmployeesTableData);
  const [isEmployeeEdit, setIsEmployeeEdit] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState('');

  useEffect(() => {
    dispatch(loadEmployeeListAction(pageConfig));
    dispatch(loadAllCandidatesAction());
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
  }, [employeesData]);

  const handleSortByChanged = (fieldName: string): void => {
    const orderDirection = pageConfig.sortBy !== fieldName ? 'DESC' : pageConfig.order === 'ASC' ? 'DESC' : 'ASC';
    dispatch(loadEmployeeListAction({ ...pageConfig, sortBy: fieldName, order: orderDirection }));
  };

  const handlePageChanged = (page: number): void => {
    dispatch(loadEmployeeListAction({ ...pageConfig, page }));
  };

  const openEditPopup = (entityId?: string | number): void => {
    if (entityId) {
      dispatch(loadEmployeeAction(entityId as string));
      setIsEmployeeEdit(true);
    } else {
      setIsEmployeeEdit(false);
    }

    setIsEditModalOpen(true);
  };

  const closeEditModal = (): void => {
    setIsEditModalOpen(false);
    setTimeout(() => {
      dispatch(clearCurrentEmployeeAction());
    }, MODAL_ANIMATION_DURATION);
  };

  const openDeletePopup = (entityId?: string | number): void => {
    setItemToDelete(entityId as string);
  };

  const closeDeletePopup = (): void => {
    setItemToDelete('');
  };

  const deleteEmployee = () => {
    dispatch(deleteEmployeeAction(itemToDelete));
    closeDeletePopup();
  };

  const employeesTableConfig = [
    {
      id: 'candidate.firstName',
      title: 'First name',
      sorting: false,
    },
    {
      id: 'candidate.lastName',
      title: 'Last name',
      sorting: false,
    },
    {
      id: 'candidate.email',
      title: 'Email',
      sorting: false,
    },
    {
      id: 'position.title',
      title: 'Job title',
      sorting: false,
    },
    {
      id: 'salary',
      sorting: true,
      title: 'Salary',
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
        <title>Employees | Expooze</title>
      </Helmet>
      <div style={{ padding: '10px' }}>
        <div className="header">
          <div className="header__title">Employees</div>
          <div>
            <Button text="Add" type="button" onClick={() => openEditPopup()} />
          </div>
        </div>
        <Table
          id="employees-list"
          columns={employeesTableConfig}
          data={employeesData}
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
          id="save-employee-modal"
          title={`${isEmployeeEdit ? 'Edit' : 'Create new'} employee`}
          isOpen={isEditModalOpen}
          onClose={closeEditModal}
        >
          <EmployeeForm isEdit={isEmployeeEdit} isOpen={isEmployeeEdit} onFormClose={closeEditModal} />
        </Modal>
        <Modal id="delete-employee-modal" title="Delete tag" isOpen={!!itemToDelete} onClose={closeDeletePopup}>
          Are you sure you want to delete this employee?
          <br />
          <br />
          <div className="modal-actions">
            <Button text="Delete" onClick={() => deleteEmployee()} />
            <Button onClick={() => closeDeletePopup()} text="Cancel" />
          </div>
        </Modal>
      </div>
    </>
  );
};

export default Employees;
