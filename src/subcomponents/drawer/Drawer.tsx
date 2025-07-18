import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import CloseIcon from '@mui/icons-material/Close';

export default function DrawerComponent() {
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (open: boolean) => (event?: React.KeyboardEvent | React.MouseEvent) => {
        if (
            event &&
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }
        setOpen(open);
    };

    const list = () => (
        <Box
            sx={{ width: "25vw", position: 'relative' }}
            role="presentation"
            onKeyDown={toggleDrawer(false)}
        >
            {/* Close Icon */}
            <IconButton
                onClick={toggleDrawer(false)}
                sx={{ position: 'absolute', top: 8, right: 8 }}
                aria-label="close drawer"
            >
                <CloseIcon />
            </IconButton>

            <List sx={{ mt: 5 }}>
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <Box sx={{ position: 'fixed', top: 16, right: 16, zIndex: 1300 }}>
            {!open && (
                <Button variant="contained" onClick={toggleDrawer(true)}>
                    Open Drawer
                </Button>
            )}
            <Drawer sx={{ width: "50vw" }} anchor="right" open={open} onClose={toggleDrawer(false)}>
                {list()}
            </Drawer>
        </Box>
    );
}
