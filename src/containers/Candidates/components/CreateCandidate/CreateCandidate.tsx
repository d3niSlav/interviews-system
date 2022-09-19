import React, { FunctionComponent, useEffect } from 'react';
import { Form } from 'react-final-form';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';

import { createNewCandidateAction } from '../../candidates.actions';
import { loadAllJobPositionsAction, selectAllJobPositionsData } from '../../../JobPositions';
import { loadAllTagsAction, selectAllTagsData } from '../../../Tags';
import Button from '../../../../components/Button';
import Grid from '../../../../components/Grid';
import {
  CheckboxesField,
  composeValidators,
  isEmail,
  notEmpty,
  RadioInputField,
  required,
  SelectField,
  TextAreaField,
  TextInputField,
} from '../../../../components/FormFields';

import { ReactComponent as FacebookIcon } from '../../../../assets/images/svg/facebook-logo.svg';
import { ReactComponent as InstagramIcon } from '../../../../assets/images/svg/instagram-logo.svg';
import { ReactComponent as LinkedInIcon } from '../../../../assets/images/svg/linkedin-logo.svg';
import { ReactComponent as TwitterIcon } from '../../../../assets/images/svg/twitter-logo.svg';
import { ReactComponent as WhatsAppIcon } from '../../../../assets/images/svg/whatsapp-logo.svg';
import { ReactComponent as VKontakteIcon } from '../../../../assets/images/svg/vk-logo.svg';

const CreateCandidate: FunctionComponent = () => {
  const dispatch = useDispatch();
  const jobPositions = useSelector(selectAllJobPositionsData);
  const tags = useSelector(selectAllTagsData);

  useEffect(() => {
    dispatch(loadAllJobPositionsAction());
    dispatch(loadAllTagsAction());
  }, [dispatch]);

  const onSubmit = async (data: any) => {
    const { jobTitle, seniorityLevel, skillIds, fields, years, ...candidateData } = data;

    const experience = [
      {
        jobTitle,
        seniorityLevel,
        skillIds,
        years,
        fields,
      },
    ];

    dispatch(createNewCandidateAction({ ...candidateData, experience }));
  };

  return (
    <>
      <Helmet>
        <title>Create candidate | Expooze</title>
      </Helmet>
      <div style={{ padding: '10px' }}>
        <div className="header">
          <div className="header__title">Create new candidate</div>
          <br />
          <br />
        </div>
        <Form
          onSubmit={onSubmit}
          initialValues={{}}
          // validate={(values: any) => {
          //   const errors: FormError = {};
          //
          //   if (!values.toppings || (Array.isArray(values.toppings) && values.toppings.length === 0)) {
          //     errors.toppings = 'Select at least one topping!';
          //   }
          //
          //   return errors;
          // }}
          render={({ handleSubmit, form, submitting, valid, pristine, values }) => (
            <form onSubmit={handleSubmit} className="full-width">
              <Grid container className="full-width">
                <Grid item>
                  <p className="color-accent">Basic information</p>
                  <br />
                </Grid>
                <Grid item>
                  <Grid container className="full-width">
                    <Grid item md={4}>
                      <TextInputField
                        title="First name"
                        name="firstName"
                        placeholder="Enter first name..."
                        required
                        fieldProps={{
                          validate: composeValidators(required(), notEmpty()),
                        }}
                      />
                    </Grid>
                    <Grid item md={4}>
                      <TextInputField title="Middle name" name="middleName" placeholder="Enter middle name..." />
                    </Grid>
                    <Grid item md={4}>
                      <TextInputField
                        title="Last name"
                        name="lastName"
                        placeholder="Enter last name..."
                        required
                        fieldProps={{
                          validate: composeValidators(required(), notEmpty()),
                        }}
                      />
                    </Grid>
                  </Grid>
                  <Grid container className="full-width">
                    <Grid item md={8}>
                      <TextInputField
                        title="Email"
                        type="email"
                        name="email"
                        placeholder="Enter email..."
                        required
                        fieldProps={{
                          validate: composeValidators(required(), notEmpty(), isEmail()),
                        }}
                      />
                    </Grid>
                    <Grid item md={4}>
                      <TextInputField
                        title="Phone number"
                        name="phoneNumber"
                        placeholder="Enter phone number..."
                        required
                        fieldProps={{
                          validate: composeValidators(required(), notEmpty()),
                        }}
                      />
                    </Grid>
                  </Grid>
                  <Grid container className="full-width">
                    <Grid item>
                      <TextAreaField
                        title="Introduction"
                        name="introduction"
                        placeholder="Enter some basic introduction for the candidate..."
                        rows={5}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <br />
              <Grid container className="full-width">
                <Grid item>
                  <p className="color-accent">Personal information</p>
                  <br />
                </Grid>
                <Grid item>
                  <Grid container className="full-width">
                    <Grid item xs={7} sm={8} lg={4}>
                      <TextInputField title="Date of birth" name="dateOfBirth" placeholder="Select date of birth..." />
                    </Grid>
                    <Grid item xs={5} sm={4} lg={2}>
                      <TextInputField type="number" title="Age" name="age" placeholder="Enter age..." />
                    </Grid>
                    <Grid item md={6} lg={6}>
                      <RadioInputField
                        title="Gender"
                        name="gender"
                        inline
                        options={[
                          { label: 'Male', value: 'male' },
                          { label: 'Female', value: 'female' },
                          { label: 'Non-binary', value: 'non-binary' },
                        ]}
                      />
                    </Grid>
                  </Grid>
                  <Grid container className="full-width">
                    <Grid item>
                      <Grid container className="full-width">
                        <Grid item sm={6} lg={3}>
                          <TextInputField
                            title="Current address"
                            name="currentCountry"
                            placeholder="Enter country..."
                          />
                        </Grid>
                        <Grid item sm={6} lg={3}>
                          <TextInputField title="City" name="currentCity" placeholder="Enter city..." />
                        </Grid>
                        <Grid item lg={6}>
                          <TextInputField title="Address" name="currentAddress" placeholder="Enter address..." />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Grid container className="full-width">
                        <Grid item sm={6} lg={3}>
                          <TextInputField
                            title="Permanent address"
                            name="permanentCountry"
                            placeholder="Enter country..."
                          />
                        </Grid>
                        <Grid item sm={6} lg={3}>
                          <TextInputField title="City" name="permanentCity" placeholder="Enter city..." />
                        </Grid>
                        <Grid item lg={6}>
                          <TextInputField title="Address" name="permanentAddress" placeholder="Enter address..." />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <br />
              <Grid container className="full-width">
                <Grid item>
                  <p className="color-accent">Social information</p>
                  <br />
                </Grid>
                <Grid item>
                  <Grid container className="full-width">
                    <Grid item lg={6}>
                      <TextInputField
                        append={
                          <LinkedInIcon
                            style={{
                              width: '18px',
                              height: '20px',
                            }}
                          />
                        }
                        title="LinkedIN"
                        name="linedIn"
                        placeholder="Add LinkedIn profile..."
                      />
                    </Grid>
                    <Grid item lg={6}>
                      <TextInputField
                        append={
                          <FacebookIcon
                            style={{
                              width: '18px',
                              height: '20px',
                            }}
                          />
                        }
                        title="Facebook"
                        name="facebook"
                        placeholder="Add Facebook profile..."
                      />
                    </Grid>
                    <Grid item lg={6}>
                      <TextInputField
                        append={
                          <InstagramIcon
                            style={{
                              width: '20px',
                              height: '19px',
                            }}
                          />
                        }
                        title="Instagram"
                        name="instagram"
                        placeholder="Add Instagram profile..."
                      />
                    </Grid>
                    <Grid item lg={6}>
                      <TextInputField
                        append={
                          <TwitterIcon
                            style={{
                              width: '20px',
                              height: '20px',
                            }}
                          />
                        }
                        title="Twitter"
                        name="twitter"
                        placeholder="Add Twitter profile..."
                      />
                    </Grid>
                    <Grid item lg={6}>
                      <TextInputField
                        append={
                          <WhatsAppIcon
                            style={{
                              width: '20px',
                              height: '20px',
                            }}
                          />
                        }
                        title="WhatsApp"
                        name="whatsApp"
                        placeholder="Add WhatsApp profile..."
                      />
                    </Grid>
                    <Grid item lg={6}>
                      <TextInputField
                        append={
                          <VKontakteIcon
                            style={{
                              width: '20px',
                              height: '20px',
                            }}
                          />
                        }
                        title="VKontakte"
                        name="vKontakte"
                        placeholder="Add VKontakte profile..."
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <br />
              <Grid container className="full-width">
                <Grid item>
                  <p className="color-accent">Work experience</p>
                  <br />
                </Grid>
                <Grid item>
                  <Grid container className="full-width">
                    <Grid item lg={5}>
                      <TextInputField
                        title="Job title"
                        name="jobTitle"
                        placeholder="Enter job title..."
                        required
                        fieldProps={{
                          validate: composeValidators(required(), notEmpty()),
                        }}
                      />
                    </Grid>
                    <Grid item sm={6} md={8} lg={4}>
                      <SelectField
                        title="Seniority level"
                        name="seniorityLevel"
                        required
                        options={[
                          { label: 'Intern', value: 'intern' },
                          { label: 'Junior', value: 'junior' },
                          { label: 'Middle', value: 'middle' },
                          { label: 'Senior', value: 'senior' },
                        ]}
                      />
                    </Grid>
                    <Grid item sm={6} md={4} lg={3}>
                      <TextInputField title="Years of experience" name="years" placeholder="Enter years..." />
                    </Grid>
                  </Grid>
                  <Grid container className="full-width">
                    <Grid item md={12}>
                      <SelectField
                        title="Skills"
                        name="skillIds"
                        options={tags.map(({ id, title }) => ({ label: title, value: id }))}
                        isMulti
                        isSearchable
                      />
                    </Grid>
                  </Grid>
                  <Grid container className="full-width">
                    <Grid item md={12}>
                      <SelectField
                        title="Fields of experience"
                        name="fields"
                        options={[
                          { label: 'Design', value: 'design' },
                          { label: 'Marketing', value: 'marketing' },
                          { label: 'Gambling', value: 'gambling' },
                        ]}
                        isMulti
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <br />
              <Grid container className="full-width">
                <Grid item>
                  <p className="color-accent">Work preferences</p>
                  <br />
                </Grid>
                <Grid item>
                  <Grid container className="full-width">
                    <Grid item md={5}>
                      <SelectField
                        title="Desired positions"
                        name="positionIds"
                        options={jobPositions.map(({ id, title }) => ({ label: title, value: id }))}
                        isMulti
                      />
                    </Grid>
                    <Grid item md={3}>
                      <TextInputField
                        title="Desired salary"
                        name="desiredSalary"
                        placeholder="Enter a salary range..."
                      />
                    </Grid>
                  </Grid>
                  <Grid container className="full-width">
                    <Grid item md={5}>
                      <TextInputField title="Location" name="desiredLocation" placeholder="Enter location..." />
                    </Grid>
                    <Grid item md={4}>
                      <CheckboxesField title="Relocation" name="relocate" label="Willing to relocate" />
                    </Grid>
                  </Grid>
                  <Grid container className="full-width">
                    <Grid item>
                      <RadioInputField
                        title="Work model"
                        name="workModel"
                        options={[
                          { label: 'Office - first (Remote - allowed)', value: 'hybrid-office' },
                          { label: 'Remote - first (Office - occasional)', value: 'hybrid-remote' },
                          { label: 'Office only', value: 'office' },
                          { label: 'Remote only', value: 'remote' },
                        ]}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid container className="full-width">
                <Grid item>
                  <Button text="Create" type="submit" />
                </Grid>
              </Grid>
            </form>
          )}
        />
      </div>
    </>
  );
};

export default CreateCandidate;
