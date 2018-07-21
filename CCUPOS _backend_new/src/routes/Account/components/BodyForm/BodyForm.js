import React, { PropTypes } from 'react'
import { Field, reduxForm } from 'redux-form'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'components/TextField'
//import { ACCOUNT_FORM_NAME } from 'constants'
import ProviderDataForm from '../ProviderDataForm'
import classes from './BodyForm.scss'

export const BodyForm = ({ account, handleSubmit, submitting }) =>
  <form className={classes.container} onSubmit={handleSubmit}>
    <h4>健康資料</h4>
    <Field name="age" component={TextField} label="年齡" />
    <Field name="height" component={TextField} label="身高" />
    <Field name="weight" component={TextField} label="體重" />
    <Field name="career" component={TextField} label="職業" />

    <RaisedButton
      primary
      label="更新資料"
      type="submit"
      className={classes.submit}
    />
  </form>

BodyForm.propTypes = {
  account: PropTypes.object,
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool
}

export default reduxForm({
  form: 'account'
})(BodyForm)
