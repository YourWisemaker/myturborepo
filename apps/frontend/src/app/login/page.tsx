import LoginForm from '../../components/organisms/LoginForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login | Firebase App',
  description: 'Login to your account',
};

export default function LoginPage() {
  return <LoginForm />;
}
