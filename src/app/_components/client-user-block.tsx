// src/app/_components/client-user-block.tsx (client component)
// I used this file in the first version of the app to handle user authentication with Clerk.
// 'use client';

// import { SignInButton, SignOutButton, useUser } from '@clerk/nextjs';

// export function ClientUserBlock() {
//   const { isSignedIn } = useUser();

//   return (
//     <>
//       {!isSignedIn && <SignInButton />}
//       {isSignedIn && <SignOutButton />}
//     </>
//   );
// }