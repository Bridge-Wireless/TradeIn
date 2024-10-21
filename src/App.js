// import './App.css';
import { BrowserRouter } from "react-router-dom";
import AppRoutes from './Routes/Routes';
import { initializeLocalStorage } from './components/localStorageBootstrap'; // Import the bootstrap function
initializeLocalStorage();
function App() {
  return (
          <>
              <BrowserRouter>
                <AppRoutes />
              </BrowserRouter>
          </>
    
  );
}

export default App;
