export interface Todo {
	id: number;
	description: string;
	done: boolean;
}

type TodoState = Todo[];

interface TodoAction {
	type: string;
	payload: any;
}

export const todoReducer = (initialState: TodoState, action: TodoAction): TodoState => {
	switch (action.type) {
		case '[TODO] Add Todo':
			return [...initialState, action.payload!];
		
		case '[TODO] Remove Todo':
			return initialState.filter( todo => todo.id !== action!.payload);		

		case '[TODO] Toggle Todo':
			return initialState.map( todo => {
				
				if ( todo.id === action!.payload) {
					return {
						...todo,
						done: !todo.done
					}
				}

				return todo;
			});
		
		default:
			return initialState;
	}
}