import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton'
import Checkbox from 'material-ui/Checkbox'

import { Field, reduxForm } from 'redux-form'
import TextField from 'components/TextField'

import classes from './LoginForm.scss'
import { translate } from 'react-i18next'


const validate = values => {
  const errors = {}
  if (!values.email) errors.email = 'Required'
  if (!values.password) errors.password = 'Required'
  return errors
}

export const LoginForm = ({ handleSubmit, submitting, t}) => (
  <form className={classes['container']} onSubmit={handleSubmit}>
    <div>
      <Field
        name='email'
        component={TextField}
        label={t('email')}
      />
    </div>
    <div>
      <Field
        name='password'
        component={TextField}
        label={t('password')}
        type='password'
      />
    </div>
    <div className={classes['submit']}>
      <RaisedButton
        label={t('login')}
        primary
        type='submit'
        disabled={submitting}
      />
    </div>
    <div className={classes['options']}>
      <div className={classes['remember']}>
        <Checkbox
          name='remember'
          value='remember'
          label={t('remember')}
          labelStyle={{ fontSize: '.8rem' }}
        />
      </div>
      <Link className={classes['recover']} to='/recover'>
        {t('forgot')}
      </Link>
    </div>
  </form>
)

LoginForm.propTypes = {
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool,
  t: PropTypes.func
}

export default translate()(reduxForm({
  form: 'Login',
  validate
})(LoginForm))
