// app/actions.ts
'use server';

import { signIn, signOut } from "@/auth";

export async function doSocialLogin(formdata: FormData) {
  const action = formdata.get('action');
  // await signIn(action, { redirectTo: '/' });
  console.log(action);
}

export async function doLogOut() {
  await signOut({ redirectTo: '/' });
}
export async function doLogoutAfterUpdate() {
  await signOut({ redirectTo: '/login' });
}

export async function doCredentialsLogin(formdata: FormData): Promise<{ ok: boolean; [key: string]: any } | null> {
  try {
    const response = await signIn("credentials", {
      email: formdata.get('email'),
      password: formdata.get('password'),
      redirect: false,
    });

    return response ? { ok: true, ...response } : { ok: false };
  } catch (error) {
    console.error('Sign-in error:', error);
    return null;
  }
}
