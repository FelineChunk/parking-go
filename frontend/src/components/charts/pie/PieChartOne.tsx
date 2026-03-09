import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface PieChartParkirProps {
  totalLahanParkir: number;
  lahanParkirTerisi: number;
}

const COLORS = ["#ef4444", "#22c55e"];

const renderCustomLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: any) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      className="text-xs font-semibold"
      style={{ fontSize: "13px", fontWeight: 700 }}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function PieChartOne({
  totalLahanParkir,
  lahanParkirTerisi,
}: PieChartParkirProps) {
  const lahanParkirKosong = totalLahanParkir - lahanParkirTerisi;
  const persentaseTerisi = ((lahanParkirTerisi / totalLahanParkir) * 100).toFixed(1);

  const data = [
    { name: "Terisi", value: lahanParkirTerisi },
    { name: "Kosong", value: lahanParkirKosong },
  ];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-white/[0.05] dark:bg-white/[0.03]">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Status Lahan Parkir
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Total kapasitas: {totalLahanParkir} slot
        </p>
      </div>

      {/* Chart */}
      <div className="flex flex-col items-center">
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={100}
              innerRadius={55}
              dataKey="value"
              labelLine={false}
              label={renderCustomLabel}
              strokeWidth={2}
              stroke="#fff"
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number | string | Array<number | string> | undefined) => [
                `${value ?? 0} slot`,
              ]}
              contentStyle={{
                borderRadius: "10px",
                border: "1px solid #e5e7eb",
                fontSize: "13px",
              }}
            />
            <Legend
              iconType="circle"
              iconSize={10}
              formatter={(value) => (
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {value}
                </span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>

        {/* Center Label (donut hole info) */}
        <div className="mt-2 text-center">
          <p className="text-3xl font-bold text-gray-800 dark:text-white">
            {persentaseTerisi}%
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Kapasitas terisi
          </p>
        </div>
      </div>

      {/* Stats Row */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="rounded-xl bg-red-50 p-4 dark:bg-red-500/10">
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-red-500" />
            <span className="text-xs font-medium text-red-600 dark:text-red-400">
              Terisi
            </span>
          </div>
          <p className="text-2xl font-bold text-red-600 dark:text-red-400">
            {lahanParkirTerisi}
          </p>
          <p className="text-xs text-red-400 dark:text-red-500">slot penuh</p>
        </div>

        <div className="rounded-xl bg-green-50 p-4 dark:bg-green-500/10">
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-green-500" />
            <span className="text-xs font-medium text-green-600 dark:text-green-400">
              Kosong
            </span>
          </div>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">
            {lahanParkirKosong}
          </p>
          <p className="text-xs text-green-400 dark:text-green-500">slot tersedia</p>
        </div>
      </div>
    </div>
  );
}