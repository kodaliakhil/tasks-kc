import Cookies from 'js-cookie'
import {useState} from 'react'
import{Navigate} from 'react-router-dom'



import "./Login.css"

const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [showError, setError ] = useState(false)

    const onChangeUsername = (event) => {
        setUsername(event.target.value )
    }

    const onChangePassword = (event) => {
        setPassword(event.target.value )
    }

    const onClickLogin = (event) => {
        event.preventDefault()
        
        if(username !== "kodecorp" || password !== "kc123"){
            setError(true )
        }else if(username === "kodecorp" || password === "kc123"){
            setError(false )
            const jwtToken = "login_token 1234"
            Cookies.set("jwt_token",jwtToken,{expires: 30})
            window.location.replace("/")            
        }

    }

    if(Cookies.get("jwt_token") !== undefined){
        return <Navigate replace to="/" />
   } 
        return(
            <div className='login-container'>
                <div>
                    <img src="https://imgs.bharatmatrimony.com/bmimgs/login/login-otp-banner.png" alt="login" className='login-image' />
                </div>
                <form className='login-form' onSubmit={onClickLogin}>
                    <h1 className='heading'>User Login</h1>
                    <input type="text" placeholder='Username' value={username} className='input-field' onChange={onChangeUsername} />
                    <input type="password" placeholder='Password' value={password} className='input-field' onChange={onChangePassword} />
                    {showError && <p className='error-msg'>*The username or password you entered is incorrect</p>}
                    <button tyep="submit" className='login-button'>Login</button>
                </form>
            </div>
        )
}


export default Login