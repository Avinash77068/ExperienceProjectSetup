import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./Routes";
import { useEffect } from "react";
import { persistor, store } from "../store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

export default function App() {
  const random = Math.random(1);

  useEffect(() => {
    if (random > 0.5) {
      localStorage.setItem("token", "dummy_token");
    }
    if (random < 0.5) {
      localStorage.removeItem("token");
      
    }
  }, []);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}
