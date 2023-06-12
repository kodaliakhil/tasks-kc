import Cookies from 'js-cookie'
import {Navigate} from 'react-router-dom'

const PrivateRoute = ({children}) => {

    if(Cookies.get("jwt_token") === undefined){
        return <Navigate to="/login" /> 
    }else{
        return children 
    }
        
}

export default PrivateRoute