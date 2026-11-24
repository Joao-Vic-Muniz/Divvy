import type { ParticipantStatus } from "../types/role";

export default function ParticipantStatusBadge({ status }: { status: ParticipantStatus }) {
  const className =
    status === "Conta ativa"
      ? "bg-primary/10 text-primary"
      : status === "Convidado"
        ? "bg-accent/10 text-accent"
        : "bg-secondary/10 text-secondary";
  return (
    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${className}`}>{status}</span>
  );
}
