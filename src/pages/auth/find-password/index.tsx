import { NextPage } from 'next';
import React, { useMemo, useState } from 'react';

import { StepProps, Steps } from 'antd';

import FindPasswordDone from 'components/auth/FindPasswordDone';
import FindPasswordFirstStep from 'components/auth/FindPasswordFirstStep';
import FindPasswordSecondStep from 'components/auth/FindPasswordSecondStep';
import AuthLayout from 'layouts/AuthLayout';

const enum FindPasswordStep {
  First,
  Second,
  Done,
}

const stepItems: StepProps[] = [{}, {}];

const FindPasswordPage: NextPage = () => {
  const [step, setStep] = useState<FindPasswordStep>(FindPasswordStep.First);
  const [email, setEmail] = useState('');

  const next = useMemo(
    () => ({
      firstStep(email: string) {
        setEmail(email);
        setStep(FindPasswordStep.Second);
      },
      secondStep() {
        setStep(FindPasswordStep.Done);
      },
    }),
    []
  );

  return (
    <AuthLayout title="비밀번호 찾기" hideHeaderSearchIcon>
      <Steps
        direction="horizontal"
        responsive={false}
        size="small"
        current={step}
        items={stepItems}
        className="px-16 mb-6"
      />
      {step === FindPasswordStep.First && <FindPasswordFirstStep next={next.firstStep} />}

      {step === FindPasswordStep.Second && <FindPasswordSecondStep next={next.secondStep} />}

      {step === FindPasswordStep.Done && email && <FindPasswordDone email={email} />}
    </AuthLayout>
  );
};

export default FindPasswordPage;
