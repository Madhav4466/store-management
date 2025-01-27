import React from "react";
import '../../styles/account/login.css';
import { Button, FormControl, InputLabel, OutlinedInput } from "@mui/material";
import Card from "../../components/card/card";

export default function Login(){
    return(
        <form className="login-container" method="POST" action="/">
            <Card classList={'login-form'}
                cardHeader={<h1>Login</h1>}
                cardBody={
                    <div>
                        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                            <InputLabel htmlFor="userName">User Name</InputLabel>
                            <OutlinedInput
                                id="userName"
                                type='text'
                                label="User Name"
                            />
                        </FormControl>
                        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type='password'
                                label="Password"
                            />
                        </FormControl>
                    </div>
                }
                cardFooter={
                    <div style={{display: 'flex', flexDirection: 'column', width: '220px', margin: 'auto'}}>
                        <Button variant="contained" type='submit'>Login</Button>
                        <Button variant="text">Forgot Password?</Button>
                    </div>
                }
            />
        </form>
    );
}