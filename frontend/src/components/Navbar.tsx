import { NavLink } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import BrandMark from "./BrandMark";

const pageLinks = [
  { to: "/", label: "Início", end: true },
  { to: "/roles", label: "Rolês" },
  { to: "/perfil", label: "Perfil" },
];

export default function Navbar() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.nav
      initial={reduceMotion ? false : { y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-30 border-b border-border/70 bg-card/95"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <NavLink to="/" className="group flex items-center gap-3">
          <BrandMark className="transition-transform duration-300 ease-out group-hover:rotate-6 group-hover:scale-105" />
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
                  `rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200 ${
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
            className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white shadow-md shadow-primary/20 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-primary/90"
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
              `whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                isActive ? "bg-bg text-title" : "text-text hover:bg-bg hover:text-title"
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </div>
    </motion.nav>
  );
}
