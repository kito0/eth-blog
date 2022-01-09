import React, { useState, useEffect } from 'react';
import PostListContract from './contracts/PostList.json';
import getWeb3 from './getWeb3';

import './App.css';

export const App = () => {
	const [web3, setWeb3] = useState(null);
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		const loadData = async () => {
			try {
				const web3 = await getWeb3();
				const accounts = await web3.eth.getAccounts();
				const networkId = await web3.eth.net.getId();
				``;
				const deployedNetwork = PostListContract.networks[networkId];
				const contract = new web3.eth.Contract(
					PostListContract.abi,
					deployedNetwork && deployedNetwork.address
				);

				setWeb3(web3);
				loadPosts(contract, accounts);
			} catch (error) {
				alert(
					`Failed to load web3, accounts, or contract. Check console for details.`
				);
				console.error(error);
			}
		};

		const loadPosts = async (contract, accounts) => {
			console.log(contract, accounts);

			const size = await contract.methods.postCount().call();

			for (let i = 0; i < size; i++) {
				const post = await contract.methods.posts(i).call();
				console.log(post);
				setPosts([...posts, post]);
			}
		};

		loadData();
	}, []);

	return (
		<div className="App">
			{!web3 ? (
				<div>Loading Web3, accounts, and contract...</div>
			) : (
				<div>Loaded</div>
			)}
		</div>
	);
};

export default App;
