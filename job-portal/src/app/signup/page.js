import SignupForm from "@/components/auth/components/SignupForm";

export default function SignupPage() {
  return (
    <div className="max-w-md mx-auto py-20">
      <h1 className="text-3xl font-bold mb-6">
        Signup
      </h1>

      <SignupForm />
    </div>
  );
}