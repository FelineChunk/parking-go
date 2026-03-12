import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { useEffect, useState, useMemo } from "react";
import { getTransactions } from "../../service/TransactionsApi";
import { Transactions } from "../../types/Types";

export default function MonthlyTarget() {
  const [data, setData] = useState<Transactions[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = () => {
    setLoading(true);
    getTransactions()
      .then((res) => setData(res.data))
      .catch((err) => console.error("ERROR:", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Hitung statistik
  const dataDone = useMemo(() => data.filter((item) => item.status === "DONE"), [data]);
  const dataOut = useMemo(() => data.filter((item) => item.status === "OUT"), [data]);

  const totalRevenue = useMemo(
    () => dataDone.reduce((acc, item) => acc + (item.fee || 0), 0),
    [dataDone]
  );

  const TARGET_MONTHLY = 500000; // Rp 500.000 target bulanan, sesuaikan
  const progressPercent = useMemo(
    () => Math.min(Math.round((totalRevenue / TARGET_MONTHLY) * 100), 100),
    [totalRevenue]
  );

  const avgDuration = useMemo(() => {
    const valid = dataDone.filter((item) => item.duration && item.duration > 0);
    if (valid.length === 0) return 0;
    return Math.round(valid.reduce((acc, item) => acc + (item.duration || 0), 0) / valid.length);
  }, [dataDone]);

  const formatRupiah = (amount: number) =>
    `Rp ${amount.toLocaleString("id-ID")}`;

  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes} mnt`;
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return m > 0 ? `${h}j ${m}m` : `${h} jam`;
  };

  const options: ApexOptions = {
    colors: ["#465FFF"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "radialBar",
      height: 280,
      sparkline: { enabled: true },
    },
    plotOptions: {
      radialBar: {
        startAngle: -85,
        endAngle: 85,
        hollow: { size: "80%" },
        track: {
          background: "#E4E7EC",
          strokeWidth: "100%",
          margin: 5,
        },
        dataLabels: {
          name: { show: false },
          value: {
            fontSize: "32px",
            fontWeight: "700",
            offsetY: -30,
            color: "#1D2939",
            formatter: (val) => val + "%",
          },
        },
      },
    },
    fill: { type: "solid", colors: ["#465FFF"] },
    stroke: { lineCap: "round" },
    labels: ["Progress"],
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="px-5 pt-5 bg-white shadow-default rounded-2xl pb-8 dark:bg-gray-900 sm:px-6 sm:pt-6">

        {/* Header */}
        <div className="flex justify-between items-start mb-1">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              Target Pendapatan
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Progres pendapatan parkir bulan ini
            </p>
          </div>
          <button
            onClick={fetchData}
            disabled={loading}
            className="text-xs text-gray-400 hover:text-gray-700 transition-colors px-2 py-1 rounded-lg hover:bg-gray-100"
          >
            {loading ? "↻ ..." : "↻ Refresh"}
          </button>
        </div>

        {/* Radial Chart */}
        <div className="relative">
          <div className="max-h-[280px]">
            <Chart
              options={options}
              series={[progressPercent]}
              type="radialBar"
              height={280}
            />
          </div>
          <span className="absolute left-1/2 top-full -translate-x-1/2 -translate-y-[90%] rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600 dark:bg-blue-500/15 dark:text-blue-400">
            {formatRupiah(totalRevenue)} terkumpul
          </span>
        </div>

        {/* Info Text */}
        <p className="mx-auto mt-10 w-full max-w-[380px] text-center text-sm text-gray-500">
          {dataDone.length > 0
            ? `${dataDone.length} kendaraan selesai hari ini. Total pendapatan ${formatRupiah(totalRevenue)}.`
            : "Belum ada transaksi selesai hari ini."}
        </p>
      </div>

      {/* Stats Footer */}
      <div className="flex items-center justify-center gap-5 px-6 py-3.5 sm:gap-8 sm:py-5">

        {/* Total Kendaraan */}
        <div className="text-center">
          <p className="mb-1 text-xs text-gray-500 dark:text-gray-400 sm:text-sm">
            Total Kendaraan
          </p>
          <p className="flex items-center justify-center gap-1 text-base font-semibold text-gray-800 dark:text-white/90 sm:text-lg">
            {data.length}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path fillRule="evenodd" clipRule="evenodd"
                d="M7.60141 2.33683C7.73885 2.18084 7.9401 2.08243 8.16435 2.08243C8.35773 2.08219 8.54998 2.15535 8.69664 2.30191L12.6968 6.29924C12.9898 6.59203 12.9899 7.0669 12.6971 7.3599C12.4044 7.6529 11.9295 7.65306 11.6365 7.36027L8.91435 4.64004L8.91435 13.5C8.91435 13.9142 8.57856 14.25 8.16435 14.25C7.75013 14.25 7.41435 13.9142 7.41435 13.5L7.41435 4.64442L4.69679 7.36025C4.4038 7.65305 3.92893 7.6529 3.63613 7.35992C3.34333 7.06693 3.34348 6.59206 3.63646 6.29926L7.60141 2.33683Z"
                fill="#039855"
              />
            </svg>
          </p>
        </div>

        <div className="w-px bg-gray-200 h-7 dark:bg-gray-800" />

        {/* Kendaraan Aktif (OUT) */}
        <div className="text-center">
          <p className="mb-1 text-xs text-gray-500 dark:text-gray-400 sm:text-sm">
            Masih Parkir
          </p>
          <p className="flex items-center justify-center gap-1 text-base font-semibold text-gray-800 dark:text-white/90 sm:text-lg">
            {dataOut.length}
            <span className="inline-block w-2 h-2 rounded-full bg-yellow-400 ml-1" />
          </p>
        </div>

        <div className="w-px bg-gray-200 h-7 dark:bg-gray-800" />

        {/* Rata-rata Durasi */}
        <div className="text-center">
          <p className="mb-1 text-xs text-gray-500 dark:text-gray-400 sm:text-sm">
            Rata-rata Durasi
          </p>
          <p className="flex items-center justify-center gap-1 text-base font-semibold text-gray-800 dark:text-white/90 sm:text-lg">
            {avgDuration > 0 ? formatDuration(avgDuration) : "-"}
          </p>
        </div>

      </div>
    </div>
  );
}
