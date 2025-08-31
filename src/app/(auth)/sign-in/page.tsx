import { SignIn } from "@clerk/nextjs";

export const metadata = {
  title: "Sign In - Chrono",
  description: "Sign in to your Chrono account",
};

export default function SignInPage() {
  return <SignIn />
}