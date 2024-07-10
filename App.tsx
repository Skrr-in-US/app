import React from 'react';
import RootNavigator from './src/navigation/RootNavigator';
import {Provider} from 'jotai';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const queryClient = new QueryClient();

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
