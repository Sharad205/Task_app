import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import { AuthContext } from "../../context/auth-context";
import "./NavLinks.css";

const NavLinks = (props) => {
	const auth = useContext(AuthContext);

	return (
		<ul className="nav-links">
			<li>
				<NavLink to="/" exact>
					ALL USERS
				</NavLink>
			</li>
			{auth.isLoggedIn && (
				<li>
					<NavLink to={`/${auth.userId}/tasks`}>MY TASKS</NavLink>
				</li>
			)}
			{auth.isLoggedIn && (
				<li>
					<NavLink to="/tasks/new">ADD TASK</NavLink>
				</li>
			)}
			{!auth.isLoggedIn && (
				<li>
					<NavLink to="/auth">AUTHENTICATE</NavLink>
				</li>
			)}
			{auth.isLoggedIn && (
				<li>
					<button onClick={auth.logout}>LOGOUT</button>
				</li>
			)}
		</ul>
	);
};

export default NavLinks;
