import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import {Link} from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import { getConnection } from '../utils/s3.js';
import { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import Menu from '@mui/material/Menu';

const LinkStyle = {
    margin: "0px",
    color: "rgb(25, 118, 210)",
    textDecoration: "none",
};

function stringToColor(string) {
    let hash = 0;
    let i;

    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }

    return color;
}

function stringAvatar(name) {
    return {
        sx: {
        bgcolor: stringToColor(name),
        },
        children: `${name[0]}`,
    };
}

export default function HeaderMenu() {
    const [openAvatarMenu, setOpenAvatarMenu] = useState(null);

    return (
        <Container maxWidth="sm" direction="row">
            <Grid container spacing={12}>
                <Grid item xs={4}>
                    <Link style={LinkStyle} to="/" title="Главная"><center><h2>Главная</h2></center></Link>
                </Grid>
                <Grid item xs={4}>
                    <Link style={LinkStyle} to="/files" title="Файлы"><center><h2>Файлы</h2></center></Link>
                </Grid>
                <Grid item xs={4}>
                    <Avatar style={{margin: '10px'}} onClick={(event) => {setOpenAvatarMenu(event.currentTarget)}} {...stringAvatar(getConnection().credentials.accessKeyId)} />
                    <Menu
                        id="fade-menu"
                        PaperProps={{
                            elevation: 0,
                            sx: {
                                overflow: 'visible',
                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                mt: 1.5,
                                '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                                },
                                '&:before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                                },
                            },
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}   
                        anchorEl={openAvatarMenu}
                        open={Boolean(openAvatarMenu)}
                        onClose={() => {setOpenAvatarMenu(false)}}
                        TransitionComponent={Fade}
                    >
                        <MenuItem onClick={() => {window.localStorage.removeItem('connection');window.location.reload(false);}}>Выйти</MenuItem>
                    </Menu>
                </Grid>
            </Grid>
        </Container>
    );
}