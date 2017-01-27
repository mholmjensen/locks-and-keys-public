/* @flow */

import React from 'react'
import {reduxForm, Field} from 'redux-form'
import {firebase} from 'redux-react-firebase'

import s from './Login.css'

import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import CircularProgress from 'material-ui/CircularProgress'
import Divider from 'material-ui/Divider'

const renderTextField = ({input, label, meta: { touched, error }, ...custom}) => (
  <TextField fullWidth hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />
)
renderTextField.propTypes = {
  label: React.PropTypes.string,
  input: React.PropTypes.object,
  meta: React.PropTypes.object
}

@firebase()
class Login extends React.Component {
  render () {
    let {firebase, loginChallenge, loginPayload, status} = this.props
    let showProgress = status === 'LOGIN_INIT'
    let challengeFailed = !showProgress && status !== ''

    return (
      <div className={s.login}>
        <Paper className={s.creds} zDepth={3} circle>
          <div style={{'width': '50%'}}>
            <h1>Locks and keys</h1>
            <form>
              <Field component={renderTextField} hintText='Email' floatingLabelText='Email' name='email' />
              <Field type='password' component={renderTextField} hintText='Password' floatingLabelText='Password' name='password' />
              <Divider />
              <RaisedButton fullWidth onClick={() => loginChallenge(firebase, loginPayload)} disabled={showProgress}>
                Sign in
              </RaisedButton>
              <div>
                <Divider />
                <div className={s.msg}>
                  { showProgress && <CircularProgress /> }
                  { challengeFailed && status }
                </div>
              </div>
            </form>
          </div>
        </Paper>
      </div>
    )
  }
}
Login.propTypes = {
  firebase: React.PropTypes.object,
  authError: React.PropTypes.object,
  loginChallenge: React.PropTypes.func,
  loginPayload: React.PropTypes.object,
  status: React.PropTypes.string
}

export default reduxForm({
  form: 'login',
  enableReinitialize: true
})(Login)
