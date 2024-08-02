import React from 'react';
import RootNavigator from './src/navigation/RootNavigator';
import {Provider} from 'jotai';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
// import {init} from '@amplitude/analytics-react-native';

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

export default App;
