import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", doctor1: 80, doctor2: 90, doctor3: 85 },
  { month: "Feb", doctor1: 200, doctor2: 250, doctor3: 130 },
  { month: "Mar", doctor1: 90, doctor2: 40, doctor3: 85 },
  { month: "Apr", doctor1: 170, doctor2: 120, doctor3: 220 },
  { month: "May", doctor1: 20, doctor2: 220, doctor3: 80 },
  { month: "Jun", doctor1: 140, doctor2: 110, doctor3: 190 },
  { month: "Jul", doctor1: 210, doctor2: 180, doctor3: 130 },
];

const DoctorPerformanceChart = () => {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm w-full ">
      <h3 className="text-lg font-semibold  text-gray-800">
        Doctor Performance
      </h3>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 0, right: 10, left: 0, bottom: 15 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          
          <XAxis
            dataKey="month"
            tick={{ fill: "#6b7280", fontSize: 12 }}
          />
          
          <YAxis
            tick={{ fill: "#6b7280", fontSize: 12 }}
            label={{
              value: "Patients",
              angle: -90,
              position: "insideLeft",
              fill: "#6b7280",
            }}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "#111827",
              borderRadius: 8,
              border: "none",
              color: "#fff",
            }}
            labelStyle={{ color: "#fff", fontWeight: 600 }}
          />

          <Legend
            verticalAlign="top"
            align="right"
            iconType="circle"
          />

          <Line
            type="monotone"
            dataKey="doctor1"
            name="Doctor 1"
            stroke="#9ca3af"
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 7 }}
          />

          <Line
            type="monotone"
            dataKey="doctor2"
            name="Doctor 2"
            stroke="#7c3aed"
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 7 }}
          />

          <Line
            type="monotone"
            dataKey="doctor3"
            name="Doctor 3"
            stroke="#14b8a6"
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 7 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DoctorPerformanceChart;
