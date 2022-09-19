import React, { FunctionComponent, useEffect, useState } from 'react';

import CandidateBox from './CandidateBox';
import Grid from '../../components/Grid';
import CandidateProfile from '../Candidates/components/CandidateProfile';
import { useDispatch, useSelector } from 'react-redux';
import { loadInterviewListAction, selectInterviewsTableData } from '../Interviews';
import { loadAllCandidatesAction, loadCandidateAction, selectAllCandidatesData } from '../Candidates';
import DashboardBox from './DashboardBox';
import { loadAllJobPositionsAction, selectAllJobPositionsData } from '../JobPositions';
import { loadAllEmployeesAction, selectAllEmployeesData } from '../Employees';

import { ReactComponent as InterviewsIcon } from '../../assets/images/svg/interview.svg';
import { ReactComponent as JobPositionsIcon } from '../../assets/images/svg/job-position.svg';
import { ReactComponent as CategoriesIcon } from '../../assets/images/svg/project-management.svg';

const Dashboard: FunctionComponent = () => {
  const dispatch = useDispatch();
  const interviews = useSelector(selectInterviewsTableData);
  const [recentCandidates, setRecentCandidates] = useState([] as any[]);
  const [isCandidateSelected, setIsCandidateSelected] = useState(false);
  const allCandidates = useSelector(selectAllCandidatesData);
  const allPositions = useSelector(selectAllJobPositionsData);
  const allEmployees = useSelector(selectAllEmployeesData);

  useEffect(() => {
    dispatch(
      loadInterviewListAction({
        limit: 4,
        order: 'ASC',
        page: 1,
        sortBy: 'interviewDate',
      }),
    );

    dispatch(loadAllCandidatesAction());
    dispatch(loadAllJobPositionsAction());
    dispatch(loadAllEmployeesAction());
  }, [dispatch]);

  useEffect(() => {
    if (interviews.length === 0) {
      return;
    }

    const recent = [] as any[];

    interviews.forEach(({ interviewDate, candidates, position }) => {
      candidates?.forEach((candidate) => {
        if (recent.length < 4 && !recent.find((a) => a.id === candidate.id)) {
          recent.push({
            ...candidate,
            interviewDate,
            position,
          });
        }
      });
    });

    if (recent.length > 0 && !isCandidateSelected) {
      setIsCandidateSelected(true);
      loadCandidate(recent[0].id);
    }

    setRecentCandidates(recent);
  }, [interviews]);

  const loadCandidate = (id: string) => {
    dispatch(loadCandidateAction(id));
  };

  return (
    <Grid container compact>
      <Grid item sm={12}>
        <Grid container>
          <Grid item sm={6} lg={4}>
            <DashboardBox label="Open positions" value={allPositions.length || 0} icon={<JobPositionsIcon />} />
          </Grid>
          <Grid item sm={6} lg={4}>
            <DashboardBox label="Total candidates" value={allCandidates.length || 0} icon={<InterviewsIcon />} />
          </Grid>
          <Grid item sm={6} lg={4}>
            <DashboardBox label="Total employees" value={allEmployees.length || 0} icon={<CategoriesIcon />} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item md={5} lg={3} compact>
        <h3>Interviews list</h3>
        <br />
        {recentCandidates.map((data) => (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
          <span key={data.id} onClick={() => loadCandidate(data.id)}>
            <CandidateBox {...data} />
          </span>
        ))}
      </Grid>
      <Grid item md={7} lg={9}>
        <CandidateProfile />
      </Grid>
    </Grid>
  );
};

export default Dashboard;
