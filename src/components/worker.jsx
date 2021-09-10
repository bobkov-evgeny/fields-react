import React, { useState } from "react";
import Schedule from "./schedule";
import { Spinner } from "react-bootstrap";

const Worker = ({ worker, onDelete }) => {
	const [loaderStatus, setLoaderStatus] = useState(false);
	return (
		<>
			<tr>
				<th style={{ textAlign: "center" }} scope="row">
					{worker.counter}
				</th>
				<td>{worker.name}</td>
				<td style={{ textAlign: "center" }}>{worker.position}</td>
				<td style={{ textAlign: "center" }}>
					<Schedule worker={worker} />
				</td>
				<td style={{ textAlign: "center" }}>
					<button
						onClick={() => {
							setLoaderStatus(true);
							setTimeout(() => {
								onDelete(worker);
								setLoaderStatus(false);
							}, 1000);
						}}
						type="button"
						className="btn btn-danger btn-sm btn-delete"
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
							"X"
						)}
					</button>
				</td>
			</tr>
		</>
	);
};

export default Worker;
