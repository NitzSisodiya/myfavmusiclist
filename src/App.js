import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import "./App.css";
import Navbar from "./components/Navbar";
import store from "./redux/store";

let persistor = persistStore(store);

function App() {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Navbar />
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
