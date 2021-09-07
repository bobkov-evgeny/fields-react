import React from "react";
import Schedule from "./schedule";

const Worker = ({ worker, onDelete }) => {
	return (
		<>
			<tr>
				<th scope="row">{worker.counter}</th>
				<td>{worker.name}</td>
				<td>{worker.position}</td>
				<td>
					<Schedule worker={worker} />
				</td>
				<td>
					<button
						onClick={() => onDelete(worker)}
						type="button"
						className="btn btn-danger btn-sm"
					>
						X
					</button>
				</td>
			</tr>
		</>
	);
};

export default Worker;
