import configureFakeBackend from './common/api/fake-backend'
import { AuthProvider, ThemeProvider } from './common/context'
import AllRoutes from './routes/Routes'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



import './assets/scss/app.scss'
import './assets/scss/icons.scss'

configureFakeBackend()

function App() {
	return (
		<ThemeProvider>
			<AuthProvider>
			<ToastContainer />
				<AllRoutes />
			</AuthProvider>
		</ThemeProvider>
	)
}

export default App
