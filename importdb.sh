mongoimport --db=test --collection=students --file=server/src/fixtures/student.json --jsonArray
mongoimport --db=test --collection=teachers --file=server/src/fixtures/teacher.json --jsonArray
mongoimport --db=test --collection=subjects --file=server/src/fixtures/subjects.json --jsonArray
mongoimport --db=test --collection=courses --file=server/src/fixtures/courses.json --jsonArray