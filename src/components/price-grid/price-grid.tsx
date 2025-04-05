import React from "react";

type TableProps = {
  data: string[][];
};

const Table = ({ data }: TableProps) => {
  return (
    <div className="overflow-x-auto h-[247px] w-full no-scrollbar border  border-gray-300 rounded-xl ">
      <table className="min-w-full h-full font-[var(--font-sans)] shadow-sm rounded-xl  border-none text-center">
        <thead>
          <tr className="text-gray-700 text-xs font-bold">
            {data[0].map((header, index) => (
              <th key={index} className="border border-gray-300 px-4 py-3">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.slice(1).map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-gray-50 text-xs text-gray-600">
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className={`${cellIndex === 0 ? "font-bold text-gray-700" : ""} border border-gray-300 hover:bg-[#2926d9d2] hover:text-white px-4 py-2.5`}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const tableData = [
  ["", "2/12", "2/13", "2/14", "2/15", "2/16"],
  ["3/7", "$837", "$592", "$592", "$1,308", "$837"],
  ["3/8", "$837", "$592", "$592", "$837", "$1,308"],
  ["3/9", "$624", "$592", "$624", "$592", "$592"],
  ["3/10", "$1,308", "$624", "$624", "$837", "$837"],
  ["3/11", "$592", "$624", "$1,308", "$837", "$624"],
];

const PriceGrid =() => {
  return (
    <div className="w-full">
      <Table data={tableData} />
    </div>
  );
}

export default PriceGrid;