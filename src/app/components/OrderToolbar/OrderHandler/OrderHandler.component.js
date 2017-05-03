/* @flow */

import React from 'react'
import {connect} from 'react-redux'
import {firebase, helpers} from 'redux-react-firebase'
import {Field, reduxForm, formValueSelector} from 'redux-form'

import TextField from 'material-ui/TextField'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentSave from 'material-ui/svg-icons/content/save'
import IconButton from 'material-ui/IconButton'
import ReceiptIcon from 'material-ui/svg-icons/action/receipt'
import {Link} from 'react-router'

import s from './OrderHandler.css'
import {translate} from 'react-i18next'

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
let baseicon = {
  width: 36,
  height: 36
}
const styles = {
  iconHandedOut: {
    ...baseicon,
    color: '#ec5400'
  },
  iconReturned: {
    ...baseicon
  },
  medium: {
    width: 72,
    height: 72,
    padding: 18
  }
}
const selector = formValueSelector('toolbar')

@firebase()
@connect(
  (state, props) => ({
    locksAndKeys: helpers.dataToJS(state.firebase, `locksAndKeys`)
  })
)
@connect(
  state => ({
    formPayload: {
      locksHandedOut: selector(state, 'locksHandedOut') || '',
      locksReturned: selector(state, 'locksReturned') || '',
      keysHandedOut: selector(state, 'keysHandedOut') || '',
      keysReturned: selector(state, 'keysReturned') || '',
      notes: selector(state, 'notes') || ''
    }
  })
)
class OrderHandler extends React.Component {
  render () {
    let {order, formPayload, firebase, setSelectedOrder, setInfoMessage, toolbarSaveable, t} = this.props
    let onSave = () => {
      firebase.set('locksAndKeys/' + order._id, formPayload)
      .then((x) => {
        let savedOrder = Object.assign({}, order)
        Object.keys(formPayload).forEach((k) => {
          savedOrder[k] = formPayload[k]
        })
        setSelectedOrder(savedOrder)
        setInfoMessage('#' + order.human_readable_id + ' er gemt')
      })
      .catch((err) => {
        console.warn('failed trying firebase.set(', 'locksAndKeys/' + order._id, formPayload, ')', err)
        setSelectedOrder(order)
        setInfoMessage('#' + order.human_readable_id + ' kunne ikke gemmes')
      })
    }
    return (
      <div>
        <div>
          <form>
            <Field name='locksHandedOut' label={t('Locks handed out')} component={renderTextField} />
            <Field name='locksReturned' label={t('Locks handed in')} component={renderTextField} />
            <Field name='keysHandedOut' label={t('Keys handed out')} component={renderTextField} />
            <Field name='keysReturned' label={t('Keys handed in')} component={renderTextField} />
            <Field name='notes' label={t('Notes')} multiLine component={renderTextField} />
          </form>
        </div>
        <div className={s.actionRow}>
          <Link to={order.human_readable_id + '/handedout'} target='_blank'>
            <IconButton iconStyle={styles.iconHandedOut} style={styles.medium}>
              <ReceiptIcon />
            </IconButton>
          </Link>
          <Link to={order.human_readable_id + '/returned'} target='_blank'>
            <IconButton iconStyle={styles.iconReturned} style={styles.medium}>
              <ReceiptIcon />
            </IconButton>
          </Link>
          <div className={s.flexspacer} />
          <div>
            <FloatingActionButton disabled={!toolbarSaveable} onClick={onSave}>
              <ContentSave />
            </FloatingActionButton>
          </div>
        </div>
      </div>
    )
  }
}
OrderHandler.propTypes = {
  order: React.PropTypes.object.isRequired,
  firebase: React.PropTypes.object,
  formPayload: React.PropTypes.object,
  toolbarSaveable: React.PropTypes.bool.isRequired,
  setSelectedOrder: React.PropTypes.func.isRequired,
  setInfoMessage: React.PropTypes.func.isRequired,
  t: React.PropTypes.func.isRequired
}
// Decorate the form component
export default reduxForm({
  form: 'toolbar', // a unique name for this form
  enableReinitialize: true
})(translate('', [{ wait: true }])(OrderHandler))
