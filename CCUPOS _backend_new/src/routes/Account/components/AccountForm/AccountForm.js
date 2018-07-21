import React, { PropTypes } from 'react'
import { Field, reduxForm } from 'redux-form'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'components/TextField'
//import { ACCOUNT_FORM_NAME } from 'constants'
import ProviderDataForm from '../ProviderDataForm'
import classes from './AccountForm.scss'

export const AccountForm = ({ account, handleSubmit, submitting }) =>
  <form className={classes.container} onSubmit={handleSubmit}>
    <h4>基本資料</h4>
    <Field name="displayName" component={TextField}  label="名稱" />
    <Field name="email" component={TextField}  disabled={true} label="電子郵件" />
    <Field name="cellphone" component={TextField}  disabled={true} label="手機號碼" />

    {!!account &&
      !!account.providerData &&
      <div className={classes.container}>
        <h4>連結帳戶</h4>
        <ProviderDataForm providerData={account.providerData} />
      </div>}
    <RaisedButton
      primary
      label="更新資料"
      type="submit"
      className={classes.submit}
    />
  </form>

AccountForm.propTypes = {
  account: PropTypes.object,
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool
}

export default reduxForm({
  form: 'account'
})(AccountForm)
