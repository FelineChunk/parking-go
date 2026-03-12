import { T } from "../../constant/constants";

interface Props {
  label: string;
  value: string | number;
  sub?: string;
  delay: string;
  inverted?: boolean;
}

export default function StatCard({ label, value, sub, delay, inverted }: Props) {
  return (
    <div style={{
      background: inverted ? T.ink1 : T.surface,
      border: `1px solid ${inverted ? "transparent" : T.border}`,
      borderRadius: 12, padding: "22px 22px 18px",
      display: "flex", flexDirection: "column", gap: 18,
      animationDelay: delay, animation: "up 0.5s ease both",
    }}>
      <div style={{
        fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
        color: inverted ? "rgba(255,255,255,0.35)" : T.ink3,
      }}>
        {label}
      </div>
      <div>
        <div style={{
          fontSize: 32, fontWeight: 700, lineHeight: 1, letterSpacing: "-0.02em",
          color: inverted ? "#fff" : T.ink1,
        }}>
          {value}
        </div>
        {sub && (
          <div style={{
            fontSize: 12, marginTop: 5,
            color: inverted ? "rgba(255,255,255,0.3)" : T.ink3,
          }}>
            {sub}
          </div>
        )}
      </div>
    </div>
  );
}