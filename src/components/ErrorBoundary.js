import {Component} from "react"

import ErrorPage from './ErrorPage'
// import Profile from "./Profile"

class ErrorBoundary extends Component{   
    state = {error: null}

    componentDidCatch(error){
        this.setState({error: error})
    }

    render(){
        // console.log(count)
        console.log(this.state.error)
        
        if(this.state.error){
            return <ErrorPage error={this.state.error} />
        }else{
        return (
            this.props.children
        )
        }
     }
}

export default ErrorBoundary