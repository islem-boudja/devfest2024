"use client"
import { signIn } from "next-auth/react";

interface SignInButtonProps {
  callbackurl: string;
}

const SignInButton: React.FC<SignInButtonProps> = ({ callbackurl }) => {
  const handleGoogleSignIn = async () => {
    try {
      // Initiate sign-in with Google
      await signIn("google", {
        callbackUrl: callbackurl,
      });
    } catch (error) {
      console.error("Google sign-in failed:", error);
    }
  };

  return (
    <button
      onClick={handleGoogleSignIn}
      className="w-full rounded bg-blue-600 p-2 text-white hover:bg-blue-700"
    >
      Sign In with Google
    </button>
  );
};

export default SignInButton;
