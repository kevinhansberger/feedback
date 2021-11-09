import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { WidgetContextProvider } from '~/context/widget-context';

class Widget {
  siteId: string;
  config: WidgetConfig;

  constructor(siteId: string, config?: WidgetConfig) {
    this.siteId = siteId;
    this.config = {
      placement: 'left',
      ...config,
    };
  }

  render(el: string): void {
    ReactDOM.render(
      <React.StrictMode>
        <WidgetContextProvider
          siteId={this.siteId}
          config={this.config}
        >
          <App />
        </WidgetContextProvider>
      </React.StrictMode>,
      document.getElementById(el)
    );
  }
}

if (typeof window['WIDGET_SITE_ID'] !== 'undefined') {
  const config = window['WIDGET_CONFIG'] || {};
  const $widget = new Widget(window['WIDGET_SITE_ID'], config);
  $widget.render('feedback-widget');
} else {
  throw new Error('Missing WIDGET_SITE_ID');
}
