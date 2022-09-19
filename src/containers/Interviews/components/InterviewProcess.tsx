import React, { FunctionComponent } from 'react';

import InterviewSubject from './InterviewSubject';

type InterviewProcessProps = {
  onSubmit: () => void;
};

const InterviewProcess: FunctionComponent<InterviewProcessProps> = ({ onSubmit }) => {
  return (
    <div>
      <h1>Interviews</h1>
      <InterviewSubject subject="JavaScript" />
      <InterviewSubject subject="JavaScript" />
      <InterviewSubject subject="JavaScript" />
      <InterviewSubject subject="JavaScript" />
      <InterviewSubject subject="JavaScript" />
      <InterviewSubject subject="JavaScript" />
      <InterviewSubject subject="JavaScript" />
      <InterviewSubject subject="JavaScript" />
      <InterviewSubject subject="JavaScript" />
      <InterviewSubject subject="JavaScript" />
      <InterviewSubject subject="JavaScript" />
      <InterviewSubject subject="JavaScript" />
      <InterviewSubject subject="JavaScript" />
      <InterviewSubject subject="JavaScript" />
      <InterviewSubject subject="JavaScript" />
      <InterviewSubject subject="JavaScript" />
      <InterviewSubject subject="JavaScript" />
      <InterviewSubject subject="JavaScript" />
      <InterviewSubject subject="JavaScript" />
      <InterviewSubject subject="JavaScript" />
      <InterviewSubject subject="JavaScript" />
      <InterviewSubject subject="JavaScript" />
    </div>
  );
};

export default InterviewProcess;
