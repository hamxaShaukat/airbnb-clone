// app/actions.ts
"use server";

import { signIn, signOut } from "@/auth";

export async function doSocialLogin(formdata: FormData) {
  const action = formdata.get("action");

  // Ensure action is a string
  if (typeof action === "string") {
    await signIn(action, { redirectTo: "/" });
    console.log(action);
  } else {
    console.error("Invalid action type:", action);
  }
}
export async function doResendLogin(formdata: FormData) {
  await signIn("resend", formdata);
}

export async function doLogOut() {
  await signOut({ redirectTo: "/" });
}
export async function doLogoutAfterUpdate() {
  await signOut({ redirectTo: "/login" });
}

export async function doCredentialsLogin(
  formdata: FormData
): Promise<{ ok: boolean; [key: string]: any } | null> {
  try {
    const response = await signIn("credentials", {
      email: formdata.get("email"),
      password: formdata.get("password"),
      redirect: false,
    });

    return response ? { ok: true, ...response } : { ok: false };
  } catch (error) {
    console.error("Sign-in error:", error);
    return null;
  }
}
