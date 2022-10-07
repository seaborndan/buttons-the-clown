const API = "http://localhost:8088"
const mainContainer = document.querySelector("#container")



// Clown functions
export const getClowns = () => {
  return applicationState.clowns.map(clown => ({...clown}))
}

export const fetchClowns = () => {
  return fetch(`${API}/clowns`)
  .then(response => response.json())
  .then(
    (data) => {
      applicationState.clowns = data
    }
  )
}


// Booking Request functions
export const getBookingRequests = () => {
  return applicationState
  .bookingRequests.map(bookingRequest => ({...bookingRequest})) 
}

export const fetchBookingRequests = () => {
  return fetch(`${API}/bookingRequests`)
  .then(response => response.json())
  .then(
    (party) => {
      applicationState.bookingRequests = party
    }
  )
}

export const sendBookingRequest = (userBookingRequest) => {
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userBookingRequest)
  }

  return fetch(`${API}/bookingRequests`, fetchOptions)
  .then(response => response.json())
  .then(() => {
    mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
  })
}

export const deleteBookingRequest = (id) => {
  return fetch(`${API}/bookingRequests/${id}`, {method: "DELETE" })
  .then(
    () => {
      mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
    }
  )
}


//Completed Parties Functions

export const getCompletions = () => {
  return applicationState.completedParties.map(completion => ({...completion}))
}

export const fetchCompletedParties = () => {
  return fetch(`${API}/completedParties`)
  .then(response => response.json())
  .then(
    (completedJobs) => {
      applicationState.completedParties = completedJobs
    }
  )
}

export const saveCompletion = (compObj) => {
  const completionPost = {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(compObj)
  }

  return fetch(`${API}/completedParties`, completionPost)
  .then(response => response.json())
  .then(() => {
    mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
  })
}

const applicationState = {
  requests: []
}
