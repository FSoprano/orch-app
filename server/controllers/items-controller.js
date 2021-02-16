// orch-app/server/controllers/items-controller.js

// Import the database
const knex = require('./../db');

// Retrieve all members
exports.membersAll = async (req, res) => {
  // Get all members from the database
  knex
    .select('*') // select all records
    .from('members') // the members table
    .then(userData => {
      // send the members data in response object
      res.json(userData);
      })
      .catch(err => {
        // send message in resp. object in case of an error
        res.json({ message: `An error occurred during member retrieval ${err}]`})
        })
  }

// Create new member  
exports.memberCreate = async (req, res) => {
  // Add member
  knex('members')
    .insert({
        'Name': req.body.Name,
        'Vorname': req.body.Vorname,
        'Strasse': req.body.Strasse,
        'PLZ': req.body.PLZ,
        'Ort': req.body.Ort,
        'Fnetz': req.body.Fnetz,
        'Mobil': req.body.Mobil,
        'Email': req.body.Email
      })
      .then(() => {
        // send success message in the response 
        res.json({ message: `Member ${req.body.Name} created.` })
        })
      .catch(err => {
        // Send error message in case of an error in the response
        res.json({ message: `There was an error creating member ${req.body.Name}: ${err}` })
        })
  }
  
// Delete a member  
exports.memberDelete = async (req, res) => {
  // Find a particular member and remove her or him from the database
  knex('members')
    .where('id', req.body.id) // Find member by ID
    .del()
    .then(() => { 
      // Success message
      res.json({ message: `Member ${req.body.id} deleted.` })
      })
    .catch(err => {
        // Send error message in case of an error in the response
        res.json({ message: `There was an error deleting member ${req.body.id}: ${err}` })
        })
      
  }  

// Remove all members from the database
exports.membersClearAll = async (req, res) => {
  knex
    .select('*') // select all records
    .from('members') // from 'books' table
    .truncate() // remove the selection
    .then(() => {
      // Send a success message in response
      res.json({ message: 'Member list cleared.' })
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error clearing the member list: ${err}.` })
    })
      
  }  
  
// Dates

// Retrieve all dates
exports.datesAll = async (req, res) => {
  // Get all dates from the database
  knex
    .select('*') // select all records
    .from('dates') // the dates table
    .then(data => {
      // send the dates in a response object
      res.json(data);
      })
      .catch(err => {
        // send message in resp. object in case of an error
        res.json({ message: `An error occurred during dates retrieval: ${err}]`})
        })
  }

// Create new date  
exports.dateCreate = async (req, res) => {
  // Add date
  knex('dates')
    .insert({
        'Termine': req.body.Termine,
      })
      .then(() => {
        // send success message in the response 
        res.json({ message: `Rehearsal date ${req.body.Termine} added.` })
        })
      .catch(err => {
        // Send error message in case of an error in the response
        res.json({ message: `There was an error adding the date ${req.body.Termine}: ${err}` })
        })
  }
  
// Delete a member  
exports.dateDelete = async (req, res) => {
  // Find a particular member and remove her or him from the database
  knex('members')
    .where('id', req.body.id) // Find member by ID
    .del()
    .then(() => { 
      // Success message
      res.json({ message: `Date on ${req.body.id} deleted.` })
      })
    .catch(err => {
        // Send error message in case of an error in the response
        res.json({ message: `There was an error deleting the date ${req.body.id}: ${err}` })
        })
      
  }  

// Remove all members from the database
exports.datesClearAll = async (req, res) => {
  knex
    .select('*') // select all dates
    .from('dates') // from the 'dates' table
    .truncate() // remove the selection
    .then(() => {
      // Send a success message in the response
      res.json({ message: 'All dates cleared.' })
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error clearing the dates table: ${err}.` })
    })
      
  }   
   
   
