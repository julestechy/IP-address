const API_KEY = "at_spsxcr8p149QPfcJOfzCJV0VmdSXX"; //FIXME: move to .env file
const searchInput = document.getElementById("search");
const form = document.querySelector("form");

const ipDisplay = document.getElementById("ip-display");
const locDisplay = document.getElementById("location-display");
const timeDisplay = document.getElementById("timezone-display");
const ispDisplay = document.getElementById("isp-display");

// init leaflet
const map = L.map("map").setView([51.505, -0.09], 13);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);
let marker = L.marker([51.505, -0.09]).addTo(map);

const updateUI = (data) => {
  const { ip, location, isp } = data;

  ipDisplay.innerText = ip;
  locDisplay.innerText = `${location.city}, ${location.region} ${location.postalCode}`;
  timeDisplay.innerText = `UTC ${location.timezone}`;
  ispDisplay.innerText = isp;

  const latLng = [location.lat, location.lng];
  map.setView(latLng, 13);
  marker.setLatLng(latLng);
};

const getIPData = async (query = "") => {
  try {
    const response = await fetch(
      `https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY}&ipAddress=${query}&domain=${query}`,
    );
    const data = await response.json();
    updateUI(data);
  } catch (error) {
    console.error("Failed to fetch IP data:", error);
    alert("Could not find that IP or Domain.");
  }
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  getIPData(searchInput.value);
});

window.onload = () => getIPData();
