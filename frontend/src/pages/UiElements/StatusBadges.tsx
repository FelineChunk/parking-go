import { T, STATUS_MAP } from "../../components/constant/constants";

interface Props {
  status: string;
  onClick?: () => void;
}

export default function StatusBadge({ status, onClick }: Props) {
  const s = STATUS_MAP[status] ?? { label: status, bg: T.bg, color: T.ink2, border: T.border };

  return (
    <span
      onClick={onClick}
      style={{
        background: s.bg, color: s.color, border: `1px solid ${s.border}`,
        padding: "3px 10px", borderRadius: 6,
        fontSize: 11, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase",
        cursor: onClick ? "pointer" : "default",
        transition: "opacity 0.15s",
        userSelect: "none",
      }}
      onMouseEnter={e => { if (onClick) e.currentTarget.style.opacity = "0.7"; }}
      onMouseLeave={e => { if (onClick) e.currentTarget.style.opacity = "1"; }}
    >
      {s.label}
    </span>
  );
}