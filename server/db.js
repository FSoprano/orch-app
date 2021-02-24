// orch-app/server/db.js

// Import path module
const path = require('path');

// Get the location of database.sqlite file
const dbPath = path.resolve(__dirname, 'db/database.sqlite3')

// Create connection to SQLite database
const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: dbPath,
  },
  useNullAsDefault: true
})                                                                                   

// Create a table in the database called "members"
knex.schema
  // Make sure no "members" table exists
  // before trying to create new
  .hasTable('members')
    .then((exists) => {
      if (!exists) {
        // If no "members" table exists
        // create new, with "id", "Name", "Vorname",
        // "Strasse", "PLZ", "Ort", "Fnetz", "Mobil" and "Email" columns
        // and use "id" as a primary identification
        // and increment "id" with every new record (member)
        return knex.schema.createTable('members', (table)  => {
          table.increments('id').primary()
          table.string('name')
          table.string('vorname')
          table.string('strasse')
          table.string('plz')
          table.string('ort')
          table.string('fnetz')
          table.string('mobil')
          table.string('email')
        })
        .then(() => {
          // Log success message
          console.log('Table \'Members\' created')
        })
        .catch((error) => {
          console.error(`There was an error creating table: ${error}`)
        })
      }
    })
    .then(() => {
      // Log success message
      console.log('done')
    })
    .catch((error) => {
      console.error(`There was an error setting up the database: ${error}`)
    })

knex.schema    
  .hasTable('dates')
    .then((exists) => {
      if (!exists) {
        // If no "dates" table exists
        // create new, with "id" and "timestamp" columns,
        // and use "id" as a primary identification
        // and increment "id" with every new record (date)
        return knex.schema.createTable('dates', (table)  => {
          table.increments('id').primary()
          table.timestamp('termine')
        })
        .then(() => {
          // Log success message
          console.log('Table \'Dates\' created')
        })
        .catch((error) => {
          console.error(`There was an error creating table: ${error}`)
        })
      }
    })
    .then(() => {
      // Log success message
      console.log('done')
    })
    .catch((error) => {
      console.error(`There was an error setting up the database: ${error}`)
    })

// Just for debugging purposes:
// Log all data in "mmebers" table
knex.select('*').from('members')
  .then(data => console.log('data:', data))
  .catch(err => console.log(err))
  
// Log all data in "dates" table
knex.select('*').from('dates')
  .then(data => console.log('data:', data))
  .catch(err => console.log(err))


// Export the database
module.exports = knex
