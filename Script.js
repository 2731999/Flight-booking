// Function to render flight search results
function renderFlights(flights) {
  const flightsList = document.getElementById('flights-list');

  // Clear existing results
  flightsList.innerHTML = '';

  // Check if flights is defined and is an array
  if (Array.isArray(flights)) {
    // Iterate through each flight and create list items to display the details
    flights.forEach((flight) => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `
        <strong>Flight Number:</strong> ${flight.flight_number} <br>
        <strong>Departure:</strong> ${flight.departure} <br>
        <strong>Destination:</strong> ${flight.destination} <br>
        <strong>Departure Date:</strong> ${flight.departure_date}
      `;
      flightsList.appendChild(listItem);
    });
  } else {
    // Display a message when there are no flights
    const message = document.createElement('li');
    message.textContent = 'No flights found.';
    flightsList.appendChild(message);
  }
}

// Function to handle the flight search
async function searchFlights() {
  const departure = document.getElementById('departure').value;
  const destination = document.getElementById('destination').value;
  const departureDate = document.getElementById('departure-date').value;

  const url = `https://flight-radar1.p.rapidapi.com/aircrafts/list?departure=${departure}&destination=${destination}&departure_date=${departureDate}`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '03bd128d9amshced0efca07213d6p13f502jsn42315dec3de0',
      'X-RapidAPI-Host': 'flight-radar1.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error('Network response was not OK.');
    }
    const result = await response.json();
    const flights = result.data;
    renderFlights(flights);
  } catch (error) {
    console.error('Error fetching or processing data:', error);
  }
}
