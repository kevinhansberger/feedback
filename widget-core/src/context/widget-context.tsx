import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';

export type WidgetContextProps = {
  show: boolean;
  setShow: (value: any) => void;
  siteId: string;
  config: WidgetConfig;
}

export const WidgetContext = createContext<WidgetContextProps>(null);

export function useWidgetContext() {
  return useContext(WidgetContext);
}

export type WidgetProviderProps = {
  siteId: string;
  config?: WidgetConfig;
  children: ReactNode;
}

export function WidgetContextProvider(props: WidgetProviderProps) {
  const { siteId, config, children } = props;
  const [show, setShow] = useState(false);

  useEffect(() => {
    window['$widget'] = {
      open() {
        setShow(true);
      },
      close() {
        setShow(false);
      },
      toggle() {
        setShow(s => !s);
      }
    };
  }, []);

  return (
    <WidgetContext.Provider value={{ show, setShow, siteId, config }}>
      {children}
    </WidgetContext.Provider>
  )
}
