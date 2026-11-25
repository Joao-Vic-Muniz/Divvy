import { useMemo, useState } from "react";
import BrandMark from "../components/BrandMark";
import ParticipantsManager from "../components/ParticipantsManager";
import SectionHeading from "../components/SectionHeading";
import StepCard from "../components/StepCard";
import Reveal from "../components/motion/Reveal";
import { Stagger, StaggerItem } from "../components/motion/Stagger";
import type { Participant } from "../types/role";

type Expense = {
  id: number;
  name: string;
  amount: number;
};

type ReceiptItem = {
  id: number;
  name: string;
  price: number;
  included: boolean;
};

const steps = [
  {
    number: "1",
    title: "Crie o grupo e mande o link",
    description: "Adicione a galera só pelo nome ou compartilhe o link do rolê.",
    iconBg: "bg-primary/10 text-primary",
    ring: "hover:ring-primary/25",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
        <path
          d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.8" />
        <path
          d="M19 8v6M22 11h-6"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    number: "2",
    title: "Lance os gastos na hora",
    description:
      "Tire foto da nota, escolha quem consumiu e divida por igual ou por item.",
    iconBg: "bg-accent/10 text-accent",
    ring: "hover:ring-accent/25",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
        <path
          d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path
          d="M14 3v5h5M9 13h6M9 17h4"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    number: "3",
    title: "Acerte tudo com 1 Pix",
    description:
      "O Divvy cruza todas as dívidas e mostra o menor número possível de transferências.",
    iconBg: "bg-secondary/10 text-secondary",
    ring: "hover:ring-secondary/25",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
        <path
          d="M12 3 4.5 7.5a3.5 3.5 0 0 0 0 5L12 20l7.5-7.5a3.5 3.5 0 0 0 0-5L12 3Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path
          d="M9 12h6"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

const initialExpenses: Expense[] = [
  { id: 1, name: "Airbnb", amount: 1200 },
  { id: 2, name: "Mercado", amount: 340 },
  { id: 3, name: "Gasolina", amount: 180 },
];

const initialReceipt: ReceiptItem[] = [
  { id: 1, name: "Cerveja artesanal", price: 48, included: false },
  { id: 2, name: "Suco integral", price: 18, included: true },
  { id: 3, name: "Petiscos", price: 36, included: true },
];

const initialParticipants: Participant[] = [
  { id: 1, name: "Você", status: "Conta ativa", note: "Organizador" },
  { id: 2, name: "Pedro", status: "Convidado", note: "Lançado sem cadastro" },
  { id: 3, name: "Ana", status: "Link enviado", note: "Pode entrar depois pelo link" },
];

const currency = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

function formatCurrency(value: number) {
  return currency.format(value);
}

function StatTile({
  label,
  value,
  valueClassName = "text-title",
}: {
  label: string;
  value: string;
  valueClassName?: string;
}) {
  return (
    <div className="rounded-xl bg-card p-3 ring-1 ring-border">
      <p className="text-xs text-text/70">{label}</p>
      <p className={`mt-1 font-title text-lg font-bold ${valueClassName}`}>{value}</p>
    </div>
  );
}

export default function Home() {
  const [tripName, setTripName] = useState("");
  const [startError, setStartError] = useState("");
  const [groupReady, setGroupReady] = useState("");

  const [expenses, setExpenses] = useState(initialExpenses);
  const [newExpenseName, setNewExpenseName] = useState("");
  const [newExpenseAmount, setNewExpenseAmount] = useState("");
  const [pixCopied, setPixCopied] = useState(false);

  const [receiptItems, setReceiptItems] = useState(initialReceipt);
  const [participants, setParticipants] = useState<Participant[]>(initialParticipants);
  const [activeStep, setActiveStep] = useState(1);

  const displayTripName = tripName.trim() || "Feriado na Praia";
  const totalExpenses = useMemo(
    () => expenses.reduce((sum, expense) => sum + expense.amount, 0),
    [expenses],
  );
  const perPerson = useMemo(() => totalExpenses / 4, [totalExpenses]);
  const settlement = useMemo(() => perPerson / 2, [perPerson]);

  const includedTotal = useMemo(
    () => receiptItems.filter((item) => item.included).reduce((sum, item) => sum + item.price, 0),
    [receiptItems],
  );
  const excludedTotal = useMemo(
    () => receiptItems.filter((item) => !item.included).reduce((sum, item) => sum + item.price, 0),
    [receiptItems],
  );

  const handleStart = () => {
    const name = tripName.trim();
    if (!name) {
      setStartError("Dê um nome para a viagem para começar.");
      setGroupReady("");
      return;
    }
    setStartError("");
    setGroupReady(name);
  };

  const handleAddExpense = () => {
    const name = newExpenseName.trim();
    const amount = Number(newExpenseAmount.replace(",", "."));
    if (!name || !Number.isFinite(amount) || amount <= 0) return;
    setExpenses((current) => [
      ...current,
      { id: Date.now(), name, amount: Math.round(amount * 100) / 100 },
    ]);
    setNewExpenseName("");
    setNewExpenseAmount("");
  };

  const handleRemoveExpense = (id: number) => {
    setExpenses((current) => current.filter((expense) => expense.id !== id));
  };

  const handleCopyPix = async () => {
    const text = `João paga ${formatCurrency(settlement)} para Maria`;
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Simulação visual mesmo sem permissão de clipboard
    }
    setPixCopied(true);
    window.setTimeout(() => setPixCopied(false), 2000);
  };

  const toggleReceiptItem = (id: number) => {
    setReceiptItems((current) =>
      current.map((item) => (item.id === id ? { ...item, included: !item.included } : item)),
    );
  };

  return (
    <div className="relative overflow-x-hidden">
     

      <main>
        <section className="mx-auto grid max-w-6xl gap-12 px-6 pb-14 pt-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:pb-20 lg:pt-20">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/95 px-3 py-1.5 text-xs font-medium text-text shadow-sm">
              <span className="h-2 w-2 rounded-full bg-secondary" />
              Ideal para viagens, repúblicas e rolês
            </span>

            <h1 className="mt-5 max-w-2xl text-balance font-title text-4xl font-extrabold leading-[1.05] text-title sm:text-5xl lg:text-6xl">
              Pare de brigar com a calculadora no{" "}
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                fim da viagem
              </span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-text sm:text-lg">
              Registre quem pagou o quê, divida por item ou igualitariamente e descubra o jeito
              mais rápido de quitar tudo no Pix.
            </p>

            <div
              id="criar-viagem"
              className="mt-8 rounded-3xl border border-border bg-card/95 p-4 shadow-xl shadow-title/5 sm:p-5"
            >
              <div className="mb-3 flex items-center justify-between gap-3">
                <label htmlFor="trip-name" className="block text-sm font-semibold text-title">
                  Nome da viagem
                </label>
                <span className="rounded-full bg-bg px-2.5 py-1 text-[11px] font-medium text-text">
                  preview ao vivo
                </span>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  id="trip-name"
                  type="text"
                  value={tripName}
                  onChange={(event) => {
                    setTripName(event.target.value);
                    if (startError) setStartError("");
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") handleStart();
                  }}
                  placeholder="Churrasco em Ubatuba"
                  className="w-full rounded-2xl border border-border bg-bg px-4 py-3 text-sm text-title outline-none ring-primary/20 transition placeholder:text-text/50 focus:border-primary focus:ring-4"
                />
                <button
                  type="button"
                  onClick={handleStart}
                  className="rounded-2xl bg-secondary px-5 py-3 text-sm font-semibold text-white shadow-md shadow-secondary/20 transition hover:-translate-y-0.5 hover:bg-secondary/90 sm:whitespace-nowrap"
                >
                  Começar agora
                </button>
              </div>
              {startError ? (
                <p className="mt-2 text-xs font-medium text-accent">{startError}</p>
              ) : (
                <p className="mt-2 text-xs text-text/80">
                  Digite um nome e veja o preview atualizar. Ao começar, você segue para a
                  configuração.
                </p>
              )}

              {groupReady && (
                <div className="animate-pop mt-4 flex flex-col gap-3 rounded-2xl border border-secondary/25 bg-secondary/10 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold text-title">Grupo pronto para configurar</p>
                    <p className="text-xs text-text">
                      <span className="font-medium text-secondary">{groupReady}</span> já pode
                      receber participantes e gastos.
                    </p>
                  </div>
                  <a
                    href={`/nova-viagem?nome=${encodeURIComponent(groupReady)}`}
                    className="inline-flex items-center justify-center rounded-xl bg-title px-4 py-2 text-sm font-semibold text-white transition hover:bg-title/90"
                  >
                    Abrir configuração
                  </a>
                </div>
              )}
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-text">
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5">
                <span className="text-secondary">●</span> Pix simplificado
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5">
                <span className="text-accent">●</span> Divisão por item
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5">
                <span className="text-primary">●</span> Convidados sem app
              </span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md animate-fade-up [animation-delay:120ms]">
            <div
              className="absolute -inset-4 -z-10 rounded-[2.6rem] opacity-70"
              style={{
                background:
                  "linear-gradient(135deg, color-mix(in oklab, var(--color-primary) 18%, transparent), color-mix(in oklab, var(--color-secondary) 14%, transparent), color-mix(in oklab, var(--color-accent) 16%, transparent))",
              }}
            />
            <div className="rounded-[2rem] border border-white/60 bg-card p-4 shadow-2xl shadow-title/10 ring-1 ring-border sm:p-5">
              <div className="mx-auto mb-4 h-1.5 w-20 rounded-full bg-border" />
              <div className="rounded-[1.5rem] border border-border bg-gradient-to-b from-bg to-white p-4 sm:p-5">
                <div className="mb-4 flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-text/70">
                      Preview do grupo
                    </p>
                    <h2 className="font-title text-lg font-bold leading-tight text-title sm:text-xl">
                      {displayTripName}
                    </h2>
                  </div>
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                    4 pessoas
                  </span>
                </div>

                <ul className="space-y-2.5">
                  {expenses.map((expense) => (
                    <li
                      key={expense.id}
                      className="group flex items-center justify-between gap-3 rounded-xl border border-border bg-card px-4 py-3 transition hover:border-primary/30 hover:shadow-sm"
                    >
                      <span className="truncate text-sm font-medium text-title">{expense.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-text">
                          {formatCurrency(expense.amount)}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleRemoveExpense(expense.id)}
                          className="rounded-md px-1.5 py-0.5 text-xs text-text/50 opacity-0 transition hover:bg-bg hover:text-accent group-hover:opacity-100"
                          aria-label={`Remover ${expense.name}`}
                          title="Remover"
                        >
                          ×
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="mt-3 grid grid-cols-[1fr_1fr_auto] gap-2 rounded-xl border border-dashed border-border bg-card/70 p-2">
                  <input
                    type="text"
                    value={newExpenseName}
                    onChange={(event) => setNewExpenseName(event.target.value)}
                    placeholder="Novo gasto"
                    className="w-full rounded-lg border border-border bg-bg px-3 py-2 text-xs text-title outline-none focus:border-primary"
                  />
                  <input
                    type="text"
                    inputMode="decimal"
                    value={newExpenseAmount}
                    onChange={(event) => setNewExpenseAmount(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") handleAddExpense();
                    }}
                    placeholder="Valor"
                    className="w-full rounded-lg border border-border bg-bg px-3 py-2 text-xs text-title outline-none focus:border-primary"
                  />
                  <button
                    type="button"
                    onClick={handleAddExpense}
                    className="rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-white transition hover:bg-primary/90"
                    aria-label="Adicionar gasto"
                  >
                    +
                  </button>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                  <div className="rounded-xl bg-bg p-3">
                    <p className="text-text/70">Total</p>
                    <p className="mt-0.5 font-title text-base font-bold text-title">
                      {formatCurrency(totalExpenses)}
                    </p>
                  </div>
                  <div className="rounded-xl bg-bg p-3">
                    <p className="text-text/70">Por pessoa (4)</p>
                    <p className="mt-0.5 font-title text-base font-bold text-title">
                      {formatCurrency(perPerson)}
                    </p>
                  </div>
                </div>

                <div className="mt-3 rounded-2xl border border-secondary/25 bg-gradient-to-br from-secondary/15 to-secondary/5 p-4">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs font-semibold uppercase tracking-wide text-secondary">
                      Simplificação
                    </p>
                    <span className="rounded-full bg-white/70 px-2 py-0.5 text-[10px] font-semibold text-secondary">
                      estimado
                    </span>
                  </div>
                  <p className="mt-1 font-title text-base font-bold text-title">
                    João paga {formatCurrency(settlement)} para Maria
                  </p>
                  <p className="mt-1 text-xs text-text/80">
                    Menos transferências, conta fechada mais rápido.
                  </p>
                  <button
                    type="button"
                    onClick={handleCopyPix}
                    className="mt-3 w-full rounded-xl bg-secondary px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-secondary/20 transition hover:bg-secondary/90"
                  >
                    {pixCopied ? "Copiado!" : "Copiar Pix"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-12 lg:py-16">
          <Reveal className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="Como funciona"
              title="Três passos para fechar a conta do rolê"
              className="max-w-2xl"
            />
            <p className="text-sm text-text">Toque em um passo para destacar.</p>
          </Reveal>
          <Stagger className="grid gap-5 md:grid-cols-3">
            {steps.map((step, index) => (
              <StaggerItem key={step.number}>
                <StepCard
                  number={step.number}
                  title={step.title}
                  description={step.description}
                  icon={step.icon}
                  iconBg={step.iconBg}
                  ring={step.ring}
                  active={activeStep === index + 1}
                  onClick={() => setActiveStep(index + 1)}
                />
              </StaggerItem>
            ))}
          </Stagger>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-12 lg:py-16">
          <Stagger className="grid gap-6 lg:grid-cols-2" stagger={0.12}>
            <StaggerItem className="h-full" y={22}>
              <article className="relative h-full overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
                <div
                className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-70"
                style={{
                  background:
                    "radial-gradient(circle, color-mix(in oklab, var(--color-accent) 18%, transparent) 0%, transparent 70%)",
                }}
              />
                <SectionHeading
                  eyebrow="Divisão Justa"
                  eyebrowClassName="text-accent"
                  title="Quem não bebeu não paga a cerveja"
                  description="Marque item por item quem consumiu cada coisa e veja sua parte atualizar na hora."
                  titleClassName="text-2xl sm:text-3xl"
                  descriptionClassName="max-w-xl"
                />
                <div className="mt-6 rounded-2xl border border-border bg-bg p-4">
                  <div className="mb-3 flex items-center justify-between gap-3 text-sm">
                    <span className="font-semibold text-title">Conta do bar</span>
                    <span className="rounded-full bg-card px-2.5 py-1 text-xs text-text">
                      seleção interativa
                    </span>
                  </div>
                  <ul className="space-y-3">
                    {receiptItems.map((item) => (
                      <li
                        key={item.id}
                        className={`flex items-center justify-between rounded-xl border px-4 py-3 transition-all duration-200 ease-out ${
                          item.included
                            ? "border-secondary/30 bg-secondary/5"
                            : "border-border bg-card opacity-80"
                        }`}
                      >
                        <label className="flex cursor-pointer items-center gap-3 text-sm font-medium text-title">
                          <input
                            type="checkbox"
                            checked={item.included}
                            onChange={() => toggleReceiptItem(item.id)}
                            className="h-4 w-4 rounded border-border accent-secondary"
                          />
                          <span className={!item.included ? "line-through decoration-text/40" : ""}>
                            {item.name}
                          </span>
                        </label>
                        <span className="text-sm font-medium text-text">
                          {formatCurrency(item.price)}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <StatTile label="Sua parte" value={formatCurrency(includedTotal)} valueClassName="text-secondary" />
                    <StatTile label="Fora da conta" value={formatCurrency(excludedTotal)} valueClassName="text-accent" />
                  </div>
                  <p className="mt-3 text-xs text-text/80">Itens desmarcados não entram na sua parte.</p>
                </div>
              </article>
            </StaggerItem>

            <StaggerItem className="h-full" y={22}>
              <article className="relative h-full overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
                <div
                className="pointer-events-none absolute -left-16 -bottom-16 h-48 w-48 rounded-full opacity-70"
                style={{
                  background:
                    "radial-gradient(circle, color-mix(in oklab, var(--color-secondary) 18%, transparent) 0%, transparent 70%)",
                }}
              />
                <SectionHeading
                  eyebrow="Modo Convidado"
                  eyebrowClassName="text-secondary"
                  title="Seu amigo não precisa baixar nada"
                  description="Adicione pessoas pelo nome, envie links individuais e compartilhe o link do grupo para integrar todo mundo."
                  titleClassName="text-2xl sm:text-3xl"
                  descriptionClassName="max-w-xl"
                  className="mb-6"
                />
                <ParticipantsManager
                  roleId="feriado-na-praia"
                  participants={participants}
                  onChange={setParticipants}
                />
              </article>
            </StaggerItem>
          </Stagger>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-12 lg:py-16">
          <Reveal y={24}>
            <div className="relative overflow-hidden rounded-[2rem] bg-title px-6 py-12 text-center text-white shadow-xl sm:px-10">
              <div
                className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full opacity-60"
                style={{
                  background:
                    "radial-gradient(circle, color-mix(in oklab, var(--color-primary) 45%, transparent) 0%, transparent 70%)",
                }}
              />
              <div
                className="pointer-events-none absolute -bottom-16 -right-16 h-64 w-64 rounded-full opacity-50"
                style={{
                  background:
                    "radial-gradient(circle, color-mix(in oklab, var(--color-secondary) 40%, transparent) 0%, transparent 70%)",
                }}
              />
              <p className="relative text-sm font-semibold uppercase tracking-[0.2em] text-white/70">
                Bora fechar essa conta
              </p>
              <h2 className="relative mx-auto mt-3 max-w-3xl text-balance font-title text-3xl font-bold sm:text-4xl">
                Próxima viagem marcada? Deixa a conta com a gente.
              </h2>
              <p className="relative mx-auto mt-3 max-w-2xl text-sm text-white/80 sm:text-base">
                Crie seu grupo, registre os gastos e descubra o jeito mais simples de acertar tudo.
              </p>
              <div className="relative mt-7 flex flex-wrap items-center justify-center gap-3">
                <a
                  href="#criar-viagem"
                  className="inline-flex rounded-xl bg-secondary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-secondary/20 transition hover:-translate-y-0.5 hover:bg-secondary/90"
                >
                  Criar meu primeiro grupo
                </a>
                <a
                  href="https://github.com/Joao-Vic-Muniz/Divvy"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex rounded-xl border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/15"
                >
                  Ver projeto no GitHub
                </a>
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      <footer className="border-t border-border/70 bg-card/50">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-8 text-sm text-text sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <BrandMark size="sm" className="text-xs" />
            <p className="font-title font-semibold text-title">Divvy</p>
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <a
              href="https://github.com/Joao-Vic-Muniz/Divvy"
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-primary"
            >
              Repositório no GitHub
            </a>
            <span>Créditos: equipe Divvy</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
