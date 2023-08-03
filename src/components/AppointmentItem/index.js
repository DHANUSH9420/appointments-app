// Write your code here
import './index.css'

const AppointmentItem = props => {
  const {listOfDate, toggleListFavorite} = props
  const {id, title, date, isFavorite} = listOfDate
  const star = isFavorite
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
  const selectStar = () => {
    toggleListFavorite(id)
  }

  return (
    <li className="list-container">
      <div className="flex-con">
        <p className="heading">{title}</p>
        <p className="date">Date:{date}</p>
      </div>
      <button
        className="btn"
        type="button"
        data-testid="star"
        onClick={selectStar}
      >
        <img className="img" src={star} alt="star" />
      </button>
    </li>
  )
}
export default AppointmentItem
