import React, { Suspense } from "react";
import {
	BrowserRouter as Router,
	Route,
	Redirect,
	Switch,
} from "react-router-dom";

// import Users from "./user/pages/Users";
// import NewTask from "./tasks/pages/NewTask";
// import UserTasks from "./tasks/pages/UserTasks";
// import UpdateTask from "./tasks/pages/UpdateTask";
// import Auth from "./user/pages/Auth";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import LoadingSpinner from "./shared/components/UIElements/LoadingSpinner";
import { AuthContext } from "./shared/context/auth-context";
import { useAuth } from "./shared/hooks/auth-hook";

const Users = React.lazy(() => import("./user/pages/Users"));
const NewTask = React.lazy(() => import("./tasks/pages/NewTask"));
const UserTasks = React.lazy(() => import("./tasks/pages/UserTasks"));
const UpdateTask = React.lazy(() => import("./tasks/pages/UpdateTask"));
const Auth = React.lazy(() => import("./user/pages/Auth"));

const App = () => {
	const { token, login, logout, userId } = useAuth();

	let routes;

	if (token) {
		routes = (
			<Switch>
				<Route path="/" exact>
					<Users />
				</Route>
				<Route path="/:userId/tasks" exact>
					<UserTasks />
				</Route>
				<Route path="/tasks/new" exact>
					<NewTask />
				</Route>
				<Route path="/tasks/:taskId">
					<UpdateTask />
				</Route>
				<Redirect to="/" />
			</Switch>
		);
	} else {
		routes = (
			<Switch>
				<Route path="/" exact>
					<Users />
				</Route>
				<Route path="/:userId/tasks" exact>
					<UserTasks />
				</Route>
				<Route path="/auth">
					<Auth />
				</Route>
				<Redirect to="/auth" />
			</Switch>
		);
	}

	return (
		<AuthContext.Provider
			value={{
				isLoggedIn: !!token,
				token: token,
				userId: userId,
				login: login,
				logout: logout,
			}}
		>
			<Router>
				<MainNavigation />
				<main>
					<Suspense
						fallback={
							<div className="center">
								<LoadingSpinner />
							</div>
						}
					>
						{routes}
					</Suspense>
				</main>
			</Router>
		</AuthContext.Provider>
	);
};

export default App;
