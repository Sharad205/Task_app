import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
// import ImageUpload from "../../shared/components/FormElements/ImageUpload";
import {
	VALIDATOR_REQUIRE,
	VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import "./TaskForm.css";

const NewTask = () => {
	const auth = useContext(AuthContext);
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const [formState, inputHandler] = useForm(
		{
			title: {
				value: "",
				isValid: false,
			},
			description: {
				value: "",
				isValid: false,
			},
			notes: {
				value: "",
				isValid: false,
			},
			requirements: {
				value: null,
				isValid: false,
			},
		},
		false
	);

	const history = useHistory();

	const taskSubmitHandler = async (event) => {
		event.preventDefault();
		try {
			const formData = new FormData();
			formData.append("title", formState.inputs.title.value);
			formData.append("description", formState.inputs.description.value);
			formData.append("notes", formState.inputs.notes.value);
			formData.append(
				"requirements",
				formState.inputs.requirements.value
			);
			await sendRequest(
				"http://localhost:2000/api/tasks",
				"POST",
				formData,
				{
					Authorization: "Bearer " + auth.token,
				}
			);
			history.push("/");
		} catch (err) {}
	};

	return (
		<React.Fragment>
			<ErrorModal error={error} onClear={clearError} />
			<form className="task-form" onSubmit={taskSubmitHandler}>
				{isLoading && <LoadingSpinner asOverlay />}
				<Input
					id="title"
					element="input"
					type="text"
					label="Title"
					validators={[VALIDATOR_REQUIRE()]}
					errorText="Please enter a valid title."
					onInput={inputHandler}
				/>
				<Input
					id="description"
					element="textarea"
					label="Task Description"
					validators={[VALIDATOR_MINLENGTH(5)]}
					errorText="Please enter a valid description (at least 5 characters)."
					onInput={inputHandler}
				/>
				<Input
					id="requirements"
					element="textarea"
					label="Requirements"
					validators={[VALIDATOR_MINLENGTH(5)]}
					errorText="Please enter a valid requirements (at least 5 characters)."
					onInput={inputHandler}
				/>
				<Input
					id="notes"
					element="input"
					label="Important Notes"
					validators={[VALIDATOR_REQUIRE()]}
					errorText="Please enter a valid notes."
					onInput={inputHandler}
				/>
				{/* <ImageUpload
					id="image"
					onInput={inputHandler}
					errorText="Please provide an image."
				/> */}
				<Button type="submit" disabled={!formState.isValid}>
					ADD Task
				</Button>
			</form>
		</React.Fragment>
	);
};

export default NewTask;
