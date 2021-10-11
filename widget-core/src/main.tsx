import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import WidgetContextProvider from '~/context';

class Widget {
  siteId: string;

  constructor(siteId: string) {
    this.siteId = siteId;
  }

  render(el: string): void {
    ReactDOM.render(
      <React.StrictMode>
        <WidgetContextProvider siteId={this.siteId}>
          <App />
        </WidgetContextProvider>
      </React.StrictMode>,
      document.getElementById(el)
    );
  }
}

if (typeof window['WIDGET_SITE_ID'] !== 'undefined') {
  const $widget = new Widget(window['WIDGET_SITE_ID']);
  $widget.render('feedback-widget');
} else {
  throw new Error('Missing WIDGET_SITE_ID');
}
