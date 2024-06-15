# Gnipper

Gnipper is a mock API that simulates the functionality of Gnasher for managing villa bookings. This API provides endpoints to list, create, update, and delete villas and bookings.

## Endpoints

### Villas

- `GET /villas`
  - Retrieves a list of all villas.

- `GET /villas/:villaId`
  - Retrieves details of a specific villa by UUID.

- `POST /villas`
  - Creates a new villa.

- `PUT /villas/:villaId`
  - Updates details of a specific villa by UUID.

- `DELETE /villas/:villaId`
  - Deletes a specific villa by UUID.

### Bookings

- `GET /bookings`
  - Retrieves a list of all bookings.

- `GET /bookings/:bookingId`
  - Retrieves details of a specific booking by ID.

- `POST /bookings`
  - Creates a new booking.

- `PUT /bookings/:bookingId`
  - Updates details of a specific booking by ID.

- `DELETE /bookings/:bookingId`
  - Deletes a specific booking by ID.

## Running the Project

### Prerequisites

- Node.js installed on your machine.

### Setup

1. Clone the repository:

```sh
git clone https://github.com/tdobson/gnipper.git
cd gnipper

