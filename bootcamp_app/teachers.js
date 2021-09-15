const { Pool } = require('pg');

const pool = new Pool({
  user: 'johnny',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

const queryString = `
SELECT DISTINCT teachers.name AS teacher, cohorts.name AS cohort
FROM teachers
JOIN assistance_requests ON teachers.id = teacher_id
JOIN students ON students.id = student_id
JOIN cohorts ON cohort_id = cohorts.id
WHERE cohorts.name LIKE $1
ORDER BY teachers.name;
`;

const cohortName = process.argv[2];
const values = [`%${cohortName}%`];

pool.query(queryString, values)
  .then(res => {
    res.rows.forEach(row => {
      console.log(`${row.cohort}: ${row.teacher}`);
    })
    pool.end();
  })
  .catch(err => console.log('query error', err.stack));