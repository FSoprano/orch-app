// orch-app/src/components/dates.tsx

// Import dependencies
import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Import components
import { DateList } from './date-list';

// Import styles
import './../styles/members.css';

// Dates component
export const Dates = () => {
  // Prepare states
  const [termin, setTermin] = useState('');
  const [date, setDate] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Fetch all members on initial render
  useEffect(() => {
    fetchDates()
  }, []);
  
  // function to retrieve all members
  // Fetch all books
  const fetchDates = async () => {
    // Send GET request to 'dates/datesall' endpoint
    axios
      .get('http://localhost:4001/dates/datesall')
      .then(response => {
        // Update the books state
        setDate(response.data);

        // Update loading state
        setLoading(false);
      })
      .catch(error => console.error(`There was an error retrieving the schedule: ${error}`));
  }
  
  // Reset all input fields
  const handleInputsReset = () => {
    setTermin('');
  }
  
  // Create new member
  const handleDateCreate = () => {
    // Send POST request to 'dates/datecreate' endpoint
    axios
      .post('http://localhost:4001/dates/datecreate', {
        termin: termin,
      })
      .then(res => {
        console.log(res.data);

        // Fetch all dates to refresh schedule
        fetchDates();
      })
      .catch(error => console.error(`There was an error creating the date ${termin}: ${error}`));
  }
  
  // Add new date
  const handleDateSubmit = () => {
    // Check if all fields are filled
    if (termin.length > 0) {
      // Create date
      handleDateCreate();

      console.info(`Date ${termin} added.`);

      // Reset all input fields
      handleInputsReset();
    }
  }
  
  // Remove date
  const handleDateRemove = (id: number, termin: string) => {
    // Send PUT request to 'dates/datedelete' endpoint
    axios
      .put('http://localhost:4001/dates/datedelete', { id: id })
      .then(() => {
        console.log(`Date ${termin} removed.`);

        // Fetch all dates to refresh schedule
        fetchDates();
      });
      .catch(error => console.error(`There was an error removing the date ${termin}: ${error}`));
  }
  
  // Reset schedule (remove all dates)
  const handleListReset = () => {
    // Send PUT request to 'books/reset' endpoint
    axios.put('http://localhost:4001/dates/reset')
    .then(() => {
      // Fetch all dates to refresh schedule
      fetchDates();
    })
    .catch(error => console.error(`There was an error clearing the schedule: ${error}`));
  }
  
  return (
    <div className="member-list-wrapper">
      {/* Form for creating new date */}
      <div className="member-list-form">
        <div className="form-wrapper" onSubmit={handleMemberSubmit}>
          <div className="form-row">
            <fieldset>
              <label className="form-label" htmlFor="termin">Name:</label>
              <input className="form-input" type="text" id="termin" name="termin" value={termin} onChange={(e) => setTermin(e.currentTarget.value)} />
            </fieldset>
          </div>
        </div>

        <button onClick={handleDateSubmit} className="btn btn-add">Add Date</button>
      </div>
      
      {/* Render date list component */}
      <DateList dates={dates} loading={loading} handleDateRemove={handleDateRemove} />

      {/* Show reset button if schedule contains at least one date */}
      {dates.length > 0 && (
        <button className="btn btn-reset" onClick={handleListReset}>Reset Schedule</button>
      )}
    </div>
  )
  }
