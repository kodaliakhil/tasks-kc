
import "./Card.css"

const Card = (props) => {
    const { cardDetails } = props
    const { title, link, description } = cardDetails


    return (
        <div className='card-container'>
            <h1 className='card-heading'>{title}</h1>
            <p className='card-description'>{description}</p>
            <a rel="noreferrer" target='_blank' href={link}>{link}</a>
        </div>
    )
}

export default Card 