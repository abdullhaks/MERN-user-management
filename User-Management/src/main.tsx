
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { persistor, store} from './Redux/Store.ts'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>

    <App />

    </PersistGate>

  </Provider >,
)
