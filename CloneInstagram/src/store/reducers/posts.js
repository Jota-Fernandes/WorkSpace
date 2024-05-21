 const reducer = (state = initialState,action) =>{
    switch (action.type){
        case ADD_POST: 
            return {
                ...state,
                posts: state.post.concat({
                })
            }
        case ADD_COMMENT: 
            return{
                ...state,
                posts: state.posts.map()
            }
            default:
                return state
    }
 }