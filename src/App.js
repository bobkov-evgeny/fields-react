import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Fields from "./components/fields";
import Auth from "./components/auth";

function App() {
	const [login, setLogin] = useState(false);

	return (
		<>{login ? <Fields onExit={setLogin} /> : <Auth onSubmit={setLogin} />}</>
	);
}

export default App;
