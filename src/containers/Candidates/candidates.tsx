import React, { FunctionComponent } from 'react';
import { Helmet } from 'react-helmet-async';

import CandidatesTable from './components/CandidatesTable';

const Candidates: FunctionComponent = () => {
  return (
    <>
      <Helmet>
        <title>Candidates | Expooze</title>
      </Helmet>
      <CandidatesTable />;
    </>
  );
};

export default Candidates;
