import { Provider } from "react-redux";
import "./App.css";
import Navbar from "./components/Navbar";
import store from "./redux/store";

function App() {
  return (
    <>
      <Provider store={store}>
        <Navbar />
      </Provider>
    </>
  );
}

export default App;
