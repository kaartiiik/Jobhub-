import LoginForm from "@/components/auth/components/LoginForm";

export default function LoginPage() {
  return (
    <div className="max-w-md mx-auto py-20">
      <h1 className="text-3xl font-bold mb-0">
        Login
      </h1>
      <p className = "py-1 mb-4">Please login to continue</p>

      <LoginForm />
    </div>
  );
}