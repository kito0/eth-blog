import { setPosts, addPost, initWeb3 } from './postSlice';
import PostListContract from 'contracts/PostList.json';
import getWeb3 from 'getWeb3';

export const Init = async (dispatch) => {
	const web3 = await getWeb3();
	const accounts = await web3.eth.getAccounts();
	const networkId = await web3.eth.net.getId();
	const deployedNetwork = PostListContract.networks[networkId];
	const contract = new web3.eth.Contract(
		PostListContract.abi,
		deployedNetwork && deployedNetwork.address
	);

	const res = {
		web3: web3,
		accounts: accounts,
		networkId: networkId,
		deployedNetwork: deployedNetwork,
		contract: contract,
	};
	dispatch(initWeb3(res));
};

export const AddPost = async (dispatch, contract, accounts) => {
	const post = await contract.methods
		.createPost('author', 'body')
		.send({ from: accounts[0] });
	dispatch(addPost(post));
};

export const FetchPosts = async (dispatch, contract) => {
	const posts = await contract.methods
		.getPosts()
		.call()
		.then((posts) => console.log(posts));
	dispatch(setPosts(posts));
};
