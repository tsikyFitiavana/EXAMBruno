import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";
import { MDBRow, MDBCol, MDBInput, MDBBtn} from "mdbreact";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      lname: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
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

    const newUser = {
      name: this.state.name,
      lname: this.state.lname,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser, this.props.history);
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
              <p className="h5 text-center mb-4" id="loginp">S'inscrire</p>
              <div className="grey-text">
                <MDBInput
                  label="Votre nom"
                  icon="envelope"
                  group
                  onChange={this.onChange}
                  value={this.state.name}
                  id="name"
                  type="text"
                  className={classnames("", {
                    invalid: errors.name
                  })}
                  required
                />
                <MDBInput
                  label="Votre prenom"
                  icon="envelope"
                  group
                  onChange={this.onChange}
                  value={this.state.lname}
                  id="lname"
                  type="text"
                  className={classnames("", {
                    invalid: errors.lname
                  })}
                  required
                />

                <MDBInput
                  label="Votre adresse e-mail"
                  icon="envelope"
                  group
                  type="email"
                  success="right"
                  id="email"
                  onChange={this.onChange}
                  value={this.state.email}
                
                  className={classnames("", {
                    invalid: errors.email
                  })}
                  required
                />

                
                <MDBInput
                  label="Votre mot de passe"
                  icon="lock"
                  group
                  type="password"
                  onChange={this.onChange}
                  value={this.state.password}
                 
                  id="password"
                  className={classnames("", {
                    invalid: errors.password
                  })}
                  required
                />
                 <MDBInput
                  label="Confirmer votre mot de passe"
                  icon="lock"
                  group
                  type="password"
                  onChange={this.onChange}
                  value={this.state.password2}
                  
                  id="password2"
                  className={classnames("", {
                    invalid: errors.password2
                  })}
                  required
                />
                 
              </div>
              <div className="text-center">
                <MDBBtn type="submit" id="bouton-connecter">S'inscrire</MDBBtn>
              </div><br/>
            </form>
                  <p>J'ai deja un compte ! &nbsp; <Link to="/login" id="linkseconnecter"> Se connecter</Link></p> 
          </MDBCol>
        </MDBRow>
        </div>
        <div className="col-md-4"></div>
    </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
