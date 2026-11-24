type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  eyebrowClassName?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className = "",
  titleClassName = "",
  descriptionClassName = "",
  eyebrowClassName = "text-primary",
}: SectionHeadingProps) {
  const alignment = align === "center" ? "text-center items-center" : "text-left";
  return (
    <div className={`flex flex-col gap-2 ${alignment} ${className}`.trim()}>
      {eyebrow ? (
        <p className={`text-sm font-semibold uppercase tracking-wide ${eyebrowClassName}`.trim()}>
          {eyebrow}
        </p>
      ) : null}
      <h2 className={`font-title text-3xl font-bold text-title sm:text-4xl ${titleClassName}`.trim()}>
        {title}
      </h2>
      {description ? (
        <p
          className={`max-w-2xl text-sm leading-relaxed text-text sm:text-base ${descriptionClassName}`.trim()}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
