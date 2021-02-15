import React, {useState} from 'react'
import Container from '../container/container'
import {Link} from 'react-router-dom'
import logo from '../../assets/images/logo1.png'
import NavbarToggle from './navbar.toggle'
import NavbarList from './navbar.list'

const Navbar = () => {
    const [active, setActive] = useState(false)

    const menuState = () =>{
        setActive(!active)
    }
    
    return (
        <Container>
            <nav className="navbar">
                {/*left side */}
                <div className="flex justify-between w-full md:w-32 items-center">
                    <Link to="/" className="log w-20 animate">
                        <img src={logo} alt="logo" />
                    </Link>
                    <NavbarToggle 
                        active={active}
                        menuState={menuState}
                    />
                </div>

                {/*right side */}
                <div className={ `${active ? 'flex' :'hidden'} md:flex` }>
                    <NavbarList/>
                </div>
            </nav>
        </Container>
    )
}

export default Navbar
