import React, { Component } from 'react'
import './App.css'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      startDate: '2011-01-01',
      endDate: '2011-12-31',
      dateArr: [],
      render: false
    }
  }
  handleChange = date => e => {
    this.setState({ [date]: e.target.value })
  }
  onCancel = e => {
    e.preventDefault()
    this.setState({ startDate: '2011-01-01', endDate: '2011-12-31', dateArr: [], render: false })
  }
  handleSubmit = (start, stop, dateArr) => (e) => {
    e.preventDefault()

    if(stop <= start) {
      alert('End Date is before Start Date.  Please choose valid dates.')              // checks if end date is before
    }                                                                                  // start date

    let newStart = new Date(start)
    let startObj = new Date(newStart.getTime() - newStart.getTimezoneOffset()* -60000 ) // to fix goofy time error that
    let stopObj = new Date(stop)                                                        // that returns day before Start Day

    var currentDate = new Date(startObj)

    var currentAdjDate = currentDate.setDate( currentDate.getDate() + 1) // to start array with day after start date

    while(currentDate <= stopObj) {                                      // populates array with all dates between start and end
      dateArr.push(new Date(currentAdjDate))
      currentDate.setDate(currentDate.getDate() + 1)
      currentAdjDate = currentDate.setDate( currentDate.getDate())
    }
    this.setState({ dateArr, render: true })

  }
  dateObjToString = date => {                                           // converts date to mmddyyyy string format
    var dateObj = new Date(date)
    var mm = dateObj.getMonth() + 1                                    // getMonth() is zero-based
    var dd = dateObj.getDate()
  
    return [(mm>9 ? '' : '0') + mm,
            (dd>9 ? '' : '0') + dd,
            dateObj.getFullYear()
           ].join('')
  }
  allDates = (dateArr, palindrome, render) => {
    
    let answer = dateArr.map(date => palindrome(this.dateObjToString(date))).filter(date => date !== null)
    return (render && answer.length === 0) ? <h4>There are no palindromes in the selected date range.</h4> : answer
  }
  palindrome = dateStr => {
    const revDateStr = dateStr.split('').reverse().join('')            // returns exact opposite of current date string
    
    return dateStr === revDateStr                                      // return <h4> if date is a palindrome, else false
      ? <h4 key={dateStr} >{dateStr} is a palindrome.</h4> 
      : null
  }


  render() {
    const { startDate, endDate, dateArr, render } = this.state
  
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Palindromes
          </p>
        </header>

        <div className='App-form' >
          <form>
            <div style={{ display: "flex", flexDirection: 'column', marginTop: '20px' }} >
              <label >Start Date
              <input type='date' name='startDate'
                    value={this.state.startDate}
                    onChange={this.handleChange('startDate')} />
              </label>
              <label>End Date
              <input type='date' name='endDate'
                    value={this.state.endDate}
                    onChange={this.handleChange('endDate')} />
              </label>
              <div style={{ marginTop: '20px' }}  >
                <button onClick={this.onCancel} >Cancel</button>
                <button onClick={this.handleSubmit(startDate, endDate, dateArr)} >Save</button>
              </div>
            </div>
          </form>

          <div>
            {this.allDates(dateArr, this.palindrome, render)}
          </div>

        </div>
      </div>
    )

  }

}

