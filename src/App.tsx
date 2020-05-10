import React from "react";
import BubbleTeaMap from "./pages/BubbleTeaMap";
import shopList from "./pages/ShopList";
import { Router } from "react-router";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import ReactGA from "react-ga";

type Props = any;

export default class App extends React.Component<Props> {
  componentDidMount() {
    const { pathname } = this.props.history.location;
    ReactGA.set({ page: pathname });
    ReactGA.pageview(pathname);
  }

  render() {
    return (
      <div className="App">
        <Router history={this.props.history}>
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
      </div>
    );
  }
}
