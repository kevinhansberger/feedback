import React from 'react';
import WidgetContextProvider from './WidgetContextProvider';

type WidgetContextType = {
  show: boolean;
  setShow: (value: any) => void;
  siteId: string;
}

export const WidgetContext = React.createContext<WidgetContextType>(null);

export function useWidgetContext() {
  return React.useContext(WidgetContext);
}

export default WidgetContextProvider;
