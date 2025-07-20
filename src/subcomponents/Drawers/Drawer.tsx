import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import Typography from '@mui/material/Typography';

const DrawerComponent: React.FC<{
    AddNode: () => void;
    open: boolean;
    setOpen: (open: boolean) => void;
}> = ({ AddNode, open, setOpen }) => {
    const toggleDrawer = (state: boolean) => () => setOpen(state);

    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={toggleDrawer(false)}
            ModalProps={{
                BackdropProps: {
                    style: {
                        backgroundColor: 'transparent',
                    },
                },
            }}
            PaperProps={{
                sx: {
                    width: '25vw',
                    bgcolor: '#fff',
                    boxShadow: 3,
                },
            }}
        >
            <Box
                sx={{
                    width: '100%',
                    height: '100%',
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                }}
                role="presentation"
            >
                {/* Header */}
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        mb: 2,
                    }}
                >
                    <Typography variant="h6" fontWeight="bold">
                        Nodes
                    </Typography>
                    <IconButton onClick={toggleDrawer(false)} aria-label="close drawer">
                        <CloseIcon />
                    </IconButton>
                </Box>

                {/* Divider */}
                <Divider sx={{ mb: 2 }} />

                {/* Content */}
                <List>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <Button
                                onClick={AddNode}
                                variant="outlined"
                                startIcon={<ChatBubbleOutlineIcon />}
                                sx={{
                                    textTransform: 'none',
                                    borderColor: '#8884d8',
                                    color: '#8884d8',
                                    width: '100%',
                                    justifyContent: 'flex-start',
                                    px: 2,
                                    py: 1.5,
                                }}
                            >
                                Send Message
                            </Button>
                        </ListItemButton>
                    </ListItem>
                </List>
            </Box>
        </Drawer>
    );
};

export default DrawerComponent;
