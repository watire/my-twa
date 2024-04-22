import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { TonConnectUIProvider } from '@tonconnect/ui-react';

// this manifest is used temporarily for development purposes
const manifestUrl = 'http://192.168.89.101:5080/tonconnect-manifest.json';

ReactDOM.createRoot(document.getElementById('root')! as HTMLElement).render(
  <TonConnectUIProvider manifestUrl={manifestUrl}>
    <App/>
  </TonConnectUIProvider>
)
