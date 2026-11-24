export default function Perfil() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-10 lg:py-14">
      <header className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">Perfil</p>
        <h1 className="mt-2 font-title text-3xl font-bold text-title sm:text-4xl">Sua conta</h1>
        <p className="mt-2 max-w-2xl text-sm text-text sm:text-base">
          Gerencie suas informações e preferências na plataforma Divvy.
        </p>
      </header>

      <section className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <article className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-lg font-bold text-white">
              J
            </div>
            <div>
              <h2 className="font-title text-xl font-semibold text-title">João</h2>
              <p className="text-sm text-text">joao@exemplo.com</p>
            </div>
          </div>
          <dl className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-bg p-4">
              <dt className="text-xs uppercase tracking-wide text-text/70">Rolês ativos</dt>
              <dd className="mt-1 font-title text-2xl font-bold text-title">3</dd>
            </div>
            <div className="rounded-2xl bg-bg p-4">
              <dt className="text-xs uppercase tracking-wide text-text/70">Convites pendentes</dt>
              <dd className="mt-1 font-title text-2xl font-bold text-title">1</dd>
            </div>
          </dl>
        </article>

        <article className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
          <h2 className="font-title text-xl font-semibold text-title">Preferências</h2>
          <ul className="mt-4 space-y-3 text-sm text-text">
            <li className="flex items-center justify-between rounded-xl border border-border bg-bg px-4 py-3">
              <span>Notificações de acerto</span>
              <span className="font-medium text-secondary">Ativas</span>
            </li>
            <li className="flex items-center justify-between rounded-xl border border-border bg-bg px-4 py-3">
              <span>Chave Pix padrão</span>
              <span className="font-medium text-title">Configurada</span>
            </li>
            <li className="flex items-center justify-between rounded-xl border border-border bg-bg px-4 py-3">
              <span>Modo convidado</span>
              <span className="font-medium text-title">Habilitado</span>
            </li>
          </ul>
        </article>
      </section>
    </main>
  );
}
