const INITIAL_STATE = {
	id: 0,
	email: "",
	role: "",
};

export const userReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case "LOGIN":
			return {
				...state,
				id: action.payload.id,
				email: action.payload.email,
				role: action.payload.role,
			};
		case "LOGOUT":
			return {INITIAL_STATE};
		// case "REGISTER" : 
		// 	return {
		// 		...state,
		// 		email : action.payload.email,
		// 		passsword: action.payload.passsword
		// 	}

		default:
			return state;
	}
};