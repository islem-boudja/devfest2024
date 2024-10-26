"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {};
function Home() {
    const router = useRouter()
    const handleLogin = () => {
      router.push('/login')
    }
  
    return (
      <div className="relative flex min-h-screen w-full flex-col items-center justify-center px-4 py-16 md:py-24 lg:py-32">
        <div className="absolute right-0 top-10 z-0 hidden md:block">
          <Image src="/HomeBR.svg" alt="Decorative" width={100} height={100} />
        </div>
        <div className="z-10 flex flex-col items-center justify-center gap-4 text-center">
          <h1 className="bg-gradient-to-l from-second to-blue-800 bg-clip-text text-3xl font-extrabold text-transparent md:text-5xl lg:text-6xl">
            Let AI handle the complexity so you can focus on what matters
          </h1>
          <div className="my-4">
            <Image src="/btns.svg" alt="Features" width={300} height={300} className="h-auto w-full max-w-md" />
          </div>
          <p className="max-w-2xl text-base font-semibold text-[#45597C] md:text-lg lg:text-xl">
            Your financial advisor, but smarter. From predictions to full goal-based plans, our software will make you the market leader. No more guessing, just informed decisions.
          </p>
          <div className="mt-6 flex flex-col gap-4 sm:flex-row">
            <button
              onClick={handleLogin}
              className="rounded-lg bg-second px-4 py-2 text-base font-semibold text-white hover:bg-main md:text-lg"
            >
              Login
            </button>
            <button
              onClick={() => router.push('/create-company')}
              className="rounded-lg bg-second px-4 py-2 text-base font-semibold text-white hover:bg-main md:text-lg"
            >
              Create a Company account
            </button>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 z-0 hidden md:block">
          <Image src="/HomeTL.svg" alt="Decorative" width={100} height={100} />
        </div>
      </div>
    )
  }
export default Home;
