import { FaFileExport } from "react-icons/fa6"

const ReportGeneraation= () => {
  return ( 
    <div className="flex m-2 p-3 bg-white rounded-lg items-center px-4 justify-between text-[#071139] text-lg font-semibold">
    <p className=" whitespace-nowrap">
      Click on Export to download a full report of the financial health of
      your company
    </p>
    <div className="bg-[#1FC274] rounded-md p-2 cursor-pointer flex gap-x-2 items-center text-lg">
      <FaFileExport size={20} />
      <p>Export</p>
    </div>
  </div>
  )
}

export default ReportGeneraation
