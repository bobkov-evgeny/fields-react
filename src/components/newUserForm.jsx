import React, { useState } from "react";
import {
	Form,
	Button,
	Col,
	InputGroup,
	FormControl,
	Row,
	Spinner,
} from "react-bootstrap";

const NewUserForm = ({ onClick, onSubmit, isActive, selectedField }) => {
	const [loaderStatus, setLoaderStatus] = useState(false);

	const renderNewUserForm = () => (
		<Form
			className="mt-3"
			onSubmit={(event) => {
				setLoaderStatus(true);

				onSubmit(event, selectedField);
				setTimeout(() => setLoaderStatus(false), 1000);
			}}
		>
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
					<Form.Select className="mb-2" id="inlineFormSelect">
						<option
							value="
                        1"
						>
							Поле №1
						</option>
						<option
							value="
                        2"
						>
							Поле №2
						</option>
						<option
							value="
                        3"
						>
							Поле №3
						</option>
					</Form.Select>
				</Col>
				<Col xs="auto">
					<Button type="submit" className="mb-2">
						{loaderStatus ? (
							<Spinner
								as="span"
								animation="border"
								size="sm"
								role="status"
								aria-hidden="true"
							/>
						) : (
							"Подтвердить"
						)}
					</Button>
				</Col>
			</Row>
		</Form>
	);

	return (
		<>
			<button
				onClick={() => onClick()}
				type="button"
				className="btn btn-success btn-m"
			>
				Добавить пользователя
			</button>
			{isActive ? renderNewUserForm() : ""}
		</>
	);
};

export default NewUserForm;
