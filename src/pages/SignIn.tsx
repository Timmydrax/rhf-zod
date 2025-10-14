import { useForm, type SubmitHandler } from "react-hook-form";

type FormFields = {
  email: string;
  password: string;
};

export default function SignIn() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {
      email: "bermu@plab.com",
    },
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      await new Promise((resolve: TimerHandler) => setTimeout(resolve, 1000));
      console.log(data);

      throw new Error();
    } catch (error) {
      setError("root", {
        message: "Email already taken",
      });
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-center text-blue-600 mb-6">
          Sign In
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email Address
            </label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please enter a valid email address",
                },
              })}
              id="email"
              type="email"
              placeholder="Enter your email"
              autoComplete="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                         text-gray-700 placeholder-gray-400"
            />
          </div>
          {errors.email && (
            <div className="text-red-500">{errors.email.message}</div>
          )}

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must have at least 8 characters",
                },
              })}
              id="password"
              type="password"
              placeholder="Enter your password"
              autoComplete="current-password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                         text-gray-700 placeholder-gray-400"
            />
          </div>
          {errors.password && (
            <div className="text-red-500">{errors.password.message}</div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2.5 bg-blue-600 text-white font-medium rounded-lg 
            hover:bg-blue-700 transition-all duration-200 shadow-md"
          >
            {isSubmitting ? "Submitting" : "Sign In"}
          </button>
          {errors.root && (
            <div className="text-red-500">{errors.root.message}</div>
          )}

          {/* Optional Links */}
          <p className="text-center text-sm text-gray-600 mt-3">
            Don’t have an account?{" "}
            <a href="/signup" className="text-blue-600 hover:underline">
              Sign up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
