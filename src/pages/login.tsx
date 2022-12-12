import { authenticateUser } from "@/utils/helpers";
import { trpc } from "@/utils/trpc";
import Router from "next/router";
import { useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";

type FormInputs = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );
  const loginMutation = trpc.auth.login.useMutation();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();

  console.log(errors);

  const { error, data: mutationData, isSuccess } = loginMutation;

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    try {
      console.log("Im running");
      loginMutation.mutate(data);

      if (!error && isSuccess) {
        reset({
          email: "",
          password: "",
        });
        const userData = {
          username: mutationData?.username,
          email: mutationData?.email,
          authToken: mutationData?.authToken,
        };
        authenticateUser(userData);
        Router.push("/tasks");
      } else {
        setErrorMessage(error?.message);
        throw new Error(error?.message);
      }
    } catch (err) {
      setErrorMessage(error?.message);
    }
  };
  return (
    <div className="grid place-content-center place-items-center">
      <div className="w-64 justify-center border-2 border-solid border-emerald-200 p-48">
        <h1 className="mb-7 grid w-auto place-content-center place-items-center text-center text-4xl text-white">
          Login
        </h1>
        <form
          className="grid flex-col justify-center "
          onSubmit={handleSubmit(onSubmit)}
        >
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
    </div>
  );
}
