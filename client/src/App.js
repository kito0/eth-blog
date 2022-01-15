import React, { useState, useEffect } from 'react';
import PostListContract from './contracts/PostList.json';
import getWeb3 from './getWeb3';

import './App.css';

export const App = () => {
	const [web3, setWeb3] = useState(null);
	const [accounts, setAccounts] = useState(null);
	const [networkId, setNetworkId] = useState(null);
	const [deployedNetwork, setDeployedNetwork] = useState(null);
	const [contract, setContract] = useState(null);
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		const loadData = async () => {
			try {
				const web3 = await getWeb3();
				const accounts = await web3.eth.getAccounts();
				const networkId = await web3.eth.net.getId();
				const deployedNetwork = PostListContract.networks[networkId];
				const contract = new web3.eth.Contract(
					PostListContract.abi,
					deployedNetwork && deployedNetwork.address
				);

				setWeb3(web3);
				setAccounts(accounts);
				setNetworkId(networkId);
				setDeployedNetwork(deployedNetwork);
				setContract(contract);
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
			await contract.methods
				.createPost('author', 'body')
				.send({ from: accounts[0] });

			contract.methods
				.getPostCount()
				.call()
				.then((posts) => console.log(posts))
				.catch((err) => console.log('Empty blockchain'));

			contract.methods
				.getPosts()
				.call()
				.then((posts) => console.log(posts))
				.catch((err) => console.log('Empty blockchain'));
		};

		loadData();
	}, []);

	return (
		<div className="app">
			{!web3 ? (
				<div>Loading Web3, accounts, and contract...</div>
			) : (
				<div>Loaded</div>
			)}
		</div>
	);
};

export default App;
