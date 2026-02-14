// import CustomTooltip from './CustomTooltip';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { useEffect, useState } from "react";
// import UniversalButton from "./UniversalButton";
import { Link } from "react-router-dom";
import UniversalButton from "@/components/common/UniversalButton";

const CustomTooltip = ({ active, payload, coordinate }) => {
  const [visible, setVisible] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [data, setData] = useState(null);

  // useEffect(() => {
  //     if (active && payload && payload.length && coordinate) {
  //         setVisible(true);
  //         setPos({ x: coordinate.x, y: coordinate.y });
  //         setData(payload[0].payload);
  //     } else {
  //         // delay hide for smooth fade-out
  //         const t = setTimeout(() => setVisible(false), 120);
  //         return () => clearTimeout(t);
  //     }
  // }, [active, payload, coordinate]);

  useEffect(() => {
    if (active && payload?.length) {
      setVisible(true);
      setData(payload[0].payload);

      if (coordinate) {
        setPos({ x: coordinate.x, y: coordinate.y });
      }
    } else {
      const t = setTimeout(() => setVisible(false), 120);
      return () => clearTimeout(t);
    }
  }, [active, payload, coordinate]);

  if (!data) return null;

  return (
    <div
      className={` absolute z-50 pointer-events-none whitespace-nowrap px-3 py-1.5 rounded-lg bg-white shadow-xl transition-all duration-400 ease-out 
                ${visible
          ? "opacity-100 scale-100 -translate-x-1/2 -translate-y-[120%]"
          : "opacity-0 scale-95 -translate-x-1/2 -translate-y-[100%]"
        } `}
      style={{
        left: pos.x - 10,
        top: pos.y + 35,
        color: data.color,
      }}
    >
      <span className="font-semibold">{data.category}:</span>{" "}
      <span className="font-medium">{data.value}</span>
    </div>
  );
};

const data = [
  {
    category: "Male",
    value: 69,
    color: "#2563eb", // blue
  },
  {
    category: "Children",
    value: 47,
    color: "#16a34a", // green
  },
  {
    category: "Female",
    value: 86,
    color: "#ec4899", // pink
  },
  {
    category: "Senior Citizen",
    value: 97,
    color: "#f59e0b", // amber
  },
];

const PatientVisitsCard = () => {
  const total = data.reduce((sum, d) => sum + d.value, 0);

  return (
    <>
      <div className="relative flex flex-col gap-2 rounded-2xl bg-white p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold text-lg">Patient Visits</h3>
          <Link to="/leads">
            <UniversalButton
              label="View All"
              variant="primary" // or "secondary" if you want gray                
            />
          </Link>
        </div>

        <div className=" relative  h-35 overflow-hidden">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                startAngle={180}
                endAngle={0}
                cx="50%"
                cy="100%" //  KEY FIX
                innerRadius={90}
                outerRadius={128}
                paddingAngle={1}
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              {/* 
                            <Tooltip 
                                cursor={{ fill: "rgba(30, 111, 217, 0.05)" }} content={<CustomTooltip />} /> */}
              {/* <Tooltip
                                content={(props) => <CustomTooltip {...props} />}
                                cursor={false}
                            /> */}
              <Tooltip content={<CustomTooltip />} cursor={false} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Gender Stats */}
        <div className=" space-y-3">
          {data.map((data) => (
            <div className="flex justify-between">
              <span className={`font-medium `} style={{ color: data.color }}>
                {data.category}
              </span>
              {/* <span className="font-semibold">{data.value}%</span> */}
              <span className="font-semibold">
                {Math.round((data.value / total) * 100)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PatientVisitsCard;
