import React, { useState } from "react";
import Workers from "./worker";
import * as api from "./FAKE_API/users.api";
import {
	Form,
	Button,
	Col,
	InputGroup,
	FormControl,
	Row,
} from "react-bootstrap";

const Fields = () => {
	const [selectedFieldData, setWorkers] = useState(0);
	const [fields, setFields] = useState(api.fetchFieldsData());
	const [newUserForm, setUserFormStatus] = useState(0);

	const setSelectedField = (fieldNumber) => {
		setWorkers(api.fetchFieldsData()[fieldNumber - 1]);
	};

	const reset = () => {
		setWorkers(0);
		setUserFormStatus(0);
	};

	const toggleUserFormActive = () => {
		newUserForm ? setUserFormStatus(0) : setUserFormStatus(1);
	};

	const renderNewUserForm = () => (
		<Form className="mt-3 " onSubmit={() => toggleUserFormActive()}>
			<Row className="align-items-center">
				<Col xs="auto">
					<Form.Label htmlFor="inlineFormInput" visuallyHidden>
						Name
					</Form.Label>
					<Form.Control
						className="mb-2"
						id="inlineFormInput"
						placeholder="Ф.И.О Пользователя"
					/>
				</Col>
				<Col xs="auto">
					<Form.Label htmlFor="inlineFormInputGroup" visuallyHidden>
						Position
					</Form.Label>
					<InputGroup className="mb-2">
						<FormControl id="inlineFormInputGroup" placeholder="Должность" />
					</InputGroup>
				</Col>
				<Col xs="auto">
					<Form.Select className="mb-2">
						<option>Поле #1</option>
						<option>Поле #2</option>
						<option>Поле #3</option>
					</Form.Select>
				</Col>
				<Col xs="auto">
					<Button type="submit" className="mb-2">
						Подтвердить
					</Button>
				</Col>
			</Row>
		</Form>
	);

	return (
		<>
			<div className="nav justify-content-center">
				{fields.map((field) => (
					<button
						key={field.fieldNumber}
						onClick={() => setSelectedField(field.fieldNumber)}
						type="button"
						className="btn btn-primary btn-lg m-1 mt-4"
					>
						{field.fieldAdress}
					</button>
				))}
				<button
					onClick={reset}
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
							</tr>
						</thead>
						<tbody>
							{selectedFieldData.workers.map((worker) => (
								<Workers
									key={worker._id}
									worker={worker}
									counter={worker.counter}
								/>
							))}
						</tbody>
					</table>
					<button
						onClick={() => toggleUserFormActive()}
						type="button"
						className="btn btn-success btn-m"
					>
						Добавить пользователя
					</button>
					{newUserForm ? renderNewUserForm() : ""}
				</div>
			) : (
				""
			)}
		</>
	);
};

export default Fields;
