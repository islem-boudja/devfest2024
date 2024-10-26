import Image from 'next/image'
import React from 'react'

type Props = {}

function About() {
  return (
    <div className="w-full py-12 md:py-24">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-8 px-4 md:flex-row">
        <div className="w-full md:w-1/2">
          <h2 className="mb-4 bg-gradient-to-l from-blue-800 to-blue-800 bg-clip-text text-3xl font-extrabold text-transparent md:text-4xl">
            Meet Your AI Financial Partner
          </h2>
          <p className="text-base md:text-lg">
            Our AI platform doesn't just crunch numbers! It predicts expenses, tracks spending, creates personalized financial plans, discovers new growth opportunities with risk-based strategy recommendations, and generates comprehensive reports. Not only that, it also calculates our clients' satisfaction based on their emotional state in feedbacks.
          </p>
        </div>
        <div className="w-full md:w-1/2">
          <Image src="/PC.svg" className="h-auto w-full" width={800} height={800} alt="About illustration" />
        </div>
      </div>
    </div>
  )
}

export default About