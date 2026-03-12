import { T } from "../constant/constants";
import { fmt, fmtDur } from "../../utils/utils";
import StatusBadge from "../../pages/UiElements/StatusBadges";
import { Transactions } from "../../types/types";

interface Props {
  title: string;
  items: Transactions[];
  onStatusClick: (item: Transactions) => void;
}

const COLUMNS = ["ID", "Card ID", "Waktu Masuk", "Waktu Keluar", "Durasi", "Fee", "Status"];

export default function DataTable({ title, items, onStatusClick }: Props) {
  return (
    <div style={{
      background: T.surface, border: `1px solid ${T.border}`,
      borderRadius: 12,
    }}>
      {/* Table header */}
      <div style={{
        padding: "14px 22px", borderBottom: `1px solid ${T.border}`,
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <span style={{ fontWeight: 600, fontSize: 13, color: T.ink1 }}>{title}</span>
        <span style={{
          fontSize: 11, fontWeight: 600, color: T.ink3,
          background: T.bg, border: `1px solid ${T.border}`,
          padding: "2px 9px", borderRadius: 6, letterSpacing: "0.04em",
        }}>
          {items.length} data
        </span>
      </div>

      {/* Table */}
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr>
              {COLUMNS.map(h => (
                <th key={h} style={{
                  padding: "10px 20px", textAlign: "left",
                  fontWeight: 600, color: T.ink3, fontSize: 10,
                  letterSpacing: "0.08em", textTransform: "uppercase",
                  background: T.bg, borderBottom: `1px solid ${T.border}`,
                }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan={7} style={{
                  textAlign: "center", padding: "56px 20px",
                  color: T.ink3, fontSize: 13,
                }}>
                  — Tidak ada data —
                </td>
              </tr>
            ) : items.map(item => (
              <tr
                key={item.id_transaction}
                style={{ borderBottom: `1px solid ${T.border}`, transition: "background 0.1s" }}
                onMouseEnter={e => (e.currentTarget.style.background = T.bg)}
                onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
              >
                <td style={{ padding: "12px 20px", fontWeight: 600, color: T.ink1 }}>
                  {item.id_transaction}
                </td>
                <td style={{ padding: "12px 20px", color: T.ink2, fontFamily: "monospace", fontSize: 12 }}>
                  {item.card_id ?? "—"}
                </td>
                <td style={{ padding: "12px 20px", color: T.ink2 }}>{fmt(item.time_in)}</td>
                <td style={{ padding: "12px 20px", color: T.ink2 }}>{fmt(item.time_out)}</td>
                <td style={{ padding: "12px 20px", color: T.ink2 }}>{fmtDur(item.duration)}</td>
                <td style={{ padding: "12px 20px", fontWeight: 600, color: T.ink1 }}>
                  {item.fee ? `Rp ${item.fee.toLocaleString("id-ID")}` : "—"}
                </td>
                <td style={{ padding: "12px 20px" }}>
                  <StatusBadge status={item.status} onClick={() => onStatusClick(item)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}