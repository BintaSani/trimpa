'use client'
import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";
// import { ResponsiveContainer, Area, AreaChart } from "recharts";

const data = [
  { name: "Jan", value: 800 },
        { name: "Feb", value: 850 },
        { name: "Mar", value: 780 },
        { name: "Apr", value: 1000 },
        { name: "May", value: 780 },
        { name: "Jun", value: 850 },
        { name: "Jul", value: 700 },
        { name: "Aug", value: 760 },
        { name: "Sep", value: 600 },
        { name: "Oct", value: 730 },
 
];

/*************  ✨ Codeium Command ⭐  *************/
/**
 * A reusable React component that renders a line chart to display historical prices.
 *
 * @returns A React element representing the chart component.
 */
/******  a427f64d-8b0d-457b-b101-ef080fe2943f  *******/const ChartComponent = () => {
  return (
    <div className="w-full px-1.5 py-2 bg-white rounded-2xl border no-scrollbar shadow-md">
      <ResponsiveContainer width="100%" height={192} className="">
        <AreaChart data={data} margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} stroke="#E9E8FC" />
          <XAxis dataKey="name" hide />
          <YAxis domain={[250, 1000]}  tickLine={false} axisLine={false}
          ticks={[250, 500, 750, 1000]}
          tickFormatter={(value) => `$${value}`}/>
          <Tooltip />
          <Area type="monotone" dataKey="value" stroke="#6366F1" fillOpacity={1} fill="url(#colorUv)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

const PriceHistory = () => {
  return (
    <div className="mt-10">
      <h4 className='mb-5 text-sm 2xl:text-xl text-gray-500 font-medium'>Price history</h4>
      <ChartComponent />
    </div>
  );
}
export default PriceHistory;