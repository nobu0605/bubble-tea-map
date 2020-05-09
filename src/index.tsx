import React from "react";
import ReactDOM from "react-dom";
import BubbleTeaMap from "./pages/BubbleTeaMap";
import shopList from "./pages/ShopList";
import { Router } from "react-router";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

ReactDOM.render(
  <React.StrictMode>
    <Router history={history}>
      <Switch>
        <Route exact path="/shopList" component={shopList} />
        <BrowserRouter forceRefresh={true}>
          <Route
            exact
            path="/:companyName?/:shopId?"
            component={BubbleTeaMap}
          />
        </BrowserRouter>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
