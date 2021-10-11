import { createContext, useContext } from 'react';

type SessionType = {
  readonly provider_token: string;
  readonly access_token: string;
  readonly expires_in: number;
  readonly expires_at: number;
  readonly refresh_token: string;
  readonly token_type: string;
  readonly user: object;
}

export const SessionContext = createContext<SessionType | null>(null);

export function useSession() {
  return useContext(SessionContext);
}
