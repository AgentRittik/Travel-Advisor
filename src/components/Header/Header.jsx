import React,{ useState }from 'react';
import { Autocomplete }  from '@react-google-maps/api';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';



import useStyles from './styles';



const Header = ({setCoordinates}) => {
    const classes = useStyles();
    const [autocomplete, setAutocomplete] = useState(null);
    const onLoad = (autoC) => setAutocomplete(autoC);
    const onPlaceChanged = () => {
        console.log("autocomplete component",autocomplete.getPlace());
        const lat = autocomplete.getPlace().geometry.location.lat();
        const lng = autocomplete.getPlace().geometry.location.lng();
        setCoordinates({lat,lng});
    }
    return (
        <AppBar position="static">
            <Toolbar className={classes.toolbar}>
                <Typography varient="h5" className ={classes.title}>
                    Travel Advisor
                </Typography>
                <Box display="flex"> 
                    <Typography varient="h6" className ={classes.title}>
                        Explore new places
                    </Typography>
                    <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                        <div className= {classes.search}>
                            <div className= {classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase placeholder="Search..." classes={{root: classes.inputRoot, input: classes.inputInput}} />
                        </div>
                    </Autocomplete>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Header;