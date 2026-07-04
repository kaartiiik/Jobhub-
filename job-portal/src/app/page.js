"use client";
import useAuthStore from "@/store/authStore";
export default function HomePage() {

 const user = useAuthStore( (state) => state.user);

   return  (
    <main className="max-w-7xl mx-auto px-6 py-20">
      <section className="text-center">
        <h1 className="text-6xl font-bold mb-6">
          Find Your Dream Job
        </h1>

        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
          Explore thousands of opportunities,
          connect with recruiters, and take
          the next step in your career with
          JobHub.
        </p>
       <div className="flex justify-center gap-4">
  {!user ? (
    <a
      href="/signup"
      className="bg-blue-600 text-black px-6 py-3 rounded-lg"
    >
      Get Started
    </a>
  ) : user.role === "recruiter" ? (
    <a
      href="/recruiter"
      className="bg-blue-600 text-black px-6 py-3 rounded-lg"
    >
      View Posted Jobs
    </a>
  ) : (
    <a
      href="/jobs"
      className="bg-blue-600 text-black px-6 py-3 rounded-lg"
    >
      Browse Jobs
    </a>
  )}
</div>
      </section>

      <section className="grid md:grid-cols-3 gap-6 mt-24">
        <div className="border rounded-xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold mb-3">
            Search 
          </h2>

          <p className="text-gray-600">
            Find opportunities based 
            location, skills, and job type.
          </p>
        </div>

        <div className="border rounded-xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold mb-3">
            Save 
          </h2>

          <p className="text-gray-600">
            Bookmark your favorite jobs 
            apply whenever you're ready.
          </p>
        </div>

        <div className="border rounded-xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold mb-3">
            Connect with 
          </h2>

          <p className="text-gray-600">
            Apply directly and get 
            by recruiters hiring now.
          </p>
        </div>
      </section>
    </main>
  );
}