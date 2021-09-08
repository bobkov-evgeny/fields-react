import React, { useState } from "react";
import { Form, Button, Spinner } from "react-bootstrap";

const Auth = ({ onSubmit }) => {
	const [loaderStatus, setLoaderStatus] = useState(false);
	return (
		<>
			<div className="auth-form">
				<Form
					onSubmit={(e) => {
						e.preventDefault();
						setLoaderStatus(true);
						setTimeout(() => {
							onSubmit(true);
							setLoaderStatus(false);
						}, 1500);
					}}
				>
					<Form.Group className="mb-2" controlId="formBasicEmail">
						<Form.Label className="test">Логин или E-mail</Form.Label>
						<Form.Control
							type="email"
							placeholder="Введите Ваш логин или email"
						/>
					</Form.Group>

					<Form.Group className="mb-3" controlId="formBasicPassword">
						<Form.Label className="test">Пароль</Form.Label>
						<Form.Control type="password" placeholder="Пароль" />
					</Form.Group>
					<Form.Group className="mb-3" controlId="formBasicCheckbox">
						<Form.Check type="checkbox" label="Запомнить меня" />
					</Form.Group>
					<div className="btn-auth-wrapper">
						<Button variant="primary" type="submit">
							<div className="button-auth">
								{loaderStatus ? (
									<Spinner
										as="span"
										animation="border"
										size="sm"
										role="status"
										aria-hidden="true"
									/>
								) : (
									"Вход"
								)}
							</div>
						</Button>
					</div>
				</Form>
			</div>
		</>
	);
};

export default Auth;
