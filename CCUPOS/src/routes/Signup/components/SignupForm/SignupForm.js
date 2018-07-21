import React, { PropTypes } from 'react'
import RaisedButton from 'material-ui/RaisedButton'

import classes from './SignupForm.scss'
const buttonStyle = { width: '100%' }

 // redux-form
import { Field, reduxForm } from 'redux-form'
import TextField from '../../../../components/TextField'
import { translate } from 'react-i18next'

const validate = values => {
  const errors = {}
  if (!values.email) errors.email = 'Required'
  if (!values.password) errors.password = 'Required'
  return errors
}

const SignupForm = ({ handleSubmit, submitting, t }) => {
  return (
    <form className={classes['container']} onSubmit={handleSubmit}>
      <div>
        <Field name='username' component={TextField} label={t('username')} />
      </div>
      <div>
        <Field name='email' component={TextField} label={t('email')} />
      </div>
      <div>
        <Field name='password' component={TextField} label={t('password')} type='password' />
      </div>
      <div className={classes['submit']}>
        <RaisedButton
          label={t('register')}
          primary
          type='submit'
          disabled={submitting}
          style={buttonStyle}
        />
      </div>
    </form>
  )
}
SignupForm.propTypes = {
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool,
  t: PropTypes.func
}

export default translate()(reduxForm({
  form: 'Signup',
  validate
})(SignupForm))
