import './style.css';
import * as React from 'react';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import { logout } from '../service/service';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const NavBar = () => {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const anchorRef = React.useRef(null);
  const { profile } = useSelector((state) => state.profile);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  const handlelogout = () => {
    logout().then(navigate('/Sign-in'));
  };
  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);
  return (
    <header className='navbar'>
      <div className='navbar__title navbar__item' onClick={() => navigate('/')}>
        Home
      </div>
      <div className='navbar__item'>
        <Link to='/Chat'>Member Tchat</Link>
      </div>
      <div className='navbar__item'>
        <Link to='/Publication'>Publication</Link>
      </div>
      <div className='navbar__item'>
        <div
          ref={anchorRef}
          id='composition-button'
          aria-controls={open ? 'composition-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup='true'
          onClick={handleToggle}>
          <div className='nav-img-bloc'>
            <img className='nav__img' src={profile.photoURL} alt='men' />
            {profile.displayName}
          </div>
        </div>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement='bottom-start'
          transition
          disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom-start' ? 'left top' : 'left bottom',
              }}>
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id='composition-menu'
                    aria-labelledby='composition-button'
                    onKeyDown={handleListKeyDown}>
                    <MenuItem onClick={handleClose}>
                      <Link to='/Profile'> Profile</Link>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>My account</MenuItem>
                    <MenuItem onClick={handlelogout}>Logout</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </header>
  );
};
