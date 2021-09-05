import React from "react";
import Schedule from "./schedule";

const Worker = ({ worker }) => {
	return (
		<>
			<tr>
				<th scope="row">{worker.counter}</th>
				<td>{worker.name}</td>
				<td>{worker.position}</td>
				<td>
					<Schedule worker={worker} />
				</td>
			</tr>
		</>
	);
};

export default Worker;
