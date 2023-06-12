import { ThreeDots } from 'react-loader-spinner'
import './Home.css'
import Card from './Card'
import { useEffect, useState } from 'react';

export const Home = () => {
    const [data, setData] = useState([])


    const getData = async() => {
        const response = await fetch("https://apis.ccbp.in/wiki-search?search=India")
        const fetchedData = await response.json()
        setData(fetchedData.search_results)
    }

    useEffect(() => {
        getData()
    }, [])


    if (data.length === 0) {
        return <ThreeDots
            height="80" width="80" radius="9" color="#4fa94d"
            ariaLabel="three-dots-loading" wrapperStyle={{}} wrapperClassName="" visible={true}
        />
    }
    return (
        <div className='home-container text-center'>
            <h1>Landing Page</h1>
            <div className='cards-container'>
                {data.map((each, id) => (
                    <Card cardDetails={each} key={id} />
                ))}
            </div>
        </div>
    )
}



