import React from "react";
import ReactDOM from "react-dom";
import "./styles/globals.css";
import "./styles/loading.css";
import "./styles/table.css";
import "./styles/add-image.css";
import "./styles/calendar.css";

import "@reach/dialog/styles.css";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store } from "./store";
import { persistStore } from "redux-persist";

const persistor = persistStore(store);

// @ts-ignore
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
