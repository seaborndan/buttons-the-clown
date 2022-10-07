import { sendBookingRequest } from "./dataAccess.js"

const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", clickEvent => {
  if (clickEvent.target.id === "submitRequest") {
      // Get what the user typed into the form fields
      const userParentName = document.querySelector("input[name='parentName']").value
      const userAddress = document.querySelector("input[name='address']").value
      const userReserveLength = document.querySelector("input[name='reserveLength']").value
      const userDate = document.querySelector("input[name='reserveDate']").value
      const userNumChildren = document.querySelector("input[name='numChildren']").value
      const userChildName = document.querySelector("input[name='childName']").value

      // Make an object out of the user input
      const dataToSendToAPI = {
        address: userAddress,
        parentName: userParentName,
        numChildren: userNumChildren,
        childName: userChildName,
        reserveDate: userDate,
        reserveLength: userReserveLength
      }

      // Send the data to the API for permanent storage
      sendBookingRequest(dataToSendToAPI)
  }
})

export const BookingForm = () => {
  let html = `
    <div class="field">
      <label class="label" for="parentName">Parent Name</label>
      <input type="text" name="parentName" class="input" />
    </div>
    <div class="field">
      <label class="label" for="childName">Child Name</label>
      <input type="text" name="childName" class="input" />
    </div>
    <div class="field">
      <label class="label" for="numChildren">Number of children</label>
      <input type="text" name="numChildren" class="input" />
    </div>
    <div class="field">
      <label class="label" for="reserveLength">Length of Reservation(Hours)</label>
      <input type="text" name="reserveLength" class="input" />
    </div>
    <div class="field">
      <label class="label" for="address">Address</label>
      <input type="text" name="address" class="input" />
    </div>
    <div class="field">
      <label class="label" for="reserveDate">Date of party/event</label>
      <input type="date" name="reserveDate" class="input" />
    </div>

    <button class="button" id="submitRequest">Submit Request</button>
  `

  return html;
}