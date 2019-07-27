import React, { Component } from "react";
import { MDBRow, MDBCol, MDBInput, MDBBtn} from "mdbreact";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";
import { Link } from "react-router-dom";

class Login extends Component {

  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }

  state = {
    modal: false
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="container-fluid">
    <div className="row">
        <div className="col-md-4"></div>
        <div className="col-md-4" id="loginrow">
        <MDBRow>
          <MDBCol md="12">
            <form noValidate onSubmit={this.onSubmit}>
              <p className="h5 text-center mb-4" id="loginp">Connexion</p>
              <div className="grey-text">
                <MDBInput
                  label="Votre adresse e-mail"
                  icon="envelope"
                  group
                  type="email"
                  success="right"
                  id="email"
                  onChange={this.onChange}
                  value={this.state.email}
                  // error={errors.email}
                  className={classnames("", {
                    invalid: errors.email || errors.emailnotfound
                  })}

                />
                 <span className="red-text">
                  {errors.email}
                  {errors.emailnotfound}
                </span>
                <MDBInput
                  label="Votre mot de passe"
                  icon="lock"
                  group
                  type="password"
                  onChange={this.onChange}
                  value={this.state.password}
                  // error={errors.password}
                  id="password"
                  className={classnames("", {
                    invalid: errors.password || errors.passwordincorrect
                  })}
                />
                 <span className="red-text">
                  {errors.password}
                  {errors.passwordincorrect}
                </span>
              </div>
              <div className="text-center">
                <MDBBtn type="submit" id="bouton-connecter">Se Connecter</MDBBtn>
              </div>
            </form>
            Vers &nbsp; <Link to="/">Accueil</Link>
          </MDBCol>
        </MDBRow>
        </div>
        <div className="col-md-4"></div>
    </div>
       
        </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
