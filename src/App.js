import { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/common/Navbar";
import Customer from "./components/Customer";
import Movies from "./components/Movies";
import Rentals from "./components/Rentals";
import NotFound from "./components/NotFound";
import MovieForm from "./components/MovieForm";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import Logout from "./components/Logout";
import auth from "./services/authService";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import ProtectedRoute from "./components/common/protectedRoute";

class App extends Component {
  state = {};
  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    return (
      <div>
        <ToastContainer />
        <Navbar user={user} />
        <main className="container">
          <Switch>
            <Route path="/register" component={RegisterForm} />
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            <ProtectedRoute path={"/movies/:id"} component={MovieForm} />
            <Route
              path="/movies"
              render={(props) => <Movies {...props} user={user} />}
            />
            <Route path="/customers" component={Customer} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/movies" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </div>
    );
  }
}
export default App;
