import React, { useState } from "react";
import Workers from "./worker";
import NewUserForm from "./newUserForm";
import * as api from "./FAKE_API/users.api";

const Fields = () => {
	const [fields, setFields] = useState(api.fetchFieldsData());
	const [selectedFieldData, setWorkers] = useState(0);
	const [newUserForm, setUserFormStatus] = useState(0);

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
		console.log("ok");
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

		setFields(newFieldsData);
		setUserFormStatus(0);
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
			<div className="nav justify-content-center">
				{fields.map((field) => (
					<button
						key={field.fieldNumber}
						onClick={() => setSelectedField(field.fieldNumber)}
						type="button"
						className={
							"btn btn-lg m-1 mt-4 " +
							(field.isActive ? "btn-success" : "btn-primary")
						}
					>
						{field.fieldAdress}
					</button>
				))}
				<button
					onClick={() => reset()}
					type="button"
					className="btn btn-danger btn-lg m-1 mt-4"
				>
					Сброс
				</button>
			</div>

			{selectedFieldData ? (
				<div className="table_wrapper">
					<table className="table table-striped table-hover">
						<thead className="table-primary">
							<tr>
								<th scope="col">#</th>
								<th scope="col">Ф.И.О.</th>
								<th scope="col">Должность</th>
								<th scope="col">График</th>
								<th scope="col"></th>
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
