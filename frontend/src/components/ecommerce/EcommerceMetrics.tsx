import { useEffect, useMemo, useState } from "react";
import { ArrowDownIcon, ArrowUpIcon, BoxIconLine, GroupIcon } from "../../icons";
import Badge from "../ui/badge/Badge";
import { getTransactions } from "../../service/TransactionsApi";
import { Transactions } from "../../types/Types";

export default function EcommerceMetrics() {
  const [data, setData] = useState<Transactions[]>([]);

  useEffect(() => {
    getTransactions()
      .then((res) => setData(res.data))
      .catch((err) => console.error("ERROR:", err));
  }, []);

  const dataDone = useMemo(() => data.filter((item) => item.status === "DONE"), [data]);
  const dataOut = useMemo(() => data.filter((item) => item.status === "OUT"), [data]);

  const totalRevenue = useMemo(
    () => dataDone.reduce((acc, item) => acc + (item.fee || 0), 0),
    [dataDone]
  );

  const formatRupiah = (amount: number) =>
    amount >= 1000
      ? `Rp ${(amount / 1000).toFixed(0)}K`
      : `Rp ${amount.toLocaleString("id-ID")}`;

  // Persentase kendaraan selesai dari total
  const donePercent = data.length > 0
    ? Math.round((dataDone.length / data.length) * 100)
    : 0;

  // Persentase kendaraan masih parkir dari total
  const outPercent = data.length > 0
    ? Math.round((dataOut.length / data.length) * 100)
    : 0;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">

      {/* Total Transaksi Selesai */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <GroupIcon className="text-gray-800 size-6 dark:text-white/90" />
        </div>

        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Transaksi Selesai
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {dataDone.length}
              <span className="text-sm font-normal text-gray-400 ml-1">
                / {data.length} total
              </span>
            </h4>
          </div>
          {donePercent > 0 ? (
          <Badge color="success">
            <ArrowUpIcon />
              {donePercent}%
            </Badge>
          ) : (
            <Badge color="error">
              <ArrowDownIcon />
              0%
          </Badge>
          )}
        </div>
      </div>

      {/* Total Pendapatan */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <BoxIconLine className="text-gray-800 size-6 dark:text-white/90" />
        </div>

        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Total Pendapatan
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {formatRupiah(totalRevenue)}
            </h4>
          </div>
          {outPercent > 0 ? (
            <Badge color="warning">
              <ArrowUpIcon />
              {outPercent}% parkir
            </Badge>
          ) : (
            <Badge color="success">
              <ArrowUpIcon />
              Semua selesai
          </Badge>
          )}
        </div>
      </div>

    </div>
  );
}
