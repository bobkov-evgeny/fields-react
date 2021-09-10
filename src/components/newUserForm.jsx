import React, { useState } from "react";
import {
	Form,
	Button,
	InputGroup,
	FormControl,
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
			<div className="user_form-wrapper">
				<div className="user_form-inputs">
					<Form.Control
						className=" m-2"
						id="inlineFormInput"
						placeholder="Ф.И.О Пользователя"
					/>

					<InputGroup className=" m-2">
						<FormControl id="inlineFormInputGroup" placeholder="Должность" />
					</InputGroup>

					<Form.Select className=" m-2" id="inlineFormSelect">
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
				</div>
				<div className="user_form-submit-btn">
					<Button
						onClick={() => onClick()}
						className="btn-danger btn-sm m-2 user_form-btn"
					>
						Отменить
					</Button>
					<Button type="submit" className="m-2 btn-sm user_form-btn">
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
				</div>
			</div>
		</Form>
	);

	return (
		<>
			<Button
				onClick={() => onClick()}
				type="button"
				className="btn-m btn-success "
			>
				Добавить пользователя
			</Button>
			{isActive ? renderNewUserForm() : ""}
		</>
	);
};

export default NewUserForm;
