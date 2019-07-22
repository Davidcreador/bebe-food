/* bootstrap database in your FaunaDB account */
const readline = require("readline")
const faunadb = require("faunadb")
const chalk = require("chalk")
const insideNetlify = insideNetlifyBuildContext()
const q = faunadb.query

if (!process.env.FAUNADB_SERVER_SECRET) {
  console.log("No FAUNADB_SERVER_SECRET found")
  console.log("Please run `netlify addons:create fauna-staging` and redeploy")
  return false
}

console.log(chalk.cyan("Creating your FaunaDB Database...\n"))
if (insideNetlify) {
  // Run idempotent database creation
  createFaunaDB(process.env.FAUNADB_SERVER_SECRET).then(() => {
    console.log("Database created")
  })
} else {
  console.log()
  console.log("You can create fauna DB keys here: https://dashboard.fauna.com/db/keys")
  console.log()
  ask(chalk.bold("Enter your faunaDB server key"), (err, answer) => {
    if (err) {
      console.log(err)
    }
    if (!answer) {
      console.log("Please supply a faunaDB server key")
      process.exit(1)
    }
    createFaunaDB(process.env.FAUNADB_SERVER_SECRET).then(() => {
      console.log("Database created")
    })
  })
}

/* idempotent operation */
async function createFaunaDB(key) {
  console.log("Create the database!")
  const client = await new faunadb.Client({
    secret: key
  })

  console.log("CLINET", client)
  try {
    const db = await client.query(q.CreateKey({ database: q.Database("bebe-food"), role: "server" }))
    console.log("DEBA--->", db)
  } catch (error) {
    if (error.message === "instance not unique") {
      console.log("schema already created... skipping")
    } else {
      console.error(error)
      throw error
    }
  }

  return client
    .query(q.CreateKey({ database: q.Database("bebe-food"), role: "server" }))
    .then(() => {
      q.CreateCollection({
        name: "records"
      })
    })
    .then(() => {
      console.log("==> 2. create records success")
      return client.query(
        q.CreateIndex({
          name: "all_records",
          source: q.Collection("records")
        })
      )
    })
    .then(console.log("==> 3. create  eveyrthing success") || console.log.bind(console))
    .catch(e => {
      if (e.message === "instance not unique") {
        console.log("schema already created... skipping")
      } else {
        console.error(e)
        throw e
      }
    })
}

/* util methods */

// Test if inside netlify build context
function insideNetlifyBuildContext() {
  if (process.env.DEPLOY_PRIME_URL) {
    return true
  }
  return false
}

// Readline util
function ask(question, callback) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })
  rl.question(question + "\n", function(answer) {
    rl.close()
    callback(null, answer)
  })
}
