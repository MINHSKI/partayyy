import React, { Component } from 'react'
import { Menu, Container, Button } from 'semantic-ui-react';
import { NavLink, withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import SignedoutMenu from '../Menus/SignedoutMenu';
import SignedinMenu from '../Menus/SignedinMenu';

class NavBar extends Component {
  state = {
    authenticated: false
  }

  handleSignIn = () => this.setState({authenticated: true});
  handleSignOut = () => {
    this.setState({
      authenticated: false
    });
    
    // By using "withRouter" Higher Order Component, at the bottom of the file
    // where export default is called, we gain access to the history props
    this.props.history.push('/');
  }

  render() {
    const {authenticated} = this.state;
    const {handleSignIn, handleSignOut} = this;
    return (
      <Menu inverted fixed='top'>
        <Container>
          <Menu.Item 
            as={NavLink} exact
            to='/' 
            header>
            <img src='assets/logo.png' alt='logo' />
            Re-vents
          </Menu.Item>

          <Menu.Item 
            as={NavLink} 
            to='/events' 
            name='Events' 
          />

          <Menu.Item 
            as={NavLink} 
            to='/people' 
            name='People' 
          />

          <Menu.Item>
            <Button 
              as={Link} to='createEvents'
              floated='right' 
              positive 
              inverted 
              content='Create Event' 
            />
          </Menu.Item>
          { authenticated ? (<SignedinMenu signOut={handleSignOut} />) : (<SignedoutMenu signIn={handleSignIn} />) }
        </Container>
      </Menu>
    )
  }
}

export default withRouter(NavBar);