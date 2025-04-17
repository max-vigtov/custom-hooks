import { useEffect, useState } from "react";


const localCache: { [key: string]: any } = {}

interface ErrorState {
	code: number;
	mensaje: string;
}

interface FetchState {
	data: any | null;
	isLoading: boolean;
	hasError: boolean;
	error: ErrorState | null;
}

export const useFetch = ( url: string ) => {

	const [state, setState] = useState<FetchState>({
		data: null, 
		isLoading: true, 
		hasError: false,
		error: null,
	})

	useEffect(() => {
		getFetch();
	}, [ url ]);

	const setLoadingState = () => {
		console.log('Usando caché');
		
		setState({
			data: null,
			isLoading: true,
			hasError: false,
			error: null
		});
	}
	
	const getFetch = async () => {

		if ( localCache[url] ) {
			setState({
				data: localCache[url],
				isLoading: false,
				hasError: false,
				error: null
			});
			return;
		}

		setLoadingState();
		
		const resp = await fetch( url );

		//await new Promise( resolve => setTimeout(resolve, 1500) );

		if ( !resp.ok ) {
			setState({
				data: null,
				isLoading: false,
				hasError: true,
				error: {
					code: resp.status,
					mensaje: resp.statusText
				}
			})
			return;
		}

		const data = await resp.json();
		setState({
			data: data,
			isLoading: false,
			hasError: false,
			error: null
		})		

		// Cache management
		localCache[url] = data;
	}

	return {
		data: state.data,
		isLoading: state.isLoading,
		hasError: state.hasError,
		error: state.error,
	}

}