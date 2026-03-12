import { useState } from "react";
import { T, STATUS_MAP, ALLOWED_NEXT, ALL_STATUSES } from "../../constant/constants";
import { fmt, fmtDur, calcFee } from "../../../utils/utils";
import StatusBadge from "../../../pages/UiElements/StatusBadges";
import { Transactions } from "../../../types/Types";

interface Props {
  item: Transactions;
  onClose: () => void;
  onSave: (updated: Transactions) => Promise<void>;
}

export default function Modal({ item, onClose, onSave }: Props) {
  const [selectedStatus, setSelectedStatus] = useState(item.status);
  const [saving, setSaving]                 = useState(false);
  const [error, setError]                   = useState<string | null>(null);

  const allowed = ALLOWED_NEXT[item.status] ?? [];

  const previewFee = selectedStatus === "OUT" && item.status === "IN"
    ? calcFee(item.time_in, new Date())
    : null;

  const previewDuration = selectedStatus === "OUT" && item.status === "IN"
    ? Math.floor((new Date().getTime() - new Date(item.time_in).getTime()) / 60000)
    : null;

  const handleSave = async () => {
    if (selectedStatus === item.status) { onClose(); return; }
    setSaving(true);
    setError(null);
    try {
      await onSave({ ...item, status: selectedStatus });
      onClose();
    } catch (e: any) {
      setError(e.message ?? "Gagal menyimpan");
    } finally {
      setSaving(false);
    }
  };

  const INFO_ROWS: [string, string][] = [
    ["ID Transaksi", `#${item.id_transaction}`],
    ["Card ID",      item.card_id ? String(item.card_id) : "—"],
    ["Waktu Masuk",  fmt(item.time_in)],
    ["Waktu Keluar", fmt(item.time_out)],
    ["Durasi",       fmtDur(item.duration ?? null)],
    ["Fee",          item.fee ? `Rp ${item.fee.toLocaleString("id-ID")}` : "—"],
  ];

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed", inset: 0,
          background: "rgba(26,26,24,0.45)",
          backdropFilter: "blur(3px)",
          zIndex: 100, animation: "fadeIn 0.2s ease both",
        }}
      />

      {/* Modal card */}
      <div style={{
        position: "fixed", inset: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        zIndex: 101, padding: 16,
      }}>
        <div style={{
          background: T.surface, border: `1px solid ${T.border}`,
          borderRadius: 16, width: "100%", maxWidth: 480,
          boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
          animation: "slideUp 0.25s cubic-bezier(0.34,1.56,0.64,1) both",
          overflow: "hidden",
        }}>

          {/* Header */}
          <div style={{
            padding: "18px 24px", borderBottom: `1px solid ${T.border}`,
            display: "flex", alignItems: "center", justifyContent: "space-between",
          }}>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: T.ink1 }}>
                Detail Transaksi
              </div>
              <div style={{ fontSize: 12, color: T.ink3, marginTop: 2 }}>
                ID #{item.id_transaction}
              </div>
            </div>
            <button
              onClick={onClose}
              style={{
                width: 30, height: 30, borderRadius: 8,
                border: `1px solid ${T.border}`, background: T.bg, cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: T.ink2, fontSize: 16, lineHeight: 1,
              }}
            >×</button>
          </div>

          {/* Info rows */}
          <div style={{ padding: "16px 24px", display: "flex", flexDirection: "column", gap: 2 }}>
            {INFO_ROWS.map(([label, value]) => (
              <div key={label} style={{
                display: "flex", justifyContent: "space-between",
                padding: "9px 0", borderBottom: `1px solid ${T.border}`,
              }}>
                <span style={{ fontSize: 12, color: T.ink3, fontWeight: 500 }}>{label}</span>
                <span style={{ fontSize: 13, color: T.ink1, fontWeight: 600 }}>{value}</span>
              </div>
            ))}

            {/* Current status */}
            <div style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "9px 0", borderBottom: `1px solid ${T.border}`,
            }}>
              <span style={{ fontSize: 12, color: T.ink3, fontWeight: 500 }}>Status Saat Ini</span>
              <StatusBadge status={item.status} />
            </div>
          </div>

          {/* Status selector */}
          <div style={{ padding: "0 24px 16px" }}>
            <div style={{
              fontSize: 11, fontWeight: 700, color: T.ink3,
              letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10,
            }}>
              Ubah Status
            </div>

            <div style={{ display: "flex", gap: 8 }}>
              {ALL_STATUSES.map(s => {
                const isActive   = selectedStatus === s;
                const isCurrent  = item.status === s;
                const isDisabled = !allowed.includes(s) && !isCurrent;
                const sm = STATUS_MAP[s] ?? { label: s, bg: T.bg, color: T.ink2, border: T.border };

                return (
                  <button
                    key={s}
                    disabled={isDisabled}
                    onClick={() => !isDisabled && setSelectedStatus(s)}
                    style={{
                      flex: 1, padding: "9px 0", borderRadius: 9,
                      border: isActive ? `2px solid ${T.ink1}` : `1px solid ${T.border}`,
                      background: isActive ? T.ink1 : isDisabled ? T.bg : sm.bg,
                      color: isActive ? "#fff" : isDisabled ? T.ink3 : sm.color,
                      fontSize: 12, fontWeight: 700,
                      letterSpacing: "0.05em", textTransform: "uppercase",
                      cursor: isDisabled ? "not-allowed" : "pointer",
                      opacity: isDisabled ? 0.45 : 1,
                      transition: "all 0.15s", fontFamily: "inherit", position: "relative",
                    }}
                  >
                    {sm.label}
                    {isCurrent && (
                      <span style={{
                        position: "absolute", top: -6, right: -6,
                        fontSize: 8, background: T.ink3, color: "#fff",
                        borderRadius: 4, padding: "1px 4px", fontWeight: 700,
                      }}>NOW</span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Preview fee — tampil saat akan OUT */}
            {selectedStatus === "OUT" && item.status === "IN" && (
              <div style={{
                marginTop: 10, padding: "9px 12px",
                background: "#FDF8EE", border: "1px solid #E5DDD0",
                borderRadius: 8, fontSize: 12, color: "#5C4C30",
              }}>
                💰 Estimasi fee:{" "}
                <strong>Rp {previewFee?.toLocaleString("id-ID")}</strong>
                {" · "}
                Durasi: <strong>{fmtDur(previewDuration)}</strong>
                <div style={{ marginTop: 4, color: "#8C6C50", fontSize: 11 }}>
                  *Nilai final dihitung ulang oleh sistem saat disimpan
                </div>
              </div>
            )}

            {/* Error */}
            {error && (
              <div style={{
                marginTop: 10, padding: "9px 12px",
                background: "#FEF0EE", border: "1px solid #E5D0D0",
                borderRadius: 8, fontSize: 12, color: "#5C2A2A",
              }}>
                {error}
              </div>
            )}
          </div>

          {/* Actions */}
          <div style={{
            padding: "14px 24px", borderTop: `1px solid ${T.border}`,
            display: "flex", gap: 8, justifyContent: "flex-end",
          }}>
            <button
              onClick={onClose}
              style={{
                padding: "9px 18px", borderRadius: 8,
                border: `1px solid ${T.border}`, background: T.surface, color: T.ink2,
                fontSize: 13, fontWeight: 600, cursor: "pointer",
                fontFamily: "inherit", transition: "background 0.15s",
              }}
              onMouseEnter={e => e.currentTarget.style.background = T.bg}
              onMouseLeave={e => e.currentTarget.style.background = T.surface}
            >
              Batal
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              style={{
                padding: "9px 22px", borderRadius: 8, border: "none",
                background: saving ? T.ink3 : T.ink1, color: "#fff",
                fontSize: 13, fontWeight: 600,
                cursor: saving ? "not-allowed" : "pointer",
                fontFamily: "inherit", transition: "opacity 0.15s",
                display: "flex", alignItems: "center", gap: 6,
              }}
            >
              {saving ? (
                <>
                  <svg
                    width="12" height="12" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2.5"
                    strokeLinecap="round" strokeLinejoin="round"
                    style={{ animation: "spin 0.8s linear infinite" }}
                  >
                    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                  </svg>
                  Menyimpan…
                </>
              ) : "Simpan"}
            </button>
          </div>

        </div>
      </div>
    </>
  );
}