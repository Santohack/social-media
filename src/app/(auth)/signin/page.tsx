import Image from "next/image";
import SignInForm from "./SignInForm";
import signinImage from "../../../assets/login-image.jpg";
import { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = {
    title: "Sign In",
  };
  export default function page() {
    return (
      <main className="flex h-screen flex-col items-center justify-center p-5">
        <div className="flex h-full max-h-[40rem] w-full max-w-[64rem] overflow-hidden rounded-2xl bg-card shadow-2xl">
          <div className="space-y-10 overflow-y-auto p-10 md:w-1/2">
            <div className="space-y-1 text-center">
              <h1 className="text-2xl font-semibold">Sign In</h1>
              <p className="text-sm text-muted-foreground">
                {" "}
                A place to <i>share</i> your thoughts
              </p>
            </div>
           
            <div className="space-y-5">
              <SignInForm />
            </div>
            <Link href="/signup" className="block text-center hover:underline">
              Don&apos;t have an account? SignUp
            </Link>
          </div>
          <Image
            src={signinImage}
            alt="Signin image"
            className="hidden w-1/2 object-cover md:block"
          />
        </div>
      </main>
    );
  }