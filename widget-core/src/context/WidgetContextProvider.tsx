import { useEffect, useState } from 'react';
import { WidgetContext } from './';

type ProviderType = {
  siteId: string;
  children: any;
}

export default function WidgetContextProvider(props: ProviderType) {
  const { siteId, children } = props;
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
    <WidgetContext.Provider value={{ show, setShow, siteId }}>
      {children}
    </WidgetContext.Provider>
  )
}
