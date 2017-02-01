
import {connect} from 'react-redux'
import Login from './Login.component'
import {loginChallenge} from '../../actions/login'
import {formValueSelector} from 'redux-form'

const selector = formValueSelector('login')
const mapStateToProps = (state, ownProps) => {
  let loginPayload = {
    email: selector(state, 'email') || '',
    password: selector(state, 'password') || ''
  }

  return {
    loginPayload,
    status: state.login.status,
    initialValues: {
      email: '',
      password: ''
    }
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    'loginChallenge': (firebase, credentials) => {
      dispatch(loginChallenge(firebase, credentials))
    }
  }
}

const LoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)

export default LoginContainer
