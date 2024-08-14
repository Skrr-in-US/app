import React from 'react';
import RootNavigator from './src/navigation/RootNavigator';
import {Provider} from 'jotai';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
// import {init} from '@amplitude/analytics-react-native';
import * as Sentry from '@sentry/react-native';
import * as amplitude from '@amplitude/analytics-react-native';

Sentry.init({
  dsn: 'https://82bad5d0ffa8b2211ce34095ec12182a@o4506432587563008.ingest.us.sentry.io/4507733666496512',
  // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
  // We recommend adjusting this value in production.
  tracesSampleRate: 1.0,
  _experiments: {
    // profilesSampleRate is relative to tracesSampleRate.
    // Here, we'll capture profiles for 100% of transactions.
    profilesSampleRate: 1.0,
  },
});

amplitude.init('7c57d1b30170798bece7bacee382023a');

// const API_KEY = '';
const queryClient = new QueryClient();

// Option 1, initialize with API_KEY only
// init(API_KEY);

// // Option 2, initialize including user ID if it's already known
// init(API_KEY, 'user@amplitude.com');

// // Option 3, initialize including configuration
// init(API_KEY, 'user@amplitude.com', {
//   disableCookies: true, // Disables the use of browser cookies
// });

function App(): React.JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider>
        <RootNavigator />
      </Provider>
    </QueryClientProvider>
  );
}

export default Sentry.wrap(App);
