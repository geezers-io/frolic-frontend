import { useCallback, useState } from 'react';

import { FormItemProps, FormProps } from 'antd';

type HasFeedback = Required<FormItemProps>['hasFeedback'];
type ValidateTrigger = Required<FormProps>['validateTrigger'];
type OnFinishFailed = Required<FormProps>['onFinishFailed'];

export function useFormValidateTrigger() {
  const [hasFeedback, setHasFeedback] = useState<HasFeedback>(false);
  const [formValidateTrigger, setFormValidateTrigger] = useState<ValidateTrigger>('onFinish');

  const onFormFinishFailed = useCallback<OnFinishFailed>(() => {
    setFormValidateTrigger(['onFinish', 'onChange']);
    setHasFeedback(true);
  }, []);

  return {
    hasFeedback,
    formValidateTrigger,
    onFormFinishFailed,
  };
}
