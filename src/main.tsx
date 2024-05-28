import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { Provider } from 'react-redux'
import store, { persistor } from './components/app/Store.ts'
import { PersistGate } from 'redux-persist/integration/react'
import InternetConnectionServiceProvider from './services/InternetConnectionService.tsx'

const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <InternetConnectionServiceProvider>
          <PersistGate persistor={persistor}>
            <ChakraProvider>
              <App />
            </ChakraProvider>
          </PersistGate>
        </InternetConnectionServiceProvider>
      </Provider>
    </QueryClientProvider >
  </React.StrictMode>,
)
