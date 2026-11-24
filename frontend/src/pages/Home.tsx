import { useState } from "react";

const steps = [
  {
    number: "1",
    title: "Crie o grupo e mande o link",
    description:
      "Adicione a galera só pelo nome ou compartilhe o link do rolê.",
    iconBg: "bg-primary/10 text-primary",
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

const tripExpenses = [
  { name: "Airbnb", value: "R$ 1.200" },
  { name: "Mercado", value: "R$ 340" },
  { name: "Gasolina", value: "R$ 180" },
];

const receiptItems = [
  { name: "Cerveja artesanal", price: "R$ 48,00", checked: false },
  { name: "Suco integral", price: "R$ 18,00", checked: true },
  { name: "Petiscos", price: "R$ 36,00", checked: true },
];

export default function Home() {
  const [tripName, setTripName] = useState("");
  const [pixCopied, setPixCopied] = useState(false);

  const handleStart = () => {
    const name = tripName.trim();
    if (!name) return;
    window.location.assign(`/nova-viagem?nome=${encodeURIComponent(name)}`);
  };

  const handleCopyPix = async () => {
    try {
      await navigator.clipboard.writeText("João paga R$ 210,00 para Maria");
    } catch {
      // Simulação visual mesmo sem permissão de clipboard
    }
    setPixCopied(true);
    window.setTimeout(() => setPixCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-bg text-text">
      <nav className="border-b border-border/70 bg-card/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary text-sm font-bold text-white shadow-sm">
              D
            </span>
            <span className="font-title text-xl font-bold text-title">Divvy</span>
          </a>
          <div className="flex items-center gap-3 sm:gap-5">
            <a
              href="#"
              className="text-sm font-medium text-text transition hover:text-title"
            >
              Entrar
            </a>
            <a
              href="#criar-viagem"
              className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-primary/90"
            >
              Criar Viagem
            </a>
          </div>
        </div>
      </nav>

      <main>
        <section className="mx-auto grid max-w-6xl gap-12 px-6 py-14 lg:grid-cols-2 lg:items-center lg:py-20">
          <div>
            <span className="inline-flex rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-accent">
              Sem planilhas. Sem climão.
            </span>
            <h1 className="mt-5 font-title text-4xl font-extrabold leading-tight text-title sm:text-5xl">
              Rache os gastos da viagem sem dor de cabeça.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-text sm:text-lg">
              Registre quem pagou o quê, divida por item ou igualitariamente e
              descubra o jeito mais rápido de quitar tudo no Pix.
            </p>

            <div
              id="criar-viagem"
              className="mt-8 rounded-2xl border border-border bg-card p-3 shadow-sm sm:p-4"
            >
              <label
                htmlFor="trip-name"
                className="mb-2 block text-sm font-medium text-title"
              >
                Nome da viagem
              </label>
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  id="trip-name"
                  type="text"
                  value={tripName}
                  onChange={(event) => setTripName(event.target.value)}
                  placeholder="Churrasco em Ubatuba"
                  className="w-full rounded-xl border border-border bg-bg px-4 py-3 text-sm text-title outline-none ring-primary/20 transition placeholder:text-text/60 focus:border-primary focus:ring-4"
                />
                <button
                  type="button"
                  onClick={handleStart}
                  className="rounded-xl bg-secondary px-5 py-3 text-sm font-semibold text-white transition hover:bg-secondary/90 sm:whitespace-nowrap"
                >
                  Começar agora
                </button>
              </div>
              <p className="mt-2 text-xs text-text/80">
                Ao começar, você segue para a configuração da viagem com esse nome.
              </p>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute -inset-4 -z-10 rounded-[2.5rem] bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 blur-2xl" />
            <div className="rounded-[2rem] border border-border bg-card p-4 shadow-xl sm:p-5">
              <div className="mx-auto mb-4 h-1.5 w-20 rounded-full bg-border" />
              <div className="rounded-2xl border border-border bg-bg p-4 sm:p-5">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-text/70">
                      Exemplo de viagem
                    </p>
                    <h2 className="font-title text-lg font-bold text-title">
                      Feriado na Praia
                    </h2>
                  </div>
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                    4 pessoas
                  </span>
                </div>

                <ul className="space-y-3">
                  {tripExpenses.map((expense) => (
                    <li
                      key={expense.name}
                      className="flex items-center justify-between rounded-xl border border-border bg-card px-4 py-3"
                    >
                      <span className="text-sm font-medium text-title">
                        {expense.name}
                      </span>
                      <span className="text-sm font-semibold text-text">
                        {expense.value}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-4 rounded-2xl border border-secondary/20 bg-secondary/10 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-secondary">
                    Simplificação
                  </p>
                  <p className="mt-1 font-title text-base font-bold text-title">
                    João paga R$ 210,00 para Maria
                  </p>
                  <button
                    type="button"
                    onClick={handleCopyPix}
                    className="mt-3 w-full rounded-xl bg-secondary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-secondary/90"
                  >
                    {pixCopied ? "Copiado!" : "Copiar Pix"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-12 lg:py-16">
          <div className="mb-8 max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-primary">
              Como funciona
            </p>
            <h2 className="mt-2 font-title text-3xl font-bold text-title sm:text-4xl">
              Três passos para fechar a conta do rolê
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {steps.map((step) => (
              <article
                key={step.number}
                className="rounded-2xl border border-border bg-card p-6 shadow-sm"
              >
                <div
                  className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl ${step.iconBg}`}
                >
                  {step.icon}
                </div>
                <p className="text-xs font-semibold uppercase tracking-wide text-text/70">
                  Passo {step.number}
                </p>
                <h3 className="mt-1 font-title text-xl font-semibold text-title">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-text">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-12 lg:py-16">
          <div className="grid gap-6 lg:grid-cols-2">
            <article className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-wide text-accent">
                Divisão Justa
              </p>
              <h3 className="mt-2 font-title text-2xl font-bold text-title sm:text-3xl">
                Quem não bebeu não paga a cerveja
              </h3>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-text sm:text-base">
                Marque item por item quem consumiu cada coisa e deixe a divisão
                justa acontecer automaticamente.
              </p>
              <div className="mt-6 rounded-2xl border border-border bg-bg p-4">
                <div className="mb-3 flex items-center justify-between text-sm">
                  <span className="font-semibold text-title">Conta do bar</span>
                  <span className="text-text">Seleção por item</span>
                </div>
                <ul className="space-y-3">
                  {receiptItems.map((item) => (
                    <li
                      key={item.name}
                      className="flex items-center justify-between rounded-xl border border-border bg-card px-4 py-3"
                    >
                      <label className="flex items-center gap-3 text-sm font-medium text-title">
                        <input
                          type="checkbox"
                          checked={item.checked}
                          readOnly
                          className="h-4 w-4 rounded border-border accent-secondary"
                        />
                        {item.name}
                      </label>
                      <span className="text-sm text-text">{item.price}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-xs text-text/80">
                  Exemplo: itens desmarcados não entram na sua parte.
                </p>
              </div>
            </article>

            <article className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-wide text-secondary">
                Modo Convidado
              </p>
              <h3 className="mt-2 font-title text-2xl font-bold text-title sm:text-3xl">
                Seu amigo não precisa baixar nada
              </h3>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-text sm:text-base">
                Registre gastos e participantes pelo nome, mesmo antes de criarem
                conta, e compartilhe o acerto depois.
              </p>
              <div className="mt-6 rounded-2xl border border-border bg-bg p-4">
                <p className="mb-3 text-sm font-semibold text-title">
                  Participantes do grupo
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center justify-between rounded-xl border border-border bg-card px-4 py-3">
                    <div>
                      <p className="text-sm font-medium text-title">Você</p>
                      <p className="text-xs text-text">Organizador</p>
                    </div>
                    <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
                      Conta ativa
                    </span>
                  </li>
                  <li className="flex items-center justify-between rounded-xl border border-border bg-card px-4 py-3">
                    <div>
                      <p className="text-sm font-medium text-title">Pedro</p>
                      <p className="text-xs text-text">Lançado sem cadastro</p>
                    </div>
                    <span className="rounded-full bg-accent/10 px-2.5 py-1 text-xs font-semibold text-accent">
                      Convidado
                    </span>
                  </li>
                  <li className="flex items-center justify-between rounded-xl border border-border bg-card px-4 py-3">
                    <div>
                      <p className="text-sm font-medium text-title">Ana</p>
                      <p className="text-xs text-text">Pode entrar depois pelo link</p>
                    </div>
                    <span className="rounded-full bg-secondary/10 px-2.5 py-1 text-xs font-semibold text-secondary">
                      Link enviado
                    </span>
                  </li>
                </ul>
              </div>
            </article>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-12 lg:py-16">
          <div className="rounded-3xl bg-title px-6 py-10 text-center text-white shadow-sm sm:px-10">
            <h2 className="font-title text-3xl font-bold sm:text-4xl">
              Próxima viagem marcada? Deixa a conta com a gente.
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-white/80 sm:text-base">
              Crie seu grupo, registre os gastos e descubra o jeito mais simples de
              acertar tudo.
            </p>
            <a
              href="#criar-viagem"
              className="mt-7 inline-flex rounded-xl bg-secondary px-6 py-3 text-sm font-semibold text-white transition hover:bg-secondary/90"
            >
              Criar meu primeiro grupo
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t border-border/70">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-8 text-sm text-text sm:flex-row sm:items-center sm:justify-between">
          <p className="font-medium text-title">Divvy</p>
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
