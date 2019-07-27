import React, { Component } from "react";
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse } from "mdbreact";
import { MDBModal, MDBBtn,MDBModalBody, MDBModalHeader, MDBModalFooter} from "mdbreact";
class SideNavPage extends Component {

  state = {
    modal5: false,
    
  }


  //popops login fonction 
  toggleCollapse = collapseID => () =>
    this.setState(prevState => ({
      collapseID: prevState.collapseID !== collapseID ? collapseID : ""
    }));
  toggle = nr => () => {
    let modalNumber = "modal" + nr;
    this.setState({
      [modalNumber]: !this.state[modalNumber]
    });
  }


  render() {
  
  
    return (
      <div>
        <MDBNavbar color="red" dark expand="md" style={{ marginTop: "1px" }} id="navbar" className="fixed-top" scrolling >
          <MDBNavbarBrand>
            <img src="logo.png" alt="Logo" id="logoimage"/>
          </MDBNavbarBrand>
          <MDBNavbarToggler onClick={this.toggleCollapse("navbarCollapse3")} />
          <MDBCollapse id="navbarCollapse3" isOpen={this.state.collapseID} navbar>
            <MDBNavbarNav left>
            
              <MDBNavItem>
                <MDBNavLink to="" className="nav-header">CUISINE</MDBNavLink>
              </MDBNavItem>

            </MDBNavbarNav>
            <MDBNavbarNav right>
              <MDBNavItem>
                <MDBNavLink to="/login" className="nav-header" >Connexion</MDBNavLink>
              </MDBNavItem>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBNavbar>

           {/*A PROPOS */}
        <MDBModal
          isOpen={this.state.modal5}
          toggle={this.toggle(5)}
          centered
        >   
         <MDBModalHeader toggle={this.toggle(5)} className="text-center" titleClass="w-100">A propos de E-com</MDBModalHeader>
        
          <MDBModalBody>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </MDBModalBody>
          <MDBModalFooter className="justify-content-center">
            <MDBBtn id="boutton-inscrire">Merci de visiter e-com</MDBBtn>
          </MDBModalFooter>
        </MDBModal>

      </div>
    );
  }
}

export default SideNavPage;