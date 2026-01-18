import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Layout } from './features/Layout/Layout';
import ExchangePage from './pages/ExchangePage/ExchangePage';
import { ToastProvider } from './features/Toast/Toast';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <Layout>
          <ExchangePage />
        </Layout>
      </ToastProvider>
    </QueryClientProvider>
  );
}

export default App;
