"use client";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import { useFormik } from "formik";
import { loginSchema } from "~/lib/validation";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { useState } from "react";
import Header from "~/components/ui/Header";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const handleSubmit = () => {
    console.log("Form submitted");
    router.push("/dashboard");
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: handleSubmit,
  });
  return (
    <div className="h-full w-full">
      <Header />
      <div className="flex">
        <div className="flex h-full w-1/2 flex-col items-center justify-center gap-y-8 py-6">
          <p className="text-3xl font-medium text-[#333333]">Log in</p>
          <div className="w-2/3 cursor-pointer rounded-full bg-[linear-gradient(90deg,#142F9F_0%,#1FC274_100%)] p-[2px]">
            <div className="bg-white z-10 flex w-full items-center justify-center rounded-full px-8 py-3 text-[18px] font-semibold text-[#333333]">
              <FcGoogle className="mr-2" size={24} />
              Continue with Google
            </div>
          </div>
          <div className="flex w-full items-center justify-center gap-x-2">
            <div className="h-[2px] w-1/3 rounded-lg bg-[#66666640]"></div>
            <p>OR</p>
            <div className="h-[2px] w-1/3 rounded-lg bg-[#66666640]"></div>
          </div>
          <form
            onSubmit={formik.handleSubmit}
            className="flex w-2/3 flex-col gap-y-4"
          >
            <div>
              <label htmlFor="email" className="text-white text-sm font-medium">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                className="text-black bg-white mt-1 w-full rounded-md border border-solid border-[#66666659] p-2"
                placeholder="example@email.com"
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.email}
                </div>
              ) : null}
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-white text-sm font-medium"
                >
                  Password
                </label>
                <div
                  className="flex cursor-pointer items-center gap-x-1"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <>
                      <FaEyeSlash className="size-5 text-[#666666CC]" />
                      <p>Hide</p>
                    </>
                  ) : (
                    <>
                      {" "}
                      <FaEye className="size-5 text-[#666666CC]" />
                      <p>Show</p>
                    </>
                  )}
                </div>
              </div>
              <div className="relative flex items-center">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  className="text-black mt-1 w-full rounded-md border border-solid border-[#66666659] p-2"
                  placeholder="********"
                />
              </div>
              {formik.touched.password && formik.errors.password ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.password}
                </div>
              ) : null}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input type="checkbox" />
                <p className="text-black ml-2 text-sm">Remember me</p>
              </div>
              <p className="text-black cursor-pointer text-sm underline">
                Forgot Password?
              </p>
            </div>
            <button
              onClick={() => formik.handleSubmit()}
              type="submit"
              className={` ${formik.isValid && formik.values.email && formik.values.password ? "bg-[#142F9F]" : "bg-[#AEAEAF]"} text-white w-full self-center rounded-full px-4 py-3 font-semibold`}
            >
              Sign In
            </button>
            <div className="h-[2px] w-full rounded-lg bg-[#66666640]"></div>
          </form>
        </div>
        <div className="flex h-full w-1/2 flex-col items-center justify-center bg-[#EBEDF1] pt-12 shadow-[-14px_4px_44px_0px_#00000033]">
          <div>
            <Image
              src="/fiscailogo.svg"
              alt="fiscAI"
              width={250}
              height={200}
            />
            <p className="text-2xl font-normal text-main">
              Your Path To Prosperity
            </p>
          </div>
          <div>
            <Image src="/mac.png" alt="mac" width={500} height={500} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
