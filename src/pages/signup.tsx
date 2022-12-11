import { trpc } from "@/utils/trpc";
import Router from "next/router";
import { useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";

type FormInputs = {
  email: string;
  username: string;
  password: string;
};

export default function SignupPage() {
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );
  const signupMutation = trpc.auth.signup.useMutation();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();

  console.log(errors);

  const { error } = signupMutation;

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    try {
      console.log("Im running");
      signupMutation.mutate(data);
      if (!error) {
        reset({
          username: "",
          email: "",
          password: "",
        });
        Router.push("/login");
      } else {
        setErrorMessage(error?.message);
        throw new Error(error.message);
      }
    } catch (err) {
      setErrorMessage(error?.message);
    }
  };

  return (
    <div className="grid h-screen place-content-center place-items-center ">
      <form
        className="grid w-64 flex-col justify-center border-2 border-solid border-emerald-300 p-52"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="mb-7 text-center text-4xl text-white">Signup</h1>
        <input
          className="input-bordered input my-2 h-11 w-auto max-w-xs"
          type="text"
          placeholder="username"
          {...register("username", { required: "Username is required" })}
        />
        {errors.username && (
          <p className="my-2 rounded-md bg-red-400 p-2 text-center text-white">
            {errors.username.message}
          </p>
        )}
        <input
          className="input-bordered input my-2 h-11 w-auto max-w-xs"
          type="email"
          placeholder="email"
          {...register("email", { required: "Email is required" })}
        />
        {errors.email && (
          <p className="my-2 rounded-md bg-red-400 p-2 text-center text-white">
            {errors.email.message}
          </p>
        )}
        <input
          className="input-bordered input my-2 h-11 w-auto max-w-xs"
          type="password"
          placeholder="password"
          {...register("password", { required: "Password is required" })}
        />
        {errors.password && (
          <p className="my-2 rounded-md bg-red-400 p-2 text-center text-white">
            {errors.password.message}
          </p>
        )}
        <button
          className="btn-outline btn-success btn my-2 rounded-md "
          type="submit"
        >
          Submit
        </button>
        {errorMessage && (
          <p className="my-2 rounded-md bg-red-400 p-2 text-center text-white">
            {errorMessage}
          </p>
        )}
      </form>
    </div>
  );
}
