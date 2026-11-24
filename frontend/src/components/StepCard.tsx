import type { ReactNode } from "react";

type StepCardProps = {
  number: string;
  title: string;
  description: string;
  icon: ReactNode;
  iconBg: string;
  ring: string;
  active: boolean;
  onClick: () => void;
};

export default function StepCard({
  number,
  title,
  description,
  icon,
  iconBg,
  ring,
  active,
  onClick,
}: StepCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group rounded-3xl border bg-card p-6 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-4 ${ring} ${
        active ? "border-primary/30 ring-4 ring-primary/10" : "border-border"
      }`}
    >
      <div className="mb-4 flex items-center justify-between">
        <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${iconBg}`}>
          {icon}
        </div>
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
            active ? "bg-title text-white" : "bg-bg text-text"
          }`}
        >
          Passo {number}
        </span>
      </div>
      <h3 className="font-title text-xl font-semibold text-title">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-text">{description}</p>
    </button>
  );
}
