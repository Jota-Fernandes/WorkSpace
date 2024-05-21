import {ADD_COMMENT, ADD_POST} from './actionsTypes'

export const addPost = post =>{
    return{
        type: ADD_POST,
        payload: post
    }
}

export const addComment = post =>{
    return{
        type: ADD_COMMENT,
        payload
    }
}