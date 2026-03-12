// ─── Fee calculation ──────────────────────────────────────────────────────────
// 0–60 min = Rp 1.000, each next 60-min block +Rp 1.000
export const calcFee = (timeIn: string, timeOut: Date): number => {
  const diffMs  = timeOut.getTime() - new Date(timeIn).getTime();
  const diffMin = Math.max(0, Math.floor(diffMs / 60000));
  const blocks  = Math.ceil(diffMin / 60) || 1;
  return blocks * 1000;
};

// ─── Format datetime ──────────────────────────────────────────────────────────
export const fmt = (d: string | null): string => {
  if (!d) return "—";
  return new Date(d).toLocaleString("id-ID", {
    day: "2-digit", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
};

// ─── Format duration ──────────────────────────────────────────────────────────
export const fmtDur = (m: number | null): string => {
  if (!m) return "—";
  const h = Math.floor(m / 60), min = m % 60;
  return h > 0 ? `${h}j ${min}m` : `${min}m`;
};