// Write your code here
import {Component} from 'react'
import './index.css'
import {v4} from 'uuid'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem'

class Appointments extends Component {
  state = {dateList: [], titleInput: '', date: '', isFavorite: false}

  toggleListFavorite = id => {
    console.log('click')
    this.setState(prevState => ({
      dateList: prevState.dateList.map(eachList => {
        if (id === eachList.id) {
          return {...eachList, isFavorite: !eachList.isFavorite}
        }
        return eachList
      }),
    }))
  }

  onFilter = () => {
    console.log('value')
    const {isFavorite} = this.state
    this.setState({isFavorite: !isFavorite})
  }

  textOfTitle = event => {
    this.setState({titleInput: event.target.value})
  }

  textOfDate = event => {
    this.setState({date: event.target.value})
  }

  onSubmitEvent = event => {
    console.log('1')
    event.preventDefault()
    const {titleInput, date} = this.state
    const formattedDate = date
      ? format(new Date(date), 'dd MMMM yyyy, EEEE')
      : ''
    const newDate = {
      id: v4(),
      title: titleInput,
      date: formattedDate,
      isFavorite: false,
    }
    this.setState(prevState => ({
      dateList: [...prevState.dateList, newDate],
      titleInput: '',
      date: '',
    }))
    console.log(date)
  }

  onFavoriteList = () => {
    const {dateList, isFavorite} = this.state
    if (isFavorite) {
      return dateList.filter(eachList => eachList.isFavorite === true)
    }
    return dateList
  }

  render() {
    const {dateList, isFavorite} = this.state
    const filterClassName = isFavorite ? 'filter-filled' : 'filter-empty'
    const outPutResult = this.onFavoriteList()

    return (
      <div className="container">
        <div className="min-continer">
          <div className="con1">
            <div className="form-div-Container">
              <form onSubmit={this.onSubmitEvent} className="from">
                <h1 className="heading">Add Appointment</h1>
                <label className="label" htmlFor="title">
                  TITLE
                </label>
                <input
                  type="text"
                  placeholder="Title"
                  onChange={this.textOfTitle}
                  className="input"
                />
                <label htmlFor="date" className="label">
                  DATE
                </label>
                <input
                  type="date"
                  placeholder="dd/mm/yyyy"
                  onChange={this.textOfDate}
                  className="input"
                />
                <button className="btn2" type="submit">
                  Add
                </button>
              </form>
            </div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="img1"
            />
          </div>
          <hr className="border-line" />
          <div>
            <div className="vv">
              <h1 className="pi">Appointments</h1>
              <button
                type="button"
                className={`button-2 ${filterClassName}`}
                onClick={this.onFilter}
              >
                Starred
              </button>
            </div>
            <ul className="list">
              {outPutResult.map(eachList => (
                <AppointmentItem
                  key={eachList.id}
                  listOfDate={eachList}
                  toggleListFavorite={this.toggleListFavorite}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
export default Appointments
