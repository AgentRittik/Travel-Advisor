import React,{ useState, useEffect} from 'react'
import './App.css'

// Miui Imports
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';


//components imports
import Header from './components/Header/Header';


function App() {
  
  const [places, setPlaces] = useState([]);
  const[filteredPlaces, setFilteredPlaces]  = useState([]);
  const [childClicked, setChildClicked] = useState(null); // when we click on the marker, we want to know which marker is clicked --> we are using lifting the state up
  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState({});
  const [weatherData, setWeatherData] = useState([]);
  

  const[isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState('restaurants');
  const [rating, setRating] = useState('');

  useEffect(() => {      // to automatically get the current location of the user in the starting. so we don't need to manually change the coordinates
      navigator.geolocation.getCurrentPosition(({coords: {latitude, longitude}}) => {
          console.log({latitude});
          console.log({longitude});
          setCoordinates({lat: latitude , lng: longitude});
          console.log('vishal' , coordinates.latitude);
      });
  }, []);//only work once at the starting of page loding
  
  useEffect(() => {
      // This useEffect will run whenever coordinates change
      console.log('Updated coordinates:', coordinates);
    }, [coordinates]);

  useEffect(() => {
      const filteredPlaces = places.filter((place) => place.rating > rating);
      setFilteredPlaces(filteredPlaces);
  },[rating]);
  
  // useEffect(() => {
  //     console.log("weather",weatherData);
  //     console.log(weatherData.coord);
  //     console.log(weatherData.weather[0]);
  // }, [weatherData])
  

  useEffect(() => {
      console.log('hii' , bounds.sw , bounds.ne);
      if(bounds.sw && bounds.ne){
          setIsLoading(true);
          getWeatherData(coordinates.lat , coordinates.lng)
              .then((data) => {
                      setWeatherData(data);
                      console.log("wweatherData",data);
              });
          getPlacesData(type, bounds.sw, bounds.ne)
              .then((data) => {
                      setPlaces(data.filter((place) => place.name && place.num_reviews >0));
                      setFilteredPlaces([]);
                      setIsLoading(false);
              });
      }    
  }, [type ,bounds]);  // the empty array means that this useEffect will only run once at the start of application
  //                             // if we want to change the coordinates and bounds every time we change map , we need to add them to the array

  
  const theme = createTheme()

  return (
    <>
      <ThemeProvider theme={theme}>
            <CssBaseline />
            <Header setCoordinates ={setCoordinates}/>
            {/* <Grid container spacing={3} styles={{ width: '100%' }}>
                <Grid item xs={12} md={4} >
                    <List 
                        places={filteredPlaces.length? filteredPlaces :places}
                        childClicked={childClicked}
                        isLoading={isLoading}
                        type={type}
                        setType={setType}
                        rating = {rating}
                        setRating ={setRating}
                    />
                </Grid>
                <Grid item xs={12} md={8} >
                    <Map
                        setCoordinates={setCoordinates} 
                        setBounds={setBounds}
                        coordinates={coordinates}
                        places={filteredPlaces.length? filteredPlaces :places}
                        setChildClicked={setChildClicked}
                        weatherData={weatherData}
                    />
                </Grid>
            </Grid> */}
        </ThemeProvider>
    </>
  )
}

export default App
