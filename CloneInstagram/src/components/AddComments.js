import React from "react";
import {connect} from 'react-redux'
import {
    View,
    StyleSheet,
    TextInput,
    touchableWithoutFeedback as TWF,
    Alert
} from "react-native"

class AddComment extends Component {
    state = {
        comment: '',
        editMode: false
    }

    handleAddComment = () => {
        this.props.onAddComment({
            postId: this.props.postId,
            comment:{
                nickname: this.props.name,
                comment: this.state.comment
            }
        })

        this.setState({comment: '', editMode: false})
    }

    render(){
        let commnetArea = null
        if (this.state.editMode){
            commentArea = (
                <View style={styles.container}>
                    <TextInput placeholder='Pode comentar'
                        style={styles.input} autoFocus={true}
                        value={this.state.comment}
                        onChangeText={comment => this.setState({commnet})}
                        onSubmitEditing={this.handleAddComment}/>
                        <TWF onPress={() => this.state({edit: false})}>
                            <Icon name='times' size={15} color='#555'/>
                        </TWF>
                </View>
            )
        } else {
            commentArea = (
                <TWF onPress={() => this.setState({editMode: true})}>
                    <View style={styles.container}>
                        <Icon name='comment-o' size={25} color='#555'/>
                        <Text style={styles.caption}>
                            Adicione um comentário...
                        </Text>
                    </View>
                </TWF>
            )
                
        }
        return (
            <View style={{flex: 1}}>
                {commentArea}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10
    },
    caption: {
        marginLeft: 10,
        fontSize: 12,
        color: '#CCC'
    },
    input: {
        width: '90%'
    }
})

const mapStateToProps = ({user}) =>{
    return{
        onAddComment: payload => dispacth(addComment(payload))
    }
}

export default connect(mapStateToProps, mapDispacthToProps)(AddComment)