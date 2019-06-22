import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import LocalDiningIcon from '@material-ui/icons/LocalDining';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

const Navigation = () => (
  <div style={{ flexGrow: 1 }}>
    <AppBar position="static">
      <Toolbar>
        <LocalDiningIcon style={{ margin: '0 20px' }} />
        <Typography
          variant="h6"
          style={{ flexGrow: 1, textDecoration: 'none' }}
          color="inherit"
          component={Link}
          to="/"
        >
          Uridoki Shuffle Lunch
        </Typography>
        <IconButton color="inherit" aria-label="add">
          <AddCircleOutlineIcon />
        </IconButton>
        <Button color="inherit" component={Link} to="/signin">
          Login
        </Button>
      </Toolbar>
    </AppBar>
  </div>
);

export default Navigation;
