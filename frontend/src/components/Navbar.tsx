import { NavLink } from "react-router-dom";
import BrandMark from "./BrandMark";

const pageLinks = [
  { to: "/", label: "Início", end: true },
  { to: "/roles", label: "Rolês" },
  { to: "/perfil", label: "Perfil" },
];

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-30 border-b border-border/70 bg-card/75 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <NavLink to="/" className="group flex items-center gap-3">
          <BrandMark className="transition group-hover:rotate-6 group-hover:scale-105" />
          <span className="font-title text-xl font-bold tracking-tight text-title">Divvy</span>
        </NavLink>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden items-center gap-1 sm:flex">
            {pageLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2 text-sm font-medium transition ${
                    isActive
                      ? "bg-bg text-title"
                      : "text-text hover:bg-bg hover:text-title"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          <NavLink
            to="/#criar-viagem"
            className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white shadow-md shadow-primary/20 transition hover:-translate-y-0.5 hover:bg-primary/90"
          >
            Criar Rolê
          </NavLink>
        </div>
      </div>

      <div className="mx-auto flex max-w-6xl items-center gap-1 overflow-x-auto px-6 pb-3 sm:hidden">
        {pageLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            className={({ isActive }) =>
              `whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium transition ${
                isActive ? "bg-bg text-title" : "text-text hover:bg-bg hover:text-title"
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
