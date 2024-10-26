import React from 'react'

type Props = {}

function Infopage() {
  return (
    <div className="w-full bg-gradient-to-l from-main to-blue-700 py-8 text-white md:py-12">
      <div className="mx-auto flex max-w-6xl flex-col justify-between gap-6 px-4 text-center md:flex-row md:text-left">
        <div className="flex flex-col items-center justify-center gap-2 md:items-start md:border-r md:border-white md:pr-4">
          <p className="text-2xl font-bold md:text-3xl">30K</p>
          <p className="text-sm md:text-base">People use friscAI software in their daily life</p>
        </div>
        <div className="flex flex-col items-center justify-center gap-2 md:items-start md:border-r md:border-white md:px-4">
          <p className="text-2xl font-bold md:text-3xl">98%</p>
          <p className="text-sm md:text-base">Successfully manage daily finances with friscAI</p>
        </div>
        <div className="flex flex-col items-center justify-center gap-2 md:items-start md:pl-4">
          <p className="text-2xl font-bold md:text-3xl">89%</p>
          <p className="text-sm md:text-base">Managed to invest in shares and get big profits</p>
        </div>
      </div>
    </div>
  )
}

export default Infopage