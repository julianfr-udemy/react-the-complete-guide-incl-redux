import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import Spinner from "../../components/UI/Spinner/Spinner";
import { auth, setAuthRedirectPath } from "../../store/actions/auth";
import classes from './Auth.module.css';


export default connect(
  state => ({
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    buildingBurger: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath
  }),
  dispatch => ({
    onAuth: (email, password, isSignup) => dispatch(auth(email, password, isSignup)),
    onSetAuhRedirectPath: () => dispatch(setAuthRedirectPath('/'))
  })
)(
  class Auth extends Component {
    state = {
      controls: {
        email: {
          elementType: 'input',
          elementConfig: {
            type: 'email',
            placeholder: 'Mail Address'
          },
          value: '',
          validation: {
            required: true,
            isEmail: true
          },
          valid: false,
          touched: false
        },
        password: {
          elementType: 'input',
          elementConfig: {
            type: 'password',
            placeholder: 'Password'
          },
          value: '',
          validation: {
            required: true,
            minLength: 6
          },
          valid: false,
          touched: false
        }
      },
      isSignup: true
    };

    componentDidMount() {
      if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
        this.props.onSetAuhRedirectPath();
      }
    }

    checkValidity = (value, rules = {}) => {
      if (rules.required && value.trim() === '') { return false; }
      if (rules.minLength && value.length < rules.minLength) { return false; }
      if (rules.maxLength && value.length > rules.maxLength) { return false; }

      return true;
    }

    inputChangedHandler = (event, controlName) => {
      const updatedControls = {
        ...this.state.controls,
        [controlName]: {
          ...this.state.controls[controlName],
          value: event.target.value,
          valid: this.checkValidity(event.currentTarget.value, this.state.controls[controlName].validation),
          touched: true
        }
      };

      this.setState({ controls: updatedControls });
    }

    submitHandler = () => {
      this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
    }

    switchAuthModeHandler = () => {
      this.setState(prevstate => ({ isSignup: !prevstate.isSignup }));
    }

    render() {
      const formElementsArray = [];

      for (let key in this.state.controls) formElementsArray.push({ id: key, config: this.state.controls[key] });

      let form = formElementsArray.map(formElement => (
        <Input
          key={formElement.id}
          elementType={formElement.config.elementType}
          elementConfig={formElement.config.elementConfig}
          value={formElement.config.value}
          invalid={!formElement.config.valid}
          shouldValidate={formElement.config.validation}
          touched={formElement.config.touched}
          changed={event => this.inputChangedHandler(event, formElement.id)}
        />
      ));

      if (this.props.loading) { form = <Spinner /> }

      let errorMessage = null;

      if (this.props.error) { errorMessage = <p>{this.props.error.message}</p>; }

      let authRedirect = null;

      if (this.props.isAuthenticated) { authRedirect = <Redirect to={this.props.authRedirectPath} /> }

      return (
        <div className={classes.Auth}>
          {authRedirect}
          {errorMessage}
          <form>
            {form}
            <Button btnType="Success" clicked={this.submitHandler}>SUBMIT</Button>
          </form>
          <Button clicked={this.switchAuthModeHandler} btnType="Danger">{`SWITCH TO SIGN${this.state.isSignup ? 'IN' : 'UP'}`}</Button>
        </div>
      );
    }
  });