import { setPosts, setLoading, addPost, initWeb3 } from './postSlice';
import PostListContract from 'contracts/PostList.json';
import getWeb3 from 'getWeb3';
import store from './store';

export const Init = async () => {
	store.dispatch(setLoading());

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

	store.dispatch(initWeb3(res));
};

export const AddPost = async () => {
	const { contract, accounts } = store.getState().post;

	const post = await contract.methods
		.createPost('author', 'body')
		.send({ from: accounts[0] });

	store.dispatch(addPost(post));
};

export const FetchPosts = async () => {
	const { contract } = store.getState().post;

	const posts = await contract.methods.getPosts().call();
	store.dispatch(setPosts(posts));
};
