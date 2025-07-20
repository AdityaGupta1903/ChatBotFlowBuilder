import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface MessageDrawerProps {
    open: boolean;
    message: string;
    setOpen: (open: boolean) => void;
    onChange: (newValue: string) => void;
}

const MessageDrawerComponent: React.FC<MessageDrawerProps> = ({
    open,
    setOpen,
    message,
    onChange,
}) => {
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
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton onClick={toggleDrawer(false)} aria-label="go back">
                            <ArrowBackIcon />
                        </IconButton>
                        <Typography variant="h6" fontWeight="bold" sx={{ ml: 1 }}>
                            Message
                        </Typography>
                    </Box>
                </Box>

                {/* Text Label */}
                <Typography variant="body2" sx={{ mb: 1 }}>
                    Text
                </Typography>

                {/* Text Area */}
                <TextField
                    fullWidth
                    multiline
                    minRows={3}
                    value={message}
                    onChange={(e) => onChange(e.target.value)}
                    variant="outlined"
                    placeholder="Type your message"
                />
            </Box>
        </Drawer>
    );
};

export default MessageDrawerComponent;
