import { useMemo, useState } from "react";
import type { Participant } from "../types/role";
import ParticipantStatusBadge from "./ParticipantStatusBadge";

type ParticipantsManagerProps = {
  roleId: string;
  participants: Participant[];
  onChange: (participants: Participant[]) => void;
};

function buildInviteLink(roleId: string, participantId?: number) {
  const origin = typeof window !== "undefined" ? window.location.origin : "https://divvy.app";
  const url = new URL(`/roles/${roleId}`, origin);
  url.searchParams.set("convite", "1");
  if (participantId !== undefined) {
    url.searchParams.set("participante", String(participantId));
  }
  return url.toString();
}

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

export default function ParticipantsManager({
  roleId,
  participants,
  onChange,
}: ParticipantsManagerProps) {
  const [guestName, setGuestName] = useState("");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const groupInviteLink = useMemo(() => buildInviteLink(roleId), [roleId]);

  const flashCopied = (key: string) => {
    setCopiedKey(key);
    window.setTimeout(() => setCopiedKey((current) => (current === key ? null : current)), 2000);
  };

  const handleAddGuest = () => {
    const name = guestName.trim();
    if (!name) return;
    onChange([
      ...participants,
      {
        id: Date.now(),
        name,
        status: "Convidado",
        note: "Lançado sem cadastro",
      },
    ]);
    setGuestName("");
  };

  const markLinkSent = async (participantId: number) => {
    const link = buildInviteLink(roleId, participantId);
    await copyText(link);
    onChange(
      participants.map((participant) =>
        participant.id === participantId
          ? { ...participant, status: "Link enviado", note: "Pode entrar depois pelo link" }
          : participant,
      ),
    );
    flashCopied(`participant-${participantId}`);
  };

  const copyParticipantLink = async (participantId: number) => {
    const link = buildInviteLink(roleId, participantId);
    await copyText(link);
    flashCopied(`participant-${participantId}`);
  };

  const markAsGuest = (participantId: number) => {
    onChange(
      participants.map((participant) =>
        participant.id === participantId
          ? { ...participant, status: "Convidado", note: "Lançado sem cadastro" }
          : participant,
      ),
    );
  };

  const removeParticipant = (participantId: number) => {
    onChange(participants.filter((participant) => participant.id !== participantId));
  };

  const copyGroupLink = async () => {
    await copyText(groupInviteLink);
    flashCopied("group");
  };

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-secondary/20 bg-secondary/5 p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-title">Link do grupo</p>
            <p className="mt-1 truncate text-xs text-text" title={groupInviteLink}>
              {groupInviteLink}
            </p>
            <p className="mt-1 text-xs text-text/80">
              Compartilhe para convidar participantes para este rolê.
            </p>
          </div>
          <button
            type="button"
            onClick={copyGroupLink}
            className="inline-flex shrink-0 items-center justify-center rounded-xl bg-secondary px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-secondary/20 transition hover:bg-secondary/90"
          >
            {copiedKey === "group" ? "Link copiado!" : "Copiar link do grupo"}
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-bg p-4">
        <div className="mb-3 flex flex-col gap-2 sm:flex-row">
          <input
            type="text"
            value={guestName}
            onChange={(event) => setGuestName(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") handleAddGuest();
            }}
            placeholder="Adicionar convidado pelo nome"
            className="w-full rounded-xl border border-border bg-card px-4 py-2.5 text-sm text-title outline-none ring-secondary/20 transition placeholder:text-text/50 focus:border-secondary focus:ring-4"
          />
          <button
            type="button"
            onClick={handleAddGuest}
            className="rounded-xl bg-secondary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-secondary/90 sm:whitespace-nowrap"
          >
            Adicionar
          </button>
        </div>

        <ul className="space-y-3">
          {participants.map((participant) => {
            const copied = copiedKey === `participant-${participant.id}`;
            const participantLink = buildInviteLink(roleId, participant.id);
            return (
              <li
                key={participant.id}
                className="flex flex-col gap-3 rounded-xl border border-border bg-card px-4 py-3"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-title">{participant.name}</p>
                    <p className="text-xs text-text">{participant.note}</p>
                    {participant.status !== "Conta ativa" ? (
                      <p className="mt-1 truncate text-[11px] text-text/70" title={participantLink}>
                        Link: {participantLink}
                      </p>
                    ) : null}
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <ParticipantStatusBadge status={participant.status} />
                    {participant.status === "Convidado" ? (
                      <button
                        type="button"
                        onClick={() => markLinkSent(participant.id)}
                        className="rounded-lg border border-secondary/30 bg-secondary/10 px-2.5 py-1 text-xs font-medium text-secondary transition hover:bg-secondary/15"
                      >
                        {copied ? "Link copiado!" : "Enviar link"}
                      </button>
                    ) : null}
                    {participant.status === "Link enviado" ? (
                      <>
                        <button
                          type="button"
                          onClick={() => copyParticipantLink(participant.id)}
                          className="rounded-lg border border-border px-2.5 py-1 text-xs font-medium text-title transition hover:border-secondary/40 hover:text-secondary"
                        >
                          {copied ? "Link copiado!" : "Copiar link"}
                        </button>
                        <button
                          type="button"
                          onClick={() => markAsGuest(participant.id)}
                          className="rounded-lg px-2 py-1 text-xs font-medium text-text/60 transition hover:bg-bg hover:text-title"
                        >
                          Marcar convidado
                        </button>
                      </>
                    ) : null}
                    {participant.status !== "Conta ativa" ? (
                      <button
                        type="button"
                        onClick={() => removeParticipant(participant.id)}
                        className="rounded-lg px-2 py-1 text-xs font-medium text-text/60 transition hover:bg-bg hover:text-accent"
                      >
                        Remover
                      </button>
                    ) : null}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
