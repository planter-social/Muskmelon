import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Nav from "@components/Nav";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import Post from "./pages/Post";
import Plant from "./pages/Plant";
import Plants from "./pages/Plants";
import Error from "./pages/Error";
import About from "./pages/About";
import { UserProvider } from "@contexts/UserContext";
import ProtectedRoutes from "./protected-routes/ProtectedRoutes";
import { AuthProvider } from "@contexts/AuthContext";
import PublicProfile from "./pages/Profile/PublicProfile";
import Search from "./pages/Search";
import { ReactQueryDevtools } from "react-query/devtools";
import { QueryClient, QueryClientProvider } from "react-query";
import Home from "./pages/Home";
// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <UserProvider>
          <Router>
            <div className="App">
              <Nav />
              <div className="content">
                <Switch>
                  <Route exact path="/post/:title/:id" component={Post} />
                  <Route exact path="/plants" component={Plants} />
                  <Route exact path="/plants/:sciname" component={Plant} />
                  <Route exact path="/" component={Home} />
                  <Route exact path="/hot" component={Home} />
                  <Route exact path="/new" component={Home} />
                  <Route exact path="/about" component={About} />
                  <Route
                    exact
                    path="/profile/public/:username"
                    component={PublicProfile}
                  />
                  `
                  <ProtectedRoutes
                    exact
                    path="/profile/:username"
                    component={Profile}
                    template={"accessibleAfterLogin"}
                  />
                  <ProtectedRoutes
                    exact
                    path="/login"
                    component={Login}
                    template={"accessibleBeforeLogin"}
                  />
                  <ProtectedRoutes
                    exact
                    path="/resetpassword/:username"
                    component={ResetPassword}
                    template={"accessibleBeforeLogin"}
                  />
                  <ProtectedRoutes
                    exact
                    path="/resetpassword/:username/:token"
                    component={ResetPassword}
                    template={"accessibleBeforeLogin"}
                  />
                  <ProtectedRoutes
                    path="/signup"
                    exact
                    component={SignUp}
                    template={"accessibleBeforeLogin"}
                  />
                  <Route path="/search" component={Search} />
                  <Route
                    path="*"
                    component={() => <Error msg={"404 NOT FOUND"} />}
                  />
                </Switch>
              </div>
            </div>
          </Router>
        </UserProvider>
      </AuthProvider>
      {process.env.NODE_ENV !== "production" && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
}

export default App;
