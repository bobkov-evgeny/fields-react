import React, { useState } from "react";
import Workers from "./worker";
import * as api from "./FAKE_API/users.api";

const Fields = () => {
	const fields = api.fetchFieldsData();
	const [selectedFieldData, setWorkers] = useState(0);

	const setSelectedField = (fieldNumber) => {
		setWorkers(api.fetchFieldsData()[fieldNumber - 1]);
	};

	const reset = () => setWorkers(0);

	return (
		<>
			<div className="nav justify-content-center">
				{fields.map((field) => (
					<button
						key={field.fieldNumber}
						onClick={() => setSelectedField(field.fieldNumber)}
						type="button"
						className="btn btn-primary btn-lg m-1"
					>
						{field.fieldAdress}
					</button>
				))}
				<button
					onClick={reset}
					type="button"
					className="btn btn-danger btn-lg m-1"
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
						onClick={reset}
						type="button"
						className="btn btn-success btn-m m-1"
					>
						Добавить пользователя
					</button>
				</div>
			) : (
				""
			)}
		</>
	);
};

export default Fields;
