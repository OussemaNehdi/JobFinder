// src/app/_components/client-user-block.tsx (client component)
'use client';

import { SignInButton, SignOutButton, useUser } from '@clerk/nextjs';

export function ClientUserBlock() {
  const { isSignedIn } = useUser();

  return (
    <>
      {!isSignedIn && <SignInButton />}
      {isSignedIn && <SignOutButton />}
    </>
  );
}