import { NextPage } from 'next';
import React, { useMemo, useState } from 'react';

import { StepProps, Steps } from 'antd';

import { FindEmailFirstStepRequest } from 'api/@types/auth';
import FindEmailDone from 'components/auth/FindEmailDone';
import FindEmailFirstStep from 'components/auth/FindEmailFirstStep';
import FindEmailSecondStep from 'components/auth/FindEmailSecondStep';
import AuthLayout from 'layouts/AuthLayout';

const enum FindEmailStep {
  First,
  Second,
  Done,
}

const stepItems: StepProps[] = [{}, {}];

const FindEmailPage: NextPage = () => {
  const [step, setStep] = useState<FindEmailStep>(FindEmailStep.First);
  const [email, setEmail] = useState('');
  const [firstStepValues, setFirstStepValues] = useState<FindEmailFirstStepRequest>();

  const next = useMemo(
    () => ({
      firstStep(values: FindEmailFirstStepRequest) {
        setFirstStepValues(values);
        setStep(FindEmailStep.Second);
      },
      secondStep(email: string) {
        setEmail(email);
        setStep(FindEmailStep.Done);
      },
    }),
    []
  );

  return (
    <AuthLayout title="이메일 찾기" hideHeaderSearchIcon>
      <Steps
        direction="horizontal"
        responsive={false}
        size="small"
        current={step}
        items={stepItems}
        className="px-16 mb-6"
      />
      {step === FindEmailStep.First && <FindEmailFirstStep next={next.firstStep} />}

      {step === FindEmailStep.Second && firstStepValues && (
        <FindEmailSecondStep next={next.secondStep} firstStepValues={firstStepValues} />
      )}

      {step === FindEmailStep.Done && email && <FindEmailDone email={email} />}
    </AuthLayout>
  );
};

export default FindEmailPage;
