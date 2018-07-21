import React, { PropTypes } from 'react'
import { Field, reduxForm } from 'redux-form'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'components/TextField'
//import { ACCOUNT_FORM_NAME } from 'constants'
import ProviderDataForm from '../ProviderDataForm'
import classes from './BodyForm.scss'
import { translate } from 'react-i18next'

export const BodyForm = ({ account, handleSubmit, submitting, t }) =>
  <form className={classes.container} onSubmit={handleSubmit}>
    <h4>健康資料</h4>
    <Field name="age" component={TextField} label={t('age')} />
    <Field name="height" component={TextField} label={t('height')} />
    <Field name="weight" component={TextField} label={t('weight')} />
    <Field name="career" component={TextField} label={t('career')} />

    <RaisedButton
      primary
      label={t('update')}
      type="submit"
      className={classes.submit}
    />
  </form>

BodyForm.propTypes = {
  account: PropTypes.object,
  handleSubmit: PropTypes.func,
  t: PropTypes.func,
  submitting: PropTypes.bool
}

export default translate()(reduxForm({
  form: 'account'
})(BodyForm))
