import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Link, Navigate } from 'react-router-dom';
import { AccountCircle, Menu as MenuIcon, Mail as MailIcon, MoveToInbox as InboxIcon } from '@mui/icons-material';
import { MenuItem, Toolbar, Menu, AppBar } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function TemporaryDrawer() {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const handleUpdateData = () => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const logedUserType = JSON.parse(storedUser).userType;
      if(logedUserType==='SNAKE_CATCHER'){
        navigate('/updateSnakeCatcher');
      } else if (logedUserType==='ADMIN'){
        navigate('/updateAdmin');
      }
    } else {
        navigate('/login');
    }
  }
  

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {['Home', 'Admin Registration', 'Snake Catcher Registration', 'Snake Identify'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton component={Link} to={`/${text.toLowerCase().replace(' ', '-')}`}>
              <ListItemIcon>
                {index === 2 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
  Snake App
          </Typography>
          {user ? (
            <div>
              <IconButton
                size="large"
                color="inherit"
                aria-label="account"
                onClick={(e) => setOpen(e.currentTarget)}
              >
                <AccountCircle />
                
              <Typography variant="body1" sx={{ mr: 2 }}>
                {user.userName}
              </Typography>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={open}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(open)}
                onClose={() => setOpen(null)}
              >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                <MenuItem onClick={handleUpdateData}>Update Data</MenuItem>
              </Menu>
            </div>
          ) : (
            <Button color="inherit" component={Link} to="/login">Login</Button>
          )}

          </Toolbar>
        </AppBar>
      </Box>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
