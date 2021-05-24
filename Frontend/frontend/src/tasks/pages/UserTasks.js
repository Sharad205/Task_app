import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import TaskList from "../components/TaskList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";

const UserTasks = () => {
	const [loadedTasks, setLoadedTasks] = useState();
	const { isLoading, error, sendRequest, clearError } = useHttpClient();

	const userId = useParams().userId;

	useEffect(() => {
		const fetchTasks = async () => {
			try {
				const responseData = await sendRequest(
					`http://localhost:2000/api/tasks/user/${userId}`
				);
				setLoadedTasks(responseData.tasks);
			} catch (err) {}
		};
		fetchTasks();
	}, [sendRequest, userId]);

	const taskDeletedHandler = (deletedTaskId) => {
		setLoadedTasks((prevTasks) =>
			prevTasks.filter((task) => task.id !== deletedTaskId)
		);
	};

	return (
		<React.Fragment>
			<ErrorModal error={error} onClear={clearError} />
			{isLoading && (
				<div className="center">
					<LoadingSpinner />
				</div>
			)}
			{!isLoading && loadedTasks && (
				<TaskList
					items={loadedTasks}
					onDeleteTask={taskDeletedHandler}
				/>
			)}
		</React.Fragment>
	);
};

export default UserTasks;
