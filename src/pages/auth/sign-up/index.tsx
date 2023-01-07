import SignUpForm from 'components/auth/SignUpForm';
import AuthLayout from 'layouts/AuthLayout';

const SignUp = () => (
  <AuthLayout hideHeaderSearchIcon>
    <SignUpForm />
  </AuthLayout>
);

SignUp.propTypes = {};

export default SignUp;
