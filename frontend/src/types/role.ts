export type ParticipantStatus = "Conta ativa" | "Convidado" | "Link enviado";

export type Participant = {
  id: number;
  name: string;
  status: ParticipantStatus;
  note: string;
};

export type RoleSummary = {
  id: string;
  name: string;
  people: number;
  total: string;
  expenses: string[];
  settlement: string;
  participants: Participant[];
};
