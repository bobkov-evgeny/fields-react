import React, { useState } from "react";
import Workers from "./worker";
import NewUserForm from "./newUserForm";
import * as api from "./FAKE_API/users.api";
import { Spinner } from "react-bootstrap";

const Fields = ({ onExit }) => {
	const [fields, setFields] = useState(api.fetchFieldsData());
	const [selectedFieldData, setWorkers] = useState(0);
	const [newUserForm, setUserFormStatus] = useState(0);
	const [workerLoaderStatus, setWorkerLoaderStatus] = useState(false);
	const [resetLoaderStatus, setResetLoaderStatus] = useState(false);

	const setSelectedField = (fieldNumber) => {
		fields.forEach((field) =>
			field.fieldNumber === fieldNumber
				? (field.isActive = true)
				: (field.isActive = false)
		);
		setWorkers(fields[fieldNumber - 1]);
	};
	const reset = () => {
		setFields(api.fetchFieldsData());
		fields.forEach((field) => (field.isActive = false));
		setWorkers(0);
		setUserFormStatus(0);
	};

	const addUser = (event) => {
		const selectedField = event.target[2].value;
		event.preventDefault();

		const newFieldsData = fields.map((field) => {
			if (field.fieldNumber !== +selectedField) return field;
			field.workers = [
				...field.workers,
				{
					name: event.target[0].value,
					position: event.target[1].value,
					schedule: [["22.01.2021", 8]],
					counter: field.workers.length + 1,
					_id: field.workers.length + 1,
				},
			];
			return field;
		});

		setTimeout(() => {
			setFields(newFieldsData);
			setUserFormStatus(0);
		}, 1000);
	};

	const deleteUser = (worker) => {
		const newFieldsData = fields.map((field) => {
			if (!field.workers.includes(worker)) return field;
			field.workers = field.workers.filter((workerIn) => workerIn !== worker);

			return field;
		});

		setFields(newFieldsData);
	};

	const toggleUserFormActive = () => {
		newUserForm ? setUserFormStatus(0) : setUserFormStatus(1);
	};

	return (
		<>
			<div className="fields-wrapper">
				<div className="nav justify-content-center ">
					{fields.map((field) => (
						<button
							key={field.fieldNumber}
							onClick={() => {
								setWorkerLoaderStatus(true);
								setSelectedField(field.fieldNumber);
								setTimeout(() => setWorkerLoaderStatus(false), 500);
							}}
							type="button"
							className={
								"btn btn-lg m-2 " +
								(field.isActive ? "btn-primary" : "btn-secondary")
							}
						>
							{field.fieldAdress}
						</button>
					))}
					<button
						onClick={() => reset()}
						type="button"
						className="btn btn-warning btn-lg m-2 text-white"
					>
						Сброс
					</button>
				</div>
				<div className="exit-btn">
					<button
						onClick={() => {
							setResetLoaderStatus(true);
							setTimeout(() => {
								onExit(false);
								reset();
							}, 1000);
						}}
						type="button"
						className="btn btn-danger btn-lg m-2 btn-exit"
					>
						{resetLoaderStatus ? (
							<Spinner
								as="span"
								animation="border"
								size="sm"
								role="status"
								aria-hidden="true"
							/>
						) : (
							"Выйти"
						)}
					</button>
				</div>
			</div>

			{workerLoaderStatus ? (
				<div className="spinnerWorker">
					<Spinner animation="border" role="status">
						<span className="visually-hidden">Loading...</span>
					</Spinner>
				</div>
			) : (
				""
			)}
			{selectedFieldData ? (
				<div
					className={
						workerLoaderStatus ? "table_wrapper-loader" : "table_wrapper mt-3"
					}
				>
					<table className="table table-hover">
						<thead className="table">
							<tr>
								<th
									style={{ textAlign: "center", marginRight: "10px" }}
									scope="col"
								>
									#
								</th>
								<th style={{ textAlign: "center" }} scope="col">
									Ф.И.О.
								</th>
								<th style={{ textAlign: "center" }} scope="col">
									Должность
								</th>
								<th style={{ textAlign: "center" }} scope="col">
									График
								</th>
								<th style={{ textAlign: "center" }} scope="col">
									Удалить
								</th>
							</tr>
						</thead>
						<tbody>
							{selectedFieldData.workers.map((worker) => (
								<Workers
									key={worker._id}
									worker={worker}
									counter={worker.counter}
									onDelete={deleteUser}
								/>
							))}
						</tbody>
					</table>

					<NewUserForm
						onClick={toggleUserFormActive}
						isActive={newUserForm}
						onSubmit={addUser}
						selectedField={selectedFieldData.fieldNumber}
					/>
				</div>
			) : (
				""
			)}
		</>
	);
};

export default Fields;
