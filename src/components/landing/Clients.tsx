import Image from 'next/image'
import React from 'react'

type Props = {}

function Clients() {
  return (
    <div className="w-full px-4 py-12 md:py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-8 text-center text-3xl font-extrabold text-main md:text-4xl">Our Clients' Thoughts</h2>
        <div className="grid gap-8 md:grid-cols-2">
          {[1, 2, 3, 4].map((index) => (
            <div key={index} className="rounded-md bg-gradient-to-r from-main to-second p-[2px] shadow-md">
              <div className="flex h-full flex-col gap-2 rounded-md bg-white p-6">
                <Image src="/Stars.svg" alt="Rating" width={100} height={20} className="h-5 w-auto" />
                <p className="text-xl font-semibold text-main">Sundar Pichai (CEO of Google)</p>
                <p className="text-sm md:text-base">
                  I was skeptical at first, but this AI has completely changed the way I manage my finances. 
                  It's like having a personal financial advisor who's always available and knows my business better than I do. 
                  I've seen a significant increase in my bottom line thanks to its insights.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Clients;
