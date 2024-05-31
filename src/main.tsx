import App from './App'
import "./index.css"
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import 'regenerator-runtime/runtime'
import { store } from './store'
import { Provider } from 'react-redux'

const container = document.getElementById('root')
if (container) {
	const root = createRoot(container)
	root.render(
		// <React.StrictMode>
		<BrowserRouter basename={''}>
			<Provider store={store}>
			<App />
			</Provider>
		</BrowserRouter>
		// </React.StrictMode>,
	)
}
