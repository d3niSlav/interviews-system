import React, { FunctionComponent } from 'react';
import { Form } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';

import { createNewEmployeeAction, editEmployeeAction } from '../employees.actions';
import { CreateEmployeeDTO, EditEmployeeDTO, EmployeeDTO } from '../employees.dto';
import { selectEmployee } from '../employees.selectors';
import { CREATE_EMPLOYEE, EDIT_EMPLOYEE, LOAD_EMPLOYEE } from '../employees.types';
import styles from '../../Auth/Auth.module.scss';
import { selectAllCandidatesData } from '../../Candidates';
import { selectAllJobTitlesData } from '../../JobTitles';
import Button from '../../../components/Button';
import { composeValidators, minValue, mustBeNumber, SelectField, TextInputField } from '../../../components/FormFields';
import { MODAL_ANIMATION_DURATION } from '../../../components/Modal';
import {
  selectAreRequestsLoading,
  selectRequestErrorMessage,
  selectRequestFormErrors,
} from '../../../shared/state/global-request';

type EmployeeFormProps = {
  isEdit?: boolean;
  isOpen?: boolean;
  onFormClose: () => void;
};

const EmployeeForm: FunctionComponent<EmployeeFormProps> = ({ isEdit = false, onFormClose }) => {
  const dispatch = useDispatch();
  const currentEmployee = useSelector(selectEmployee) as EmployeeDTO;
  const candidates = useSelector(selectAllCandidatesData);
  const jobTitles = useSelector(selectAllJobTitlesData);

  const isLoading = useSelector(selectAreRequestsLoading([CREATE_EMPLOYEE, EDIT_EMPLOYEE, LOAD_EMPLOYEE]));
  const formErrors = useSelector(selectRequestFormErrors(isEdit ? EDIT_EMPLOYEE : CREATE_EMPLOYEE));
  const mainError = useSelector(selectRequestErrorMessage(isEdit ? EDIT_EMPLOYEE : CREATE_EMPLOYEE));

  const onSubmit = async (data: CreateEmployeeDTO | EditEmployeeDTO) => {
    const { salary, ...formData } = data;
    const employeeData = {
      ...formData,
      ...(typeof salary !== 'undefined' ? { salary: +salary } : {}),
    };

    if (isEdit && currentEmployee?.id) {
      const { id } = currentEmployee as EmployeeDTO;
      dispatch(editEmployeeAction({ ...employeeData, id }));
    } else {
      dispatch(createNewEmployeeAction({ ...employeeData }));
    }
  };

  const closeForm = (reset?: any) => {
    setTimeout(() => {
      reset && reset({});
    }, MODAL_ANIMATION_DURATION);
    onFormClose && onFormClose();
  };

  return (
    <Form
      initialValues={{
        ...currentEmployee,
        candidateId: currentEmployee?.candidate?.id,
        positionId: currentEmployee?.position?.id,
      }}
      onSubmit={onSubmit}
      render={({ handleSubmit, submitting, pristine, form }) => (
        <form onSubmit={handleSubmit} className={`full-width ${styles.form}`}>
          <SelectField
            title="Candidate"
            name="candidateId"
            required
            error={mainError || (Array.isArray(formErrors.candidateId) ? formErrors.candidateId[0] : '')}
            options={candidates.map(({ id, firstName, lastName, email }) => ({
              label: `${firstName} ${lastName} (${email})`,
              value: id,
            }))}
          />
          <SelectField
            title="Job title"
            name="positionId"
            required
            options={jobTitles.map(({ id, title }) => ({ label: title, value: id }))}
          />
          <TextInputField
            title="Salary"
            name="salary"
            placeholder="Enter salary..."
            type="number"
            required
            error={Array.isArray(formErrors.minSalary) ? formErrors.minSalary[0] : ''}
            fieldProps={{
              validate: composeValidators(minValue(0, 'Enter a valid salary!'), mustBeNumber('Enter a valid salary!')),
            }}
          />
          <div className="modal-actions">
            <Button
              className={styles.submitAction}
              disabled={submitting || pristine || isLoading}
              text={isEdit ? 'Save' : 'Create'}
              type="submit"
            />
            <Button onClick={() => closeForm(form.reset)} text="Close" />
          </div>
        </form>
      )}
    />
  );
};

export default EmployeeForm;
