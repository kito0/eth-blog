import { createSlice } from '@reduxjs/toolkit';

export const postSlice = createSlice({
	name: 'post',
	initialState: {
		web3: null,
		accounts: [],
		networkId: null,
		deployedNetwork: null,
		contract: null,
		posts: [],
		loaded: false,
	},
	reducers: {
		initWeb3: (state, action) => {
			return {
				web3: action.payload.web3,
				accounts: action.payload.accounts,
				networkId: action.payload.networkId,
				deployedNetwork: action.payload.deployedNetwork,
				contract: action.payload.contract,
				loaded: true,
			};
		},
		setLoading: (state) => {
			return {
				...state,
				loaded: false,
			};
		},
		setPosts: (state, action) => {
			return {
				...state,
				posts: action.payload,
			};
		},
		addPost: (state, action) => {
			state.posts.push(action.payload);
		},
	},
});

export const { initWeb3, setLoading, setPosts, addPost } = postSlice.actions;

export default postSlice.reducer;
