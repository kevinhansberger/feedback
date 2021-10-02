import React, { useEffect, useState } from 'react';
import WidgetViewer from './WidgetViewer';
import WidgetButton from './WidgetButton';

export default function App() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const $widget = {
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

    // @ts-ignore
    window.$widget = $widget;
  }, []);

  const applyStyles = {
    '--widget-offset-x': '16px',
    '--widget-offset-y': '16px',
    '--widget-button-height': '56px',
    '--widget-button-width': '56px',
  }

  return (
    <>
      {/* @ts-ignore */}
      <div style={applyStyles}>
        <WidgetButton show={show} onShow={() => setShow(!show)} />
        <WidgetViewer show={show} />
      </div>
    </>
  )
}
