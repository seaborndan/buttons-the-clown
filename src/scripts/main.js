import { ButtonsClown } from "./ButtonsClown.js"
import { fetchBookingRequests, fetchClowns, fetchCompletedParties } from "./dataAccess.js"

const mainContainer = document.querySelector("#container")

mainContainer.addEventListener(
  "stateChanged",
  CustomEvent => {
    render()
  }
)

const render = () => {
  fetchBookingRequests()
  .then(() => fetchClowns())
  .then(() => fetchCompletedParties())
  .then(() => {
    mainContainer.innerHTML = ButtonsClown()
  })
}

render()