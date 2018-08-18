import React from 'react';
import styled from 'styled-components';

function NavBar() {
    
    const Button = styled.button` border-radius: 3px;
    padding: 0.25em 1em;
    margin: 0 1em;
    background: transparent;
    color: palevioletred;
    border: 2px solid palevioletred;`;
    
    const NavbarStyle = styled.div`
    height: 40px;
    border-radius: 3px;
    padding: 0.25em 1em;
    background: transparent;
    color: palevioletred;
    border: 2px solid palevioletred;`;
    
    return(
        <NavbarStyle>
            <Button> Profile </Button>
            <Button> Dog Swipe </Button>
            <Button> Messages </Button>
        </NavbarStyle>
    )
}

export default NavBar;