import React, { useState } from 'react';
import PropTypes from 'prop-types';
import * as Realm from 'realm-web';
import app from '../realmApp';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

export default function Login({setUser}){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signUp, setSignUp] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("start");
    setLoading(true);
    const credentials = Realm.Credentials.emailPassword(email, password);
    try{
      const user = await app.logIn(credentials);
      console.log(user.id === app.currentUser.id);
      setUser(user);
    } catch(error){
      console.error("Failed to log in", error);
    }

  }

  const handleSignUp = async (e) => {
    e.preventDefault();
    console.log("Signing up");
    setLoading(true);
    try{
      await app.emailPasswordAuth.registerUser({ email, password })
      const credentials = Realm.Credentials.emailPassword(email, password);
      const user = await app.logIn(credentials);
      console.log(user.id === app.currentUser.id);
      setUser(user);
    } catch(error){
      console.error("Failed to log in", error);
    }

  }

  return (
    <div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {signUp? "Sign Up": "Sign In"}
          </Typography>
          <Box component="form" onSubmit={signUp? handleSignUp:handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={e => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={e => setPassword(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            {loading? (
            <LoadingButton loading fullWidth variant="contained">
              Submit
            </LoadingButton>
            ): 
            signUp?(
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up 
              </Button>
              ):(
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
            )
            }
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Button onClick={()=>{setSignUp(!signUp)}} variant="text">{signUp?"Sign In": "Sign Up"}</Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </div>
  )
}

Login.propTypes = {
  setUser: PropTypes.func.isRequired
};
