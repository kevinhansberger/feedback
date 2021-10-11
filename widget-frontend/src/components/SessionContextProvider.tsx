import { SessionContext } from '~/context';
import { useEffect, useState } from 'react';
import { supabase } from '~/utils/supabaseClient';

export default function SessionContextProvider({ children }) {
  const [session, setSession] = useState(null);

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  )
}
