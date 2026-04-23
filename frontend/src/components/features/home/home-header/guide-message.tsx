/* eslint-disable i18next/no-literal-string */
export function GuideMessage() {
  return (
    <div
      className="goko-guide-badge w-fit flex flex-row items-center justify-center gap-2 rounded-full leading-5 text-[13px] font-medium m-1 px-4 py-2"
      style={{
        background: "rgba(129, 140, 248, 0.08)",
        border: "1px solid rgba(129, 140, 248, 0.2)",
        color: "var(--color-tertiary-light)",
      }}
    >
      <span
        className="inline-block w-1.5 h-1.5 rounded-full"
        style={{ background: "#818cf8" }}
      />
      <span>Powered by Goko AI</span>
      <span style={{ color: "rgba(139,143,168,0.5)" }}>·</span>
      <a
        href="https://docs.all-hands.dev/usage/getting-started"
        target="_blank"
        rel="noopener noreferrer"
        className="goko-docs-link transition-colors duration-200"
        style={{ color: "#818cf8" }}
      >
        View docs →
      </a>
    </div>
  );
}
/* eslint-enable i18next/no-literal-string */
