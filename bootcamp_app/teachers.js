const { Pool } = require("pg");

const args = process.argv.slice(2);

const pool = new Pool({
  user: "development",
  password: "development",
  host: "localhost",
  database: "bootcampx"
});

pool
  .query(
    `
SELECT DISTINCT teachers.name as teacher, cohorts.name as cohort
FROM teachers
JOIN assistance_requests ON teachers.id = teacher_id
JOIN students ON students.id = student_id
JOIN cohorts ON cohorts.id = cohort_id
WHERE cohorts.name = '${args[0] || 'JUL02'}'
ORDER BY teachers.name;
`
  )
  .then((res) => {
    //console.log(res.rows);
    res.rows.forEach((row) => {
      console.log(
        `${row.cohort}: ${row.teacher} `
      );
    });
  })
  .catch((err) => console.error("query error", err.stack));