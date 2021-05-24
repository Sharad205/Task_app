import React from "react";

import Card from "../../shared/components/UIElements/Card";
import TaskItem from "./TaskItem";
import Button from "../../shared/components/FormElements/Button";
import "./TaskList.css";

const TaskList = (props) => {
	if (props.items.length === 0) {
		return (
			<div className="task-list center">
				<Card>
					<h2>No tasks found. Maybe create one?</h2>
					<Button to="/tasks/new">Share Task</Button>
				</Card>
			</div>
		);
	}

	return (
		<ul className="task-list">
			{props.items.map((task) => (
				<TaskItem
					key={task.id}
					id={task.id}
					// image={task.image}
					title={task.title}
					description={task.description}
					requirements={task.requirements}
					notes={task.notes}
					creatorId={task.creator}
					onDelete={props.onDeleteTask}
				/>
			))}
		</ul>
	);
};

export default TaskList;
