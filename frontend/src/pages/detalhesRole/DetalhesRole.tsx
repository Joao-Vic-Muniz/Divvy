import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ParticipantsManager from "../../components/ParticipantsManager";
import SectionHeading from "../../components/SectionHeading";
import { getRoleById } from "../../data/roles";
import type { Participant } from "../../types/role";

export default function DetalhesRole() {
  const { roleId } = useParams();
  const role = useMemo(() => getRoleById(roleId), [roleId]);
  const [participants, setParticipants] = useState<Participant[]>(role?.participants ?? []);

  useEffect(() => {
    setParticipants(role?.participants ?? []);
  }, [role]);

  if (!role) {
    return (
      <main className="mx-auto max-w-6xl px-6 py-10 lg:py-14">
        <SectionHeading
          eyebrow="Detalhes do rolê"
          title="Rolê não encontrado"
          description="O rolê que você tentou abrir não existe ou ainda não foi criado."
        />
        <Link
          to="/roles"
          className="mt-6 inline-flex rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary/90"
        >
          Voltar para rolês
        </Link>
      </main>
    );
  }

  const inviteCount = participants.filter((participant) => participant.status !== "Conta ativa").length;

  return (
    <main className="mx-auto max-w-6xl px-6 py-10 lg:py-14">
      <Link to="/roles" className="text-sm font-medium text-primary transition hover:text-primary/80">
        ← Voltar para rolês
      </Link>

      <header className="mt-4 mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          eyebrow="Detalhes do rolê"
          eyebrowClassName="text-secondary"
          title={role.name}
          description="Visualize participantes, gastos e o acerto simplificado deste rolê. Gerencie convites e compartilhe links com a galera."
          className="max-w-3xl"
        />
        <div className="flex flex-wrap gap-2">
          <Link
            to={`/roles/${role.id}`}
            className="inline-flex items-center justify-center rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-semibold text-title transition hover:border-primary/30 hover:text-primary"
          >
            Link da página
          </Link>
        </div>
      </header>

      <section className="grid gap-5 lg:grid-cols-3">
        <article className="rounded-3xl border border-border bg-card p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-text/70">Participantes</p>
          <p className="mt-2 font-title text-3xl font-bold text-title">{participants.length}</p>
          <p className="mt-2 text-sm text-text">
            {inviteCount > 0
              ? `${inviteCount} pessoa(s) com acesso por link/convite.`
              : "Todos com conta ativa no grupo."}
          </p>
        </article>
        <article className="rounded-3xl border border-border bg-card p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-text/70">Total de gastos</p>
          <p className="mt-2 font-title text-3xl font-bold text-title">{role.total}</p>
          <p className="mt-2 text-sm text-text">{role.expenses.join(", ")}</p>
        </article>
        <article className="rounded-3xl border border-secondary/25 bg-secondary/10 p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-secondary">Acerto sugerido</p>
          <p className="mt-2 font-title text-xl font-bold text-title">{role.settlement}</p>
          <p className="mt-2 text-sm text-text">Menor número de transferências.</p>
        </article>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <article className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
          <SectionHeading
            eyebrow="Participantes"
            eyebrowClassName="text-secondary"
            title="Convites e acesso por link"
            description="Adicione pessoas, envie links individuais ou compartilhe o link do grupo para integrar todo mundo ao rolê."
            titleClassName="text-2xl sm:text-3xl"
            className="mb-5"
          />
          <ParticipantsManager
            roleId={role.id}
            participants={participants}
            onChange={setParticipants}
          />
        </article>

        <aside className="space-y-5">
          <article className="rounded-3xl border border-border bg-card p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-wide text-primary">Como funciona o link</p>
            <ul className="mt-3 space-y-3 text-sm text-text">
              <li className="rounded-xl bg-bg p-3">
                <span className="font-medium text-title">Link do grupo:</span> compartilhe com a galera para entrar no rolê.
              </li>
              <li className="rounded-xl bg-bg p-3">
                <span className="font-medium text-title">Link individual:</span> envie para um convidado específico e acompanhe o status.
              </li>
              <li className="rounded-xl bg-bg p-3">
                <span className="font-medium text-title">Sem app:</span> convidados podem ser lançados pelo nome e entrar depois pelo link.
              </li>
            </ul>
          </article>
          <article className="rounded-3xl border border-border bg-card p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-wide text-accent">Dica</p>
            <p className="mt-3 text-sm text-text">
              Ao enviar o link de um participante, o status muda para <span className="font-medium text-secondary">Link enviado</span>.
              Você pode copiar o link novamente a qualquer momento.
            </p>
          </article>
        </aside>
      </section>
    </main>
  );
}
