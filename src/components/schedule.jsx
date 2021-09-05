import React, { useState } from "react";
import { Modal, Button, Dropdown, ButtonGroup, Badge } from "react-bootstrap";

const Schedule = ({ worker }) => {
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const createScheduleMarkUp = (workerSchedule) => {
		return (
			<>
				{workerSchedule.map((day) => (
					<div key={day[0]} className="scheduleInputWrapper">
						<h3>
							<Badge bg="primary">{day[0]}</Badge>
						</h3>
						<Dropdown as={ButtonGroup}>
							<Button
								variant="primary"
								disabled
								className="btn btn-primary btn-sm"
							>
								Отработано часов:
							</Button>

							<Dropdown.Toggle variant="primary" id="dropdown-basic">
								{day[1]}ч.
							</Dropdown.Toggle>

							<Dropdown.Menu>
								<Dropdown.Item>1</Dropdown.Item>
								<Dropdown.Item href="#/action-2">2</Dropdown.Item>
								<Dropdown.Item href="#/action-3">3</Dropdown.Item>
								<Dropdown.Item href="#/action-4">4</Dropdown.Item>
								<Dropdown.Item href="#/action-5">5</Dropdown.Item>
								<Dropdown.Item href="#/action-6">6</Dropdown.Item>
								<Dropdown.Item href="#/action-7">7</Dropdown.Item>
								<Dropdown.Item href="#/action-8">8</Dropdown.Item>
								<Dropdown.Item href="#/action-9">9</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>
					</div>
				))}
			</>
		);
	};

	return (
		<>
			<Button
				variant="primary"
				onClick={handleShow}
				className="btn btn-primary btn-sm"
			>
				Открыть График
			</Button>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>График работы. {worker.name}</Modal.Title>
				</Modal.Header>
				<Modal.Body>{createScheduleMarkUp(worker.schedule)}</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Закрыть
					</Button>
					<Button variant="primary" onClick={handleClose}>
						Сохранить изменения
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default Schedule;
