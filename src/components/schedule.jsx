import React, { useState } from "react";
import { Modal, Form, Button, Table, Spinner } from "react-bootstrap";

const Schedule = ({ worker }) => {
	const [show, setShow] = useState(false);
	const [loaderStatus, setLoaderStatus] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => {
		console.log("yes");
		setLoaderStatus(true);
		setTimeout(() => {
			setShow(true);
			setLoaderStatus(false);
		}, 700);
	};

	const createScheduleMarkUp = (workerSchedule) => {
		return (
			<>
				{workerSchedule.map((day) => (
					<tr key={day[0]}>
						<td className="text-center align-middle">{day[0]}</td>
						<td className="text-center align-middle">{worker.name}</td>
						<td className="text-center align-middle">
							<Form.Group
								style={{ justifyContent: `center` }}
								className="d-flex"
								//controlId="formPlaintextEmail"
							>
								<Form.Control
									size="sm"
									style={{ width: "40px" }}
									type="text"
									placeholder={day[1]}
									key={day[0]}
								/>

								<Form.Label className="m-1">ч.</Form.Label>
							</Form.Group>
						</td>
					</tr>
				))}
			</>
		);
	};

	return (
		<>
			<Button
				variant="primary"
				onClick={() => handleShow()}
				className={"btn btn-primary btn-sm schedule-buton"}
			>
				{loaderStatus ? (
					<Spinner
						as="span"
						animation="border"
						size="sm"
						role="status"
						aria-hidden="true"
					/>
				) : (
					"Открыть"
				)}
			</Button>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>График работы. {worker.name}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Table striped bordered hover size="sm">
						<thead>
							<tr align="center">
								<th>Дата</th>
								<th>Ф.И.О.</th>
								<th>Смена</th>
							</tr>
						</thead>
						<tbody>{createScheduleMarkUp(worker.schedule)}</tbody>
					</Table>
				</Modal.Body>
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
