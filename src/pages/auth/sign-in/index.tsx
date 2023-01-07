import SignInForm from 'components/auth/SignInForm';
import AuthLayout from 'layouts/AuthLayout';

const SignIn = () => (
  <AuthLayout hideHeaderSearchIcon hideHeaderProfileIcon>
    <SignInForm />
  </AuthLayout>
);

SignIn.propTypes = {};

export default SignIn;
