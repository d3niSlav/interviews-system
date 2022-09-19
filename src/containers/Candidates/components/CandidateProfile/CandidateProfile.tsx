import React, { FunctionComponent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import { loadCandidateAction } from '../../candidates.actions';
import { selectCandidate } from '../../candidates.selectors';
import Label from '../../../../components/Label';
import Grid from '../../../../components/Grid';

import styles from './CandidateProfile.module.scss';
import julia from './julia.jpg';
import maleCandidate from './male-candidate.jpg';
import femaleCandidate from './female-candidate.jpg';

const CandidateProfile: FunctionComponent = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const candidate = useSelector(selectCandidate);

  useEffect(() => {
    dispatch(loadCandidateAction(id));
  }, [id]);

  return candidate ? (
    <div className={styles.candidatePreview}>
      <Grid container compact>
        <Grid item md={4}>
          <img
            className={styles.imageWrapper}
            src={
              candidate.email === 'julia.m@gmail.com'
                ? julia
                : candidate.gender === 'male'
                ? maleCandidate
                : femaleCandidate
            }
            alt="Profile of candidate"
          />
        </Grid>
        <Grid item md={7}>
          <p className={styles.progress}>
            <span className={candidate.status === 'pending' ? styles.active : ''}>Pending</span>
            <span>&#10148;</span>
            <span className={candidate.status === 'reviewed' ? styles.active : ''}>Reviewed</span>
            <span>&#10148;</span>
            <span className={candidate.status === 'task' ? styles.active : ''}>Test Task</span>
            <span>&#10148;</span>
            <span className={candidate.status === 'interview' ? styles.active : ''}>Interview</span>
            <span>&#10148;</span>
            <span className={candidate.status === 'hired' ? styles.active : ''}>Hired</span>
          </p>
          <p className={styles.name}>
            {candidate.firstName}
            {candidate.middleName ? ` ${candidate.middleName}` : ''} {candidate.lastName}
          </p>
          <p className={styles.description}>{candidate.introduction || 'N/A'}</p>
          <br />
          <Grid container compact>
            <Grid item xs={6}>
              <Label title="Email" editable={false}>
                <a href={`mailto:${candidate.email}`}>{candidate.email}</a>
              </Label>
            </Grid>
            <Grid item xs={6}>
              <Label title="Seniority level" editable={false}>
                {candidate?.experience[0]?.seniorityLevel || '-'}
              </Label>
            </Grid>
            <Grid item xs={6}>
              <Label title="Phone number" editable={false}>
                <a href={`tel:${candidate.phoneNumber}`}>{candidate.phoneNumber}</a>
              </Label>
            </Grid>
            <Grid item xs={6}>
              <Label title="Location" editable={false}>
                {candidate.currentCity}
                {candidate.currentCity && candidate.currentCountry ? ', ' : ''}
                {candidate.currentCountry || 'N/A'}
              </Label>
            </Grid>
            <Grid item xs={6}>
              <Label title="Years experience" editable={false}>
                {candidate?.experience[0]?.years || '-'}
              </Label>
            </Grid>
            <Grid item xs={6}>
              <Label title="Desired job title" editable={false}>
                {candidate?.experience[0]?.jobTitle || '-'}
              </Label>
            </Grid>
            <Grid item xs={12}>
              <Label title="Skills" editable={false}>
                {candidate?.experience[0]?.skills?.map(({ title }, index) => (
                  <span key={`skill_${index}`} className={styles.skillPill}>
                    {title}
                  </span>
                ))}
              </Label>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  ) : (
    <p>No data found for this candidate</p>
  );
};

export default CandidateProfile;
