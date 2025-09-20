import { SignIn } from "@clerk/nextjs";

export const metadata = {
  title: "Sign In - Wishio",
  description: "Sign in to your Wishio account",
};

export default function SignInPage() {
  return <SignIn />
}