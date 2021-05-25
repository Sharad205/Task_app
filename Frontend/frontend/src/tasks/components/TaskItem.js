import React, { useState, useContext } from "react";

import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";
// import Map from "../../shared/components/UIElements/Map";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import "./TaskItem.css";

const TaskItem = (props) => {
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const auth = useContext(AuthContext);
	// const [showMap, setShowMap] = useState(false);
	const [showConfirmModal, setShowConfirmModal] = useState(false);

	// const openMapHandler = () => setShowMap(true);

	// const closeMapHandler = () => setShowMap(false);

	const showDeleteWarningHandler = () => {
		setShowConfirmModal(true);
	};

	const cancelDeleteHandler = () => {
		setShowConfirmModal(false);
	};

	const confirmDeleteHandler = async () => {
		setShowConfirmModal(false);
		try {
			await sendRequest(
				process.env.REACT_APP_BACKEND_URL + `/tasks/${props.id}`,
				"DELETE",
				null,
				{
					Authorization: "Bearer " + auth.token,
				}
			);
			props.onDelete(props.id);
		} catch (err) {}
	};

	return (
		<React.Fragment>
			<ErrorModal error={error} onClear={clearError} />
			{/* <Modal
				show={showMap}
				onCancel={closeMapHandler}
				header={props.address}
				contentClass="task-item__modal-content"
				footerClass="task-item__modal-actions"
				footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
			>
				<div className="map-container">
					<Map center={props.coordinates} zoom={16} />
				</div>
			</Modal> */}
			<Modal
				show={showConfirmModal}
				onCancel={cancelDeleteHandler}
				header="Are you sure?"
				footerClass="task-item__modal-actions"
				footer={
					<React.Fragment>
						<Button inverse onClick={cancelDeleteHandler}>
							CANCEL
						</Button>
						<Button danger onClick={confirmDeleteHandler}>
							DELETE
						</Button>
					</React.Fragment>
				}
			>
				<p>
					Do you want to proceed and delete this task? Please note
					that it can't be undone thereafter.
				</p>
			</Modal>
			<li className="task-item">
				<Card className="task-item__content">
					{isLoading && <LoadingSpinner asOverlay />}
					{/* <div className="task-item__image">
						<img
							src={`http://localhost:2000/${props.image}`}
							alt={props.title}
						/>
					</div> */}
					<div className="task-item__info">
						<h2>{props.title}</h2>
						<h3>Task Description : </h3>
						<p>{props.description}</p>
						<h3>Requirements : </h3>
						<p>{props.requirements}</p>
						<h3>Important Notes : </h3>
						<p>{props.notes}</p>
					</div>
					<div className="task-item__actions">
						{/* <Button inverse onClick={openMapHandler}>
							VIEW ON MAP
						</Button> */}
						{auth.userId === props.creatorId && (
							<Button to={`/tasks/${props.id}`}>EDIT</Button>
						)}

						{auth.userId === props.creatorId && (
							<Button danger onClick={showDeleteWarningHandler}>
								DELETE
							</Button>
						)}
					</div>
				</Card>
			</li>
		</React.Fragment>
	);
};

export default TaskItem;
