// components/StatCard.jsx
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  Tooltip,
} from "recharts";


const CustomStatTooltip = ({ active, payload, title }) => {
  if (!active || !payload || !payload.length) return null;

  const { value, date } = payload[0].payload;

  return (
    <div className="rounded-lg bg-[#f4f8fd] p-2 shadow-lg border border-gray-100">
      <p className="text-sm  text-gray-600">
        <span className=" font-medium text-gray-700"  >
          {title}: {" "}
        </span>
        {value}
      </p>

      <p className="text-sm text-gray-600 ">
        <span className=" font-medium text-gray-700"  >
          Date: {" "}
        </span>
        {date}
      </p>
    </div>
  );
};




const StatCard = ({
  title,
  value,
  icon: Icon,
  bgColor,
  chartColor,
  data,
}) => {
  return (
    // <div className={`relative rounded-2xl ${bgColor} shadow-sm overflow-hidden`}>
    <div className={`relative rounded-2xl bg-white hover:shadow-xl transition-all duration-200 overflow-hidden`}>

      {/* Top Content (with padding) */}
      {/* <div className="flex flex-col gap-2 p-4 ">
        <div className="flex items-center justify-between ">
          <div className="flex justify-between items-center gap-3">
            <div className="p-3 rounded-xl bg-white shadow-xl ">
              <Icon className="text-xl" />
            </div>
            <h4 className=" font-medium text-gray-700">
              {title}
            </h4>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900">
          {value}
        </h2>
      </div> */}

      <div className="flex flex-col gap-2 p-3 ">
        <div className="flex items-center gap-3 ">
          <div className={`p-3 rounded-xl ${bgColor}  shadow-xl`}  >
            <Icon className="text-xl" />
          </div>
          <div className="flex flex-col ">
            <h4 className=" text-base font-medium text-gray-700">
              {title}
            </h4>

            <h2 className=" text-lg font-bold text-gray-900">
              {value}
            </h2>
          </div>
        </div>

      </div>

      {/* Chart (NO padding) */}
      {/* <div className="flex items-end h-20    w-full">
        <ResponsiveContainer width="100%" height="90%"  >
          <AreaChart
            data={data}
            margin={{ top: 2, right: 0, left: 0, bottom: 0 }}
          >
            <Tooltip
              // cursor={false}
              content={<CustomStatTooltip title={title} />}
            // contentStyle={{
            //   borderRadius: 10,
            //   border: "none",
            //   boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
            // }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke={chartColor}
              fill={chartColor}
              fillOpacity={0.25}
              strokeWidth={2}
              dot={false}

            />
          </AreaChart>
        </ResponsiveContainer> */}
      <div className="h-16 w-full">

        <ResponsiveContainer width="100%" height="100%">

          <AreaChart
            data={data}
            margin={{ top: 3, right: 0, left: 0, bottom: 0 }}
          >

            <Tooltip
              // cursor={false}
              content={<CustomStatTooltip title={title} />}
            // contentStyle={{
            //   borderRadius: 10,
            //   border: "none",
            //   boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
            // }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke={chartColor}
              fill={chartColor}
              fillOpacity={0.15}
              strokeWidth={2}
              dot={false}
            />

          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StatCard;
