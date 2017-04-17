/* @flow */

import React from 'react'
import {reduxForm, Field} from 'redux-form'
import {translate} from 'react-i18next'
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
    let {firebase, loginChallenge, loginPayload, status, t} = this.props
    let showProgress = status === 'LOGIN_INIT'
    let challengeFailed = !showProgress && status !== ''
    let doLogin = () => loginChallenge(firebase, loginPayload)
    let enterHandling = (ev) => {
      if (ev.which === 13) { // Enter
        doLogin()
      }
    }
    return (
      <div className={s.login}>
        <Paper className={s.creds} zDepth={3} circle>
          <div style={{'width': '50%'}}>
            <h1>{t('Locks and keys')}</h1>
            <form>
              <Field component={renderTextField} hintText={t('Email')} floatingLabelText={t('Email')} name='email' onKeyDown={enterHandling} />
              <Field type='password' component={renderTextField} hintText={t('Password')} floatingLabelText={t('Password')} name='password' onKeyDown={enterHandling} />
              <Divider />
              <RaisedButton fullWidth onClick={doLogin} disabled={showProgress}>
                {t('Sign in')}
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
  status: React.PropTypes.string,
  t: React.PropTypes.func.isRequired
}

export default reduxForm({
  form: 'login',
  enableReinitialize: true
})(translate('', [{ wait: true }])(Login))
