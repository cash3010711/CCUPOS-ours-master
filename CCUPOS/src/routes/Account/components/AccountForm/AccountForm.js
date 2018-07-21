import React, { PropTypes } from 'react'
import { Field, reduxForm } from 'redux-form'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'components/TextField'
//import { ACCOUNT_FORM_NAME } from 'constants'
import ProviderDataForm from '../ProviderDataForm'
import classes from './AccountForm.scss'
import { translate } from 'react-i18next'

export const AccountForm = ({ account, handleSubmit, submitting, t}) =>
  <form className={classes.container} onSubmit={handleSubmit}>
    <h4>基本資料</h4>
    <Field name="displayName" component={TextField}  label={t('name')} />
    <Field name="email" component={TextField}  disabled={true} label={t('email')} />
    <Field name="cellphone" component={TextField}  disabled={true} label={t('cellphone')} />

    {!!account &&
      !!account.providerData &&
      <div className={classes.container}>
        <h4>{t('linkedaccount')}</h4>
        <ProviderDataForm providerData={account.providerData} />
      </div>}
    <RaisedButton
      primary
      label={t('update')}
      type="submit"
      className={classes.submit}
    />
  </form>

AccountForm.propTypes = {
  account: PropTypes.object,
  handleSubmit: PropTypes.func,
  t: PropTypes.func,
  submitting: PropTypes.bool
}

export default translate()(reduxForm({
  form: 'account'
})(AccountForm))
