// orch-app/src/components/members.tsx

// Import dependencies
import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Import components
import { MemberList } from './member-list';

// Import styles
import './../styles/members.css';

// Members component
export const Members = () => {
  // Prepare states
  const [name, setName] = useState('');
  const [vorname, setVorname] = useState('');
  const [strasse, setStrasse] = useState('');
  const [plz, setPlz] = useState('');
  const [ort, setOrt] = useState('');
  const [fnetz, setFnetz] = useState('');
  const [mobil, setMobil] = useState('');
  const [email, setEmail] = useState('');
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Fetch all members on initial render
  useEffect(() => {
    fetchMembers()
  }, []);
  
  // function to retrieve all members
  // Fetch all books
  const fetchMembers = async () => {
    // Send GET request to 'members/all' endpoint
    axios
      .get('http://localhost:4001/members/all')
      .then(response => {
        // Update the books state
        setMembers(response.data);

        // Update loading state
        setLoading(false);
      })
      .catch(error => console.error(`There was an error retrieving the member list: ${error}`));
  }
  
  // Reset all input fields
  const handleInputsReset = () => {
    setName('');
    setVorname('');
    setStrasse('');
    setPlz('');
    setOrt('');
    setFnetz('');
    setMobil('');
    setEmail('');
  }
  
  // Create new member
  const handleMemberCreate = () => {
    // Send POST request to 'members/create' endpoint
    axios
      .post('http://localhost:4001/members/create', {
        name: name,
        vorname: vorname,
        strasse: strasse,
        plz: plz,
        ort: ort,
        fnetz: fnetz,
        mobil: mobil,
        email: email,
      })
      .then(res => {
        console.log(res.data);

        // Fetch all members to refresh
        // the members on the list
        fetchBooks();
      })
      .catch(error => console.error(`There was an error creating member ${name}: ${error}`));
  }
  
  // Add new member
  const handleMemberSubmit = () => {
    // Check if all fields are filled
    if (name.length > 0 && vorname.length > 0 && mobil.length > 0 && email.length > 0) {
      // Create member
      handleMemberCreate();

      console.info(`Member ${vorname} ${name} added.`);

      // Reset all input fields
      handleInputsReset();
    }
  }
  
  // Remove member
  const handleMemberRemove = (id: number, name: string) => {
    // Send PUT request to 'members/delete' endpoint
    axios
      .put('http://localhost:4001/members/delete', { id: id })
      .then(() => {
        console.log(`Member ${name} removed.`);

        // Fetch all members to refresh
        // the members on the bookshelf list
        fetchBooks();
      });
      .catch(error => console.error(`There was an error removing member ${name}: ${error}`));
  }
  
  // Reset member list (remove all members)
  const handleListReset = () => {
    // Send PUT request to 'books/reset' endpoint
    axios.put('http://localhost:4001/members/reset')
    .then(() => {
      // Fetch all members to refresh
      // the members on the list
      fetchMembers();
    })
    .catch(error => console.error(`There was an error resetting the member list: ${error}`));
  }
  
  return (
    <div className="member-list-wrapper">
      {/* Form for creating new book */}
      <div className="member-list-form">
        <div className="form-wrapper" onSubmit={handleMemberSubmit}>
          <div className="form-row">
            <fieldset>
              <label className="form-label" htmlFor="name">Name:</label>
              <input className="form-input" type="text" id="name" name="name" value={name} onChange={(e) => setName(e.currentTarget.value)} />
            </fieldset>

            <fieldset>
              <label className="form-label" htmlFor="vorname">Vorname:</label>
              <input className="form-input" type="text" id="vorname" name="vorname" value={vorname} onChange={(e) => setVorname(e.currentTarget.value)} />
            </fieldset>
          </div>

          <div className="form-row">
            <fieldset>
              <label className="form-label" htmlFor="strasse">Straße:</label>
              <input className="form-input" type="text" id="strasse" name="strasse" value={strasse} onChange={(e) => setStrasse(e.currentTarget.value)} />
            </fieldset>
            
            <fieldset>
              <label className="form-label" htmlFor="email">E-Mail:</label>
              <input className="form-input" type="text" id="email" name="email" value={xyz@example.com} onChange={(e) => setEmail(e.currentTarget.value)} />
            </fieldset>

          </div>
        </div>
        
        <div className="form-row">
            <fieldset>
              <label className="form-label" htmlFor="plz">PLZ:</label>
              <input className="form-input" type="text" id="plz" name="plz" value={plz} onChange={(e) => setPlz(e.currentTarget.value)} />
            </fieldset>

            <fieldset>
              <label className="form-label" htmlFor="ort">Ort:</label>
              <input className="form-input" type="text" id="ort" name="ort" value={ort} onChange={(e) => setOrt(e.currentTarget.value)} />
            </fieldset>
          </div>
        </div>
        
        <div className="form-row">
            <fieldset>
              <label className="form-label" htmlFor="fnetz">Festnetz:</label>
              <input className="form-input" type="text" id="fnetz" name="fnetz" value={fnetz} onChange={(e) => setFnetz(e.currentTarget.value)} />
            </fieldset>

            <fieldset>
              <label className="form-label" htmlFor="mobil">Handy:</label>
              <input className="form-input" type="text" id="mobil" name="mobil" value={0172-000000} onChange={(e) => setMobil(e.currentTarget.value)} />
            </fieldset>
          </div>
        </div>

        <button onClick={handleMemberSubmit} className="btn btn-add">Add Member</button>
      </div>
      
      {/* Render member list component */}
      <MemberList members={members} loading={loading} handleMemberRemove={handleMemberRemove} />

      {/* Show reset button if list contains at least one book */}
      {members.length > 0 && (
        <button className="btn btn-reset" onClick={handleListReset}>Reset List.</button>
      )}
    </div>
  )





  
  }
