import { SignIn, SignInButton, SignOutButton } from '@clerk/nextjs';
import { ClientUserBlock } from '../_components/client-user-block';

export default async function Home() {
  return (
    <>
      <SignIn path='/sign-in' routing='path' signUpUrl='/sign-up' />
      <ClientUserBlock />
    </>
  );
}