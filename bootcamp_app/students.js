const { Pool } = require('pg');

const pool = new Pool({
  user: 'johnny',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

const queryString = `
SELECT students.id, students.name AS student, cohorts.name AS cohort
FROM students
JOIN cohorts ON cohort_id = cohorts.id
WHERE cohorts.name LIKE $1
LIMIT $2;
`;

const cohortName = process.argv[2];
const limit = process.argv[3] || 5;
const values = [`%${cohortName}%`, limit]

pool.query(queryString, values)
  .then(res => {
    res.rows.forEach(user => {
      console.log(`${user.student} has an id of ${user.id} and was in the ${user.cohort} cohort`);
    })
    pool.end();
  })
  .catch(err => console.log('query error', err.stack));