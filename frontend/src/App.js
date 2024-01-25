import Header from "./components/Header";
import AppRoutes from "./AppRoutes"
import Loading from './components/Loading/Loading';
import { useLoading } from './hooks/useLoading';
import { setLoadingInterceptor } from './interceptors/loadingInterceptor';
import { useEffect } from 'react';
function App() {
  const { showLoading, hideLoading } = useLoading();

  useEffect(() => {
    setLoadingInterceptor({ showLoading, hideLoading });
  }, []);
  return (
   <>
   <Loading />
  <Header/>
  <AppRoutes/>
   </>
  );
}

export default App;
