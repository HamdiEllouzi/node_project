import './profile.css';
import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { upImgProfile, upProfile } from '../service/service';
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormHelperText from '@mui/material/FormHelperText';

const Input = styled('input')({
  display: 'none',
});

export const Profile = ({ user }) => {
  const { profile } = useSelector((state) => state.profile);
  const form = React.useRef(null);
  const [showPassword, setShowPassword] = React.useState(false);
  const [passValidate, setPassValidate] = React.useState(false);
  const [validate, setValidate] = React.useState({
    password: '',
    cpassword: '',
  });
  React.useEffect(() => {
    validate.password === validate.cpassword
      ? setPassValidate(false)
      : setPassValidate(true);
  }, [validate]);
  const uploadImg = (e) => {
    const img = e.target.files[0];
    upImgProfile(img);
    /*const imgId = uuid()
        const storageRef = ref(storage, 'profile/' + imgId)
        uploadBytes(storageRef, e.target.files[0]).then(() => {
            getDownloadURL(storageRef).then(e => {
                upImgProfile(user, e).then(() => { storeUpdate() })
            })
        }).catch((e) => console.log(e))*/
  };
  const handleChange = (name) => (event) => {
    setValidate({ ...validate, [name]: event.target.value });
  };
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const firstName = data.get('firstName');
    const lastName = data.get('lastName');
    const email = data.get('email');
    upProfile(firstName, lastName, email)
      .then((e) => {
        form.current.reset();
        setValidate({
          password: '',
          cpassword: '',
        });
        setPassValidate(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className='profile-main'>
      <div className='profile-header'>
        <div className='user-detail'>
          <div className='user-image'>
            <img src={profile.photoURL} alt='user' />
          </div>
          <label htmlFor='icon-button-file' style={{ marginTop: 'auto' }}>
            <Input
              accept='image/*'
              id='icon-button-file'
              type='file'
              onChange={(e) => uploadImg(e)}
            />
            <IconButton
              color='primary'
              aria-label='upload picture'
              component='span'>
              <PhotoCamera />
            </IconButton>
          </label>
          <div className='user-data'>
            <h2>{profile.displayName}</h2>
            <span className='post-label'>Admin</span>
            <p>
              {' '}
              <strong>{profile.email}</strong>
              <br />
            </p>
          </div>
        </div>
        <div className='tab-panel-main'>
          <Box
            component='form'
            ref={form}
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}>
            <Grid item xs={12} sm='auto'>
              <TextField
                id='standard-full-width'
                label='FirstName'
                name='firstName'
                style={{ margin: 8 }}
                placeholder='FirstName'
                fullWidth
                size='small'
                margin='normal'
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm='auto'>
              <TextField
                id='standard-full-width'
                label='LastName'
                name='lastName'
                style={{ margin: 8 }}
                placeholder='LastName'
                fullWidth
                size='small'
                margin='normal'
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm='auto'>
              <TextField
                id='standard-full-width'
                label='Email'
                name='email'
                style={{ margin: 8 }}
                placeholder='Email'
                fullWidth
                size='small'
                margin='normal'
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid container columnSpacing={2}>
              <Grid item xs={6}>
                <FormControl
                  sx={{ m: 1 }}
                  error={passValidate}
                  variant='outlined'
                  fullWidth>
                  <InputLabel htmlFor='outlined-adornment-password'>
                    Password
                  </InputLabel>
                  <OutlinedInput
                    id='outlined-adornment-password'
                    type={showPassword ? 'text' : 'password'}
                    name='password'
                    placeholder='Password'
                    onChange={handleChange('password')}
                    size='small'
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          aria-label='toggle password visibility'
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge='end'>
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label='Password'
                  />
                  {passValidate && (
                    <FormHelperText id='component-error-text'>
                      Error
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl
                  sx={{ m: 1 }}
                  error={passValidate}
                  variant='outlined'
                  fullWidth>
                  <InputLabel htmlFor='outlined-adornment-password'>
                    Password
                  </InputLabel>
                  <OutlinedInput
                    id='outlined-adornment-password'
                    type={showPassword ? 'text' : 'password'}
                    name='cpassword'
                    placeholder='Confirme New Password'
                    onChange={handleChange('cpassword')}
                    size='small'
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          aria-label='toggle password visibility'
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge='end'>
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label='Password'
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Button type='submit' variant='contained'>
              Update
            </Button>
          </Box>
        </div>
      </div>
    </div>
  );
};
