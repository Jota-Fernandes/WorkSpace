import {
    SET_POST,
    ADD_COMMENT,
    CREATING_POST,
    POST_CREATED
} from './actionsTypes'
import axios from 'axios'

export const addPost = post =>{
    return dispatch =>{
        dispatch(creatingPost())
      /*   axios({
            url:'' ,
            baseURL: '',
            method: 'post',
            data:
        })  */
        axios.post('/post.json', {...post})
            .catch(err=> console.log(err))
            .then(res=> console.log(res.data))
    }
}

export const addComment = payload =>{
    return{
        type: ADD_COMMENT,
        payload
    }
}

export const fetchPosts = ()=>{
    return dispatch =>{
        axios.get('/posts.json')
            .catch(err => console.log(err))
            .then(res =>{
                const rawPosts = res.data
                const posts = []
                for(let key in rawPost){

                }
            })
    }
}

export const creatingPost = () => {
    return {
        type: CREATING_POST
    }
}

