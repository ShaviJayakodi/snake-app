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
import { Link } from 'react-router-dom';
import { AccountCircle, Menu as MenuIcon, Mail as MailIcon, MoveToInbox as InboxIcon, Logout as LogoutIcon } from '@mui/icons-material';
import { MenuItem, Toolbar, Menu, AppBar, Divider } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import RememberMeIcon from '@mui/icons-material/RememberMe';
import EditIcon from '@mui/icons-material/Edit';

export default function TemporaryDrawer() {
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
        // Use `navigate` from `react-router-dom` if needed
      } else if (logedUserType==='ADMIN'){
        // Use `navigate` from `react-router-dom` if needed
      }
    } else {
      // Use `navigate` from `react-router-dom` if needed
    }
  }

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {[
          { text: 'Home', link: '/home', icon: <HomeIcon /> },
          { text: 'Admin Registration', link: '/adminRegistration', icon: <AdminPanelSettingsIcon /> },
          { text: 'Snake Catcher Registration', link: '/snakeCatcherRegistration', icon: <MailIcon /> },
          { text: 'Snake Identify', link: '/snakeIdentification', icon: <RememberMeIcon /> }
        ].map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton component={Link} to={item.link}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={handleUpdateData}>
            <ListItemIcon><EditIcon /></ListItemIcon>
            <ListItemText primary="Update Data" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={handleLogout}>
            <ListItemIcon><LogoutIcon /></ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
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
                  <AccountCircle sx={{mr:2}}/> 
                  <Typography variant="body1" sx={{ mr: 2 }}>
                {user.userName}
                </Typography>
                </IconButton>
                
                {/*<Menu
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
                    </Menu>*/}
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
