const errorPage = {
    display: "flex",
    flexDirection: "column",
    justifyContentCenter: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#aeedf2",
    padding: "20px",
    height:"100vh"
}

const errorContainer ={
    borderRadius:"10px",
    padding:"20px",
    display:"flex",
    flexDirection:"column",
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"#ffffff",
    height:"400px",
}

const button = {
    width: "120px",
}



const ErrorPage = (props) => {
    const error = props
    

    let goto = ""
    let comp = ""
    // const len = Object.keys(error).length
    if(Object.keys(error).length !==0){
        const {component, path} = JSON.parse(error.error.message)
        goto=path 
        comp=component
    }else{
        goto="/"
        comp="Home"
    }

    
    
    return (
        <div style={errorPage}>
            <div style={errorContainer} >
                <h1 className="pb-3">Something Went Wrong</h1>
               {/* {len !== 0?<p className="pb-3">Error occured at {comp} component</p>:<p className="pb-3">Page Not Found</p>} */}
                <button style={button} type="button" className="btn btn-dark w-10" onClick={() => window.location.replace(goto)}>Go to {comp} </button>
            </div>
        </div>)
}

export default ErrorPage