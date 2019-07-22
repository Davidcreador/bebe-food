const createRecord = data => {
  return fetch("/.netlify/functions/records-create", {
    body: JSON.stringify(data),
    method: "POST"
  }).then(response => {
    return response.json()
  })
}

const readAllRecords = () => {
  return fetch("/.netlify/functions/read-all-records").then(response => {
    return response.json()
  })
}

export default {
  create: createRecord,
  readAll: readAllRecords
}
