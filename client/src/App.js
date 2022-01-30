import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Init, AddPost, FetchPosts } from 'redux/post';
import './App.css';

export const App = () => {
	const dispatch = useDispatch();
	const web3 = useSelector((state) => state.post.web3);
	const accounts = useSelector((state) => state.post.accounts);
	const contract = useSelector((state) => state.post.contract);

	useEffect(() => {
		Init(dispatch);
		FetchPosts(dispatch, contract);
	}, [dispatch, contract]);

	const handleAddPost = async () => {
		AddPost(contract, accounts);
	};

	return (
		<div className="app">
			{!web3 ? (
				<div>Loading Web3, accounts, and contract...</div>
			) : (
				<>
					<div>Loaded</div>
					<button onClick={handleAddPost}></button>
				</>
			)}
		</div>
	);
};

export default App;
