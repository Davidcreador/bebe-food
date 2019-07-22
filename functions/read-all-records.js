import faunadb from "faunadb"

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET
})

exports.handler = (event, context, callback) => {
  console.log("Function `records-read-all` invoked")
  return client.query(q.Paginate(q.Indexes())).then(ret => console.log(ret))
  return client
    .query(q.Paginate(q.Match(q.Ref("indexes/all_records"))))
    .then(response => {
      const recordsRefs = response.data
      console.log("Records refs", recordsRefs)
      console.log(`${recordsRefs.length} records found`)
      // create new query out of todo refs. http://bit.ly/2LG3MLg
      const getAllTodoDataQuery = recordsRefs.map(ref => {
        console.log("REF", ref)
        return q.Get(ref)
      })
      // then query the refs
      return client.query(getAllTodoDataQuery).then(ret => {
        return callback(null, {
          statusCode: 200,
          body: JSON.stringify(ret)
        })
      })
    })
    .catch(error => {
      console.log("error", error)
      return callback(null, {
        statusCode: 400,
        body: JSON.stringify(error)
      })
    })
}
