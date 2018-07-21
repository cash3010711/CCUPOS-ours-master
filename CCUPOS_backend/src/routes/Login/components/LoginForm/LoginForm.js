import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton'
import Checkbox from 'material-ui/Checkbox'

import { Field, reduxForm } from 'redux-form'
import TextField from 'components/TextField'

import classes from './LoginForm.scss'

const validate = values => {
  const errors = {}
  if (!values.email) errors.email = 'Required'
  if (!values.password) errors.password = 'Required'
  return errors
}

export const LoginForm = ({ handleSubmit, submitting }) => (
  <form className={classes['container']} onSubmit={handleSubmit}>
    <div>
      <Field
        name='email'
        component={TextField}
        label='電子郵件'
      />
    </div>
    <div>
      <Field
        name='password'
        component={TextField}
        label='密碼'
        type='password'
      />
    </div>
    <div className={classes['submit']}>
      <RaisedButton
        label='登入'
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
          label='記住我'
          labelStyle={{ fontSize: '.8rem' }}
        />
      </div>
      <Link className={classes['recover']} to='/recover'>
        忘記密碼嗎?
      </Link>
    </div>
  </form>
)

LoginForm.propTypes = {
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool
}

export default reduxForm({
  form: 'Login',
  validate
})(LoginForm)
