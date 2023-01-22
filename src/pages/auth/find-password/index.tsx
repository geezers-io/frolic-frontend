import { NextPage } from 'next';
import React, { useMemo, useState } from 'react';

import { StepProps, Steps } from 'antd';

import { FindPasswordFirstStepRequest } from 'api/@types/auth';
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
  const [firstStepValues, setFirstStepValues] = useState<FindPasswordFirstStepRequest>();

  const next = useMemo(
    () => ({
      firstStep(values: FindPasswordFirstStepRequest) {
        setFirstStepValues(values);
        setStep(FindPasswordStep.Second);
      },
      secondStep() {
        setStep(FindPasswordStep.Done);
      },
    }),
    []
  );

  return (
    <AuthLayout
      title="비밀번호 찾기"
      goBackLink={step === FindPasswordStep.First ? '/auth/sign-in' : undefined}
      hideHeaderSearchIcon
    >
      <Steps
        direction="horizontal"
        responsive={false}
        size="small"
        current={step}
        items={stepItems}
        className="px-16 mb-6"
      />
      {step === FindPasswordStep.First && <FindPasswordFirstStep next={next.firstStep} />}

      {step === FindPasswordStep.Second && firstStepValues && (
        <FindPasswordSecondStep next={next.secondStep} firstStepValues={firstStepValues} />
      )}

      {step === FindPasswordStep.Done && firstStepValues?.email && <FindPasswordDone email={firstStepValues.email} />}
    </AuthLayout>
  );
};

export default FindPasswordPage;
