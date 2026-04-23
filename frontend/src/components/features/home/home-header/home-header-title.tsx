/* eslint-disable i18next/no-literal-string */
export function HomeHeaderTitle() {
  return (
    <div className="flex flex-col items-center gap-3 text-center">
      {/* Main title with animated gradient */}
      <h1
        className="goko-gradient-title text-[42px] md:text-[52px] font-bold leading-tight tracking-[-0.03em]"
        style={{
          fontFamily: "'Inter', 'SF Pro Display', system-ui, sans-serif",
        }}
      >
        What can I build for you?
      </h1>

      {/* Subtitle */}
      <p
        className="text-[15px] font-normal leading-relaxed max-w-[480px]"
        style={{ color: "var(--color-basic)" }}
      >
        {"Goko AI turns your ideas into working software. "}
        <span style={{ color: "var(--color-tertiary-light)" }}>
          Describe what you want to build.
        </span>
      </p>
    </div>
  );
}
/* eslint-enable i18next/no-literal-string */
