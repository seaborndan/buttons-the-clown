import { BookingForm } from "./BookingForm.js"
import { BookingRequests } from "./BookingRequests.js"

export const ButtonsClown = () => {
  return `
    <h1>Buttons and Lollipop's Clown Service</h1>
    <section class="bookingForm">
    ${BookingForm()}
    </section>

    <section class="bookingRequests">
      <h2>Booking Requests</h2>
      ${BookingRequests()}
    </section>
  `
}