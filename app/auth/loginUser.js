"use client";
import { signIn } from "next-auth/react";

export const loginUser = async ({ email, password }) => {
  const res = await signIn("credentials", {
    redirect: false,
    email,
    password,
  });

  if (!res.ok) {
    throw new Error("Login failed");
  }

  return res;
};
