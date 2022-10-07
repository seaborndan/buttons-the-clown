import { deleteBookingRequest, getBookingRequests, getClowns, getCompletions, saveCompletion } from "./dataAccess.js"

const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", click => {
  if (click.target.id.startsWith("booking--")) {
    const [,bookId] = click.target.dispatchEvent.split("--")
    deleteBookingRequest(parseInt(bookId))
  }
})

mainContainer.addEventListener(
  "change",
  (event) => {
    if (event.target.id === "clowns") {
      const [bookId, clownId] = event.target.value.split("--")

      const completed = {
        bookId: parseInt(bookId),
        clownId: parseInt(clownId),
        date_created: Date.now()
      }

      saveCompletion(completed)
    }
  }
)

export const BookingRequests = () => {
  const bookingRequests = getBookingRequests()
  bookingRequests.sort((a, b) => {
    return new Date(a.reserveDate) - new Date(b.reserveDate); // descending
  })
  let html = `
    <ul class="booking__list">
      ${
        bookingRequests.map(convertBookingToListElement).join("")
      }
      ${
        bookingRequests.map(convertCompletedBookings).join("")
      }
      </ul>
  `

  return html;
}



const convertBookingToListElement = (bookObj) => {
  const clowns = getClowns()
  const completions = getCompletions()
  let matchedComplete = completions.find(completion => completion.bookId === bookObj.id)
  if(!matchedComplete) {
    let html = ``;
    html += `
      <li class="request">
        <div class="booking__date">
        ${bookObj.reserveDate} Party
        </div>
        <button class="deny" id="booking--${bookObj.id}">Delete
        </button>
    `
    html+= `
      <select class="clowns" id="clowns">
      <option value="">Choose</option>
      ${
        clowns.map(
          clown => {
            return `<option value=${bookObj.id}--${clown.id}">${clown.name}</option>`
          }
        ).join("")
      }
      </select>`

      html += `</li>`
      return html;
  }
}

const convertCompletedBookings = (bookObj) => {
  const completions = getCompletions();
  for(const completion of completions) {
    if(bookObj.id === completion.bookId) {
      let html = ``;
      html += `
        <li class="request" id="completed">
          <div class="booking__date">
          ${bookObj.reserveDate} Party (Completed)
          </div>
          <button class="deny" id="booking--${bookObj.id}">
          Delete
          </button>
      `
      html+=`</li>`
      return html;
    }
  }
}