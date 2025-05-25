import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../features/auth/authSlice';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Avatar
} from '@mui/material';
import {
  AccountCircle,
  Dashboard,
  ShowChart,
  WatchLater,
  ExitToApp
} from '@mui/icons-material';
import AssessmentIcon from '@mui/icons-material/Assessment';
import QueryStatsIcon from '@mui/icons-material/QueryStats';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    handleClose();
    navigate('/login');
  };

  const authLinks = (
    <>
      <Button
        color="inherit"
        component={RouterLink}
        to="/"
        startIcon={<Dashboard />}
      >
        Dashboard
      </Button>
      <Button
        color="inherit"
        component={RouterLink}
        to="/portfolio"
        startIcon={<ShowChart />}
      >
        Portfolio
      </Button>
      <Button
        color="inherit"
        component={RouterLink}
        to="/watchlist"
        startIcon={<WatchLater />}
      >
        Watchlist
      </Button>
      <Button
        color="inherit"
        component={RouterLink}
        to="/market"
        startIcon={<QueryStatsIcon />}
      >
        Market
      </Button>
      
      <Button
        color="inherit"
        component={RouterLink}
        to="/reports"
        startIcon={<AssessmentIcon />}
      >
        Reports
      </Button>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <Avatar sx={{ width: 32, height: 32 }}>
          {user?.name?.charAt(0) || <AccountCircle />}
        </Avatar>
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleLogout}>
          <ExitToApp sx={{ mr: 1 }} />
          Logout
        </MenuItem>
      </Menu>
    </>
  );

  const guestLinks = (
    <>
      <Button
        color="inherit"
        component={RouterLink}
        to="/login"
      >
        Login
      </Button>
      <Button
        color="inherit"
        component={RouterLink}
        to="/register"
      >
        Register
      </Button>
    </>
  );

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{
            flexGrow: 1,
            textDecoration: 'none',
            color: 'inherit'
          }}
        >
          Bindal Investment
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {isAuthenticated ? authLinks : guestLinks}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 