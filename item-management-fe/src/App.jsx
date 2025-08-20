
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import AppRoutes from './routes/AppRoutes';
import { store } from './app/store';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen bg-gray-50">
          <Header />
          <main className="flex-1 mt-4">
            <AppRoutes />
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
