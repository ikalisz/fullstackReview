import React, {Component} from 'react'
import {connect} from 'react-redux'

class Login extends Component {
    render() {
        return (
            <form>
                <h3>Username</h3>
                <input type="text" placeholder="Username" />
                <h3>Password</h3>
                <input type="password" placeholder="Password" />
                <button>Submit</button>
            </form>
        )
    }
}
function mapStateToProps (state) {
    return state.user
}
export default connect(mapStateToProps)(Login)