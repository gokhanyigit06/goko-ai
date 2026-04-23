/* eslint-disable i18next/no-literal-string */
import { NavLink } from "react-router";
import GokoLogo from "#/assets/branding/goko-logo.svg?react";

export function OpenHandsLogoButton() {
  return (
    <NavLink
      to="/"
      aria-label="Goko AI Home"
      className="flex flex-col items-center gap-1 group"
    >
      <div className="goko-logo">
        <GokoLogo width={32} height={32} />
      </div>
      <span
        className="text-[8px] font-bold tracking-[0.15em] uppercase hidden md:block"
        style={{ color: "var(--color-primary)" }}
      >
        GOKO
      </span>
    </NavLink>
  );
}
/* eslint-enable i18next/no-literal-string */
