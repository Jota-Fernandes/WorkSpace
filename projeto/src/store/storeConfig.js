// storeConfig.js
import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from './reducers/user';
import postsReducer from './reducers/posts';

const rootReducer = combineReducers({
    user: userReducer,
    posts: postsReducer,
});

const storeConfig = () => {
    return configureStore({
        reducer: rootReducer
    });
};

export default storeConfig;
