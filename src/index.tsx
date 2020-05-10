import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import ReactGA from "react-ga";
import App from "./App";

ReactGA.initialize("UA-107359043-2");
const history = createBrowserHistory();
history.listen(({ pathname }) => {
  ReactGA.set({ page: pathname });
  ReactGA.pageview(pathname);
});

ReactDOM.render(
  <React.StrictMode>
    <App history={history} />
  </React.StrictMode>,
  document.getElementById("root")
);
