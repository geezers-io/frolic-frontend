import { Rule } from 'rc-field-form/es/interface';

export const requiredRule: Rule = {
  required: true,
  whitespace: true,
  message: '필수 정보입니다',
};
