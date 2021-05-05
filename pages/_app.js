import Navbar from '../components/Navbar'
import { AuthProvider } from '../stores/authContext'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Navbar />
      <Component {...pageProps} />
    </AuthProvider>
  )
}

export default MyApp
