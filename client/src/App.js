import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Init, AddPost, FetchPosts } from 'redux/post';
import './App.css';

export const App = () => {
	const contract = useSelector((state) => state.post.contract);
	const loaded = useSelector((state) => state.post.loaded);

	useEffect(() => {
		Init();
	}, []);

	useEffect(() => {
		if (loaded && contract.methods) FetchPosts();
	}, [loaded, contract]);

	const handleAddPost = async () => {
		if (loaded && contract.methods) AddPost();
		else console.log('No create method found');
	};

	return (
		<div className="app">
			{!loaded ? (
				<div>Loading Web3, accounts, and contract...</div>
			) : (
				<>
					<div>Loaded</div>
					<button onClick={() => handleAddPost()}>Add</button>
				</>
			)}
		</div>
	);
};

export default App;
