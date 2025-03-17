import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    posts: [],
}

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        // Action that requires all posts in the payload to store in the state
        setAllPosts: (state, action) => {
            state.posts = action.payload;
        },

        // Action that requires a single post to store / append in the state
        addPost: (state, action) => {
            state.posts.push(action.payload.post);
        },

        // Action that requires an updated post and it's slug in the payload to update in the state
        updatePost: (state, action) => {
            state.posts = state.posts.map((post) => (
                post.$id === action.payload.slug ? action.payload.post : post
            ));
        },

        // Action that requires a post slug to delete individual post from the state
        deletePost: (state, action) => {
            state.posts = state.posts.filter((post) => post.slug !== action.payload.slug);
        },
    }
});

export const { setAllPosts, addPost, deletePost, updatePost } = postSlice.actions;
export default postSlice.reducer;