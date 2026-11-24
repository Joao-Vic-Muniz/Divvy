import './Role.css';


import { useState } from 'react';
import {
  ArrowLeft,
  CalendarDays,
  MapPin,
  Users,
  Receipt,
  Wallet,
  Plus,
  MoreHorizontal,
  Check,
  CircleDollarSign,
  UserPlus,
  Utensils,
  Car,
  ShoppingBag,
  Pencil,
  X,
} from 'lucide-react';

type Tab = 'overview' | 'people' | 'expenses' | 'split';

interface Participant {
  id: number;
  name: string;
  initials: string;
  paid: number;
  attended: boolean;
}

interface Expense {
  id: number;
  title: string;
  category: string;
  payer: string;
  amount: number;
}

const initialParticipants: Participant[] = [
  { id: 1, name: 'Giovana', initials: 'G', paid: 150, attended: true },
  { id: 2, name: 'João', initials: 'J', paid: 120, attended: true },
  { id: 3, name: 'Everton', initials: 'E', paid: 80, attended: true },
  { id: 4, name: 'Matheus', initials: 'M', paid: 0, attended: true },
  { id: 5, name: 'Lucas', initials: 'L', paid: 70, attended: true },
  { id: 6, name: 'Ana', initials: 'A', paid: 0, attended: true },
];

const initialExpenses: Expense[] = [
  {
    id: 1,
    title: 'Carnes e acompanhamentos',
    category: 'Alimentação',
    payer: 'Giovana',
    amount: 150,
  },
  {
    id: 2,
    title: 'Bebidas',
    category: 'Mercado',
    payer: 'João',
    amount: 120,
  },
  {
    id: 3,
    title: 'Transporte',
    category: 'Transporte',
    payer: 'Everton',
    amount: 80,
  },
  {
    id: 4,
    title: 'Itens adicionais',
    category: 'Compras',
    payer: 'Lucas',
    amount: 70,
  },
];

const formatCurrency = (value: number) =>
  value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

export default function Role() {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [participants] = useState(initialParticipants);
  const [expenses, setExpenses] = useState(initialExpenses);
  const [showModal, setShowModal] = useState(false);

  const [expenseTitle, setExpenseTitle] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expensePayer, setExpensePayer] = useState('Giovana');

  const totalExpenses = expenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );

  const attendedParticipants = participants.filter(
    (person) => person.attended
  );

  const average =
    attendedParticipants.length > 0
      ? totalExpenses / attendedParticipants.length
      : 0;

  const tabs = [
    { id: 'overview' as Tab, label: 'Visão geral', icon: Wallet },
    { id: 'people' as Tab, label: 'Participantes', icon: Users },
    { id: 'expenses' as Tab, label: 'Despesas', icon: Receipt },
    { id: 'split' as Tab, label: 'Divisão', icon: CircleDollarSign },
  ];

  function handleAddExpense(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const amount = Number(expenseAmount);

    if (!expenseTitle.trim() || amount <= 0) return;

    const newExpense: Expense = {
      id: Date.now(),
      title: expenseTitle,
      category: 'Outros',
      payer: expensePayer,
      amount,
    };

    setExpenses((current) => [...current, newExpense]);

    const payer = participants.find(
      (person) => person.name === expensePayer
    );

    if (payer) {
      payer.paid += amount;
    }

    setExpenseTitle('');
    setExpenseAmount('');
    setShowModal(false);
  }

  function getExpenseIcon(category: string) {
    switch (category) {
      case 'Alimentação':
        return Utensils;
      case 'Transporte':
        return Car;
      case 'Mercado':
      case 'Compras':
        return ShoppingBag;
      default:
        return Receipt;
    }
  }

  return (
    <main className="role-page">
      <div className="role-container">

        {/* Voltar */}

        <button className="role-back-button">
          <ArrowLeft size={17} />
          Voltar para experiências
        </button>

        {/* Cabeçalho */}

        <header className="role-header">
          <div className="role-header-info">
            <div className="role-status">
              <span className="status-dot" />
              Em andamento
              <span className="role-id">Experiência #001</span>
            </div>

            <h1>Churrasco de sábado</h1>

            <div className="role-meta">
              <span>
                <CalendarDays size={16} />
                23 de novembro de 2026
              </span>

              <span>
                <MapPin size={16} />
                Itanhaém, SP
              </span>
            </div>
          </div>

          <button className="role-edit-button">
            <Pencil size={16} />
            Editar rolê
          </button>
        </header>

        {/* Indicadores */}

        <section className="role-stats">
          <SummaryCard
            label="Total gasto"
            value={formatCurrency(totalExpenses)}
            description="Despesas registradas"
            icon={Wallet}
          />

          <SummaryCard
            label="Participantes"
            value={String(participants.length)}
            description="Pessoas no rolê"
            icon={Users}
          />

          <SummaryCard
            label="Média por pessoa"
            value={formatCurrency(average)}
            description="Divisão igualitária"
            icon={CircleDollarSign}
          />

          <SummaryCard
            label="Despesas"
            value={String(expenses.length)}
            description="Lançamentos realizados"
            icon={Receipt}
          />
        </section>

        {/* Abas */}

        <nav className="role-tabs">
          {tabs.map((tab) => {
            const Icon = tab.icon;

            return (
              <button
                key={tab.id}
                className={`role-tab ${
                  activeTab === tab.id ? 'active' : ''
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                <Icon size={17} />
                {tab.label}
              </button>
            );
          })}
        </nav>

        {/* Visão geral */}

        {activeTab === 'overview' && (
          <section className="role-content-grid">

            <div className="role-panel role-expenses-panel">
              <div className="panel-header">
                <div>
                  <h2>Despesas recentes</h2>
                  <p>Últimos gastos deste rolê</p>
                </div>

                <button
                  className="text-action"
                  onClick={() => setActiveTab('expenses')}
                >
                  Ver todas
                </button>
              </div>

              <div className="expense-list">
                {expenses.slice(0, 5).map((expense) => {
                  const Icon = getExpenseIcon(expense.category);

                  return (
                    <div className="expense-item" key={expense.id}>
                      <div className="expense-icon">
                        <Icon size={19} />
                      </div>

                      <div className="expense-info">
                        <strong>{expense.title}</strong>
                        <span>
                          {expense.category} · {expense.payer} pagou
                        </span>
                      </div>

                      <strong className="expense-value">
                        {formatCurrency(expense.amount)}
                      </strong>
                    </div>
                  );
                })}
              </div>

              <button
                className="primary-button panel-add-button"
                onClick={() => setShowModal(true)}
              >
                <Plus size={17} />
                Adicionar despesa
              </button>
            </div>

            <div className="role-panel">
              <div className="panel-header">
                <div>
                  <h2>Participantes</h2>
                  <p>Pessoas deste rolê</p>
                </div>

                <button
                  className="text-action"
                  onClick={() => setActiveTab('people')}
                >
                  Ver todos
                </button>
              </div>

              <div className="participant-list">
                {participants.slice(0, 6).map((person) => (
                  <div className="participant-item" key={person.id}>
                    <div className="participant-avatar">
                      {person.initials}
                    </div>

                    <div className="participant-info">
                      <strong>{person.name}</strong>
                      <span>
                        {person.attended
                          ? 'Presença confirmada'
                          : 'Não compareceu'}
                      </span>
                    </div>

                    {person.attended && (
                      <Check size={17} className="participant-check" />
                    )}
                  </div>
                ))}
              </div>

              <button
                className="secondary-button full-button"
                onClick={() => setActiveTab('people')}
              >
                Gerenciar participantes
              </button>
            </div>
          </section>
        )}

        {/* Participantes */}

        {activeTab === 'people' && (
          <section className="role-panel">
            <div className="panel-header">
              <div>
                <h2>Participantes</h2>
                <p>Gerencie as pessoas que fazem parte deste rolê</p>
              </div>

              <button className="primary-button">
                <UserPlus size={17} />
                Adicionar pessoa
              </button>
            </div>

            <div className="participant-table">
              <div className="table-heading">
                <span>Participante</span>
                <span>Presença</span>
                <span>Valor pago</span>
                <span />
              </div>

              {participants.map((person) => (
                <div className="table-row" key={person.id}>
                  <div className="table-person">
                    <div className="participant-avatar">
                      {person.initials}
                    </div>
                    <strong>{person.name}</strong>
                  </div>

                  <span
                    className={`presence-status ${
                      person.attended ? 'present' : 'absent'
                    }`}
                  >
                    {person.attended ? 'Compareceu' : 'Não compareceu'}
                  </span>

                  <strong>{formatCurrency(person.paid)}</strong>

                  <button className="icon-button" aria-label={`Opções de ${person.name}`}>
                    <MoreHorizontal size={19} />
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Despesas */}

        {activeTab === 'expenses' && (
          <section className="role-panel">
            <div className="panel-header">
              <div>
                <h2>Despesas do rolê</h2>
                <p>
                  Total registrado: {formatCurrency(totalExpenses)}
                </p>
              </div>

              <button
                className="primary-button"
                onClick={() => setShowModal(true)}
              >
                <Plus size={17} />
                Nova despesa
              </button>
            </div>

            <div className="expense-list">
              {expenses.map((expense) => {
                const Icon = getExpenseIcon(expense.category);

                return (
                  <div className="expense-item" key={expense.id}>
                    <div className="expense-icon">
                      <Icon size={19} />
                    </div>

                    <div className="expense-info">
                      <strong>{expense.title}</strong>
                      <span>
                        {expense.category} · Pago por {expense.payer}
                      </span>
                    </div>

                    <strong className="expense-value">
                      {formatCurrency(expense.amount)}
                    </strong>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Divisão */}

        {activeTab === 'split' && (
          <section className="split-content">

            <div className="split-summary">
              <div className="role-panel">
                <span>Total das despesas</span>
                <strong>{formatCurrency(totalExpenses)}</strong>
              </div>

              <div className="role-panel">
                <span>Divisão por pessoa</span>
                <strong>{formatCurrency(average)}</strong>
              </div>
            </div>

            <div className="role-panel">
              <div className="panel-header">
                <div>
                  <h2>Resumo individual</h2>
                  <p>Quanto cada pessoa pagou e quanto deveria pagar</p>
                </div>
              </div>

              <div className="split-list">
                {attendedParticipants.map((person) => {
                  const balance = person.paid - average;

                  return (
                    <div className="split-item" key={person.id}>
                      <div className="table-person">
                        <div className="participant-avatar">
                          {person.initials}
                        </div>

                        <div className="participant-info">
                          <strong>{person.name}</strong>
                          <span>
                            Pagou {formatCurrency(person.paid)}
                          </span>
                        </div>
                      </div>

                      <div className="split-result">
                        <strong
                          className={
                            balance >= 0 ? 'positive' : 'negative'
                          }
                        >
                          {balance >= 0
                            ? `Recebe ${formatCurrency(balance)}`
                            : `Deve ${formatCurrency(Math.abs(balance))}`}
                        </strong>

                        <span>Cota: {formatCurrency(average)}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

      </div>

      {/* Modal de nova despesa */}

      {showModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowModal(false)}
        >
          <div
            className="role-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="modal-header">
              <div>
                <h2>Nova despesa</h2>
                <p>Adicione um gasto ao rolê</p>
              </div>

              <button
                className="icon-button"
                onClick={() => setShowModal(false)}
                aria-label="Fechar"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddExpense}>
              <label htmlFor="expense-title">Nome da despesa</label>
              <input
                id="expense-title"
                type="text"
                placeholder="Ex: Compra de bebidas"
                value={expenseTitle}
                onChange={(event) => setExpenseTitle(event.target.value)}
                required
              />

              <label htmlFor="expense-amount">Valor</label>
              <input
                id="expense-amount"
                type="number"
                min="0.01"
                step="0.01"
                placeholder="0,00"
                value={expenseAmount}
                onChange={(event) => setExpenseAmount(event.target.value)}
                required
              />

              <label htmlFor="expense-payer">Quem pagou?</label>
              <select
                id="expense-payer"
                value={expensePayer}
                onChange={(event) => setExpensePayer(event.target.value)}
              >
                {participants.map((person) => (
                  <option key={person.id} value={person.name}>
                    {person.name}
                  </option>
                ))}
              </select>

              <button type="submit" className="primary-button modal-submit">
                Salvar despesa
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}

import type { LucideIcon } from 'lucide-react';

function SummaryCard({
  label,
  value,
  description,
  icon: Icon,
}: {
  label: string;
  value: string;
  description: string;
  icon: LucideIcon;
}) {
  return (
    <div className="summary-card">
      <div className="summary-card-top">
        <span>{label}</span>
        <div className="summary-icon">
          <Icon size={19} />
        </div>
      </div>

      <strong className="summary-value">{value}</strong>
      <span className="summary-description">{description}</span>
    </div>
  );
}
