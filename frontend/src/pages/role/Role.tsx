import { Link } from "react-router-dom";
import SectionHeading from "../../components/SectionHeading";
import { rolesData } from "../../data/roles";

export default function Role() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-10 lg:py-14">
      <header className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading
          eyebrow="Rolês"
          title="Seus grupos e viagens"
          description="Acompanhe os rolês, veja os gastos e abra os detalhes para gerenciar participantes e links de convite."
          className="max-w-2xl"
        />
        <Link
          to="/#criar-viagem"
          className="inline-flex items-center justify-center rounded-xl bg-secondary px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-secondary/20 transition hover:bg-secondary/90"
        >
          Criar novo rolê
        </Link>
      </header>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {rolesData.map((role) => (
          <article
            key={role.id}
            className="rounded-3xl border border-border bg-card p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="font-title text-xl font-semibold text-title">{role.name}</h2>
                <p className="mt-1 text-sm text-text">{role.participants.length} participantes</p>
              </div>
              <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
                Ativo
              </span>
            </div>
            <div className="mt-5 rounded-2xl bg-bg p-4">
              <p className="text-xs uppercase tracking-wide text-text/70">Total</p>
              <p className="mt-1 font-title text-lg font-bold text-title">{role.total}</p>
            </div>
            <Link
              to={`/roles/${role.id}`}
              className="mt-4 inline-flex w-full items-center justify-center rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-semibold text-title transition hover:border-primary/30 hover:text-primary"
            >
              Ver detalhes e links
            </Link>
          </article>
        ))}
      </section>
    </main>
  );
}
