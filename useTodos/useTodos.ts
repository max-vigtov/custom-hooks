import { useEffect, useReducer } from "react";
import { Todo, todoReducer } from "./todoReducer";

const init = () => {
	return JSON.parse(localStorage.getItem('todos') || '[]')
}

export const useTodos = () => {

	const [todos, dispatch] = useReducer( todoReducer, [], init);

	useEffect(() => {
		localStorage.setItem('todos', JSON.stringify(todos));
	  }, [ todos ])
  
	  const handleNewTodo = ( todo: Todo ) => {
		const action = {
			type: '[TODO] Add Todo',
			payload: todo
		}
  
		dispatch( action );
	  }
  
	  const handleDeleteTodo = ( id: number ) => {
		dispatch({
			type: '[TODO] Remove Todo',
			payload: id
		});
	  }
  
	  const handleToggleTodo = ( id: number ) => { 
		dispatch({
			type: '[TODO] Toggle Todo',
			payload: id
		});
	  }

	  const pendingTodosCount = todos.filter(todo => !todo.done).length 

	  const todosCount = todos.length

	return {
		todos,
		todosCount,
		pendingTodosCount,
		handleNewTodo,
		handleDeleteTodo,
		handleToggleTodo,
	}
}