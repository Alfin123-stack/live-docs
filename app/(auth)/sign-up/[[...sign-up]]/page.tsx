import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#0a0a0a] via-[#111] to-[#1a1a1a] text-white">
      <div className="absolute inset-0 pointer-events-none" />
      <div className="relative z-10 flex flex-col items-center p-5">
        <h1 className="mb-6 text-3xl font-semibold text-neutral-100">
          Create Account
        </h1>
        <SignUp />
      </div>
    </div>
  );
}
