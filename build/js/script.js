const apiKey = 'at_Na1kYEbyrfO6P7kXTpk542Qu1fa2S';

const infoCard = document.querySelector('.info-card');
const ipAddressText = document.querySelector('#ip-address-text');
const locationText = document.querySelector('#location-text');
const timezoneText = document.querySelector('#timezone-text');
const ispText = document.querySelector('#isp-text');
const searchBar = document.querySelector('#search-bar');
const searchBtn = document.querySelector('#search-btn');

let IPAddress;
let city;
let region;
let country;
let timezone;
let isp;
let latitude;
let longitude;

let map;
const myIcon = L.icon({
    iconUrl : './images/icon-location.svg',
    iconAnchor: [22, 94]
});



const getUserIPAddress = async () => {
    try {
        const response = await fetch('http://ip-api.com/json/');
        const data = await response.json();
        return data.query;
    } catch (error) {
        console.error('Error fetching data.', error);
    }
};

const getIPInfo = async (input) => {
    try {
        let url = `http://ip-api.com/json/${input}`;

        const response = await fetch(url);
        const data = await response.json();
        IPAddress = data.query;
        city = data.city;
        region = data.regionName;
        country = data.country;
        timezone = data.timezone;
        isp = data.isp;
        latitude = data.lat;
        longitude = data.lon;

        ipAddressText.textContent = IPAddress;
        locationText.textContent = `${city}, ${region}, ${country}`;
        timezoneText.textContent = 'UTC ' + timezone;
        ispText.textContent = isp;
        
        addMapTile(latitude, longitude);

    } catch (error) {
        console.error('Error fetching data.', error);
    }

};

const addMapTile = (latitude, longitude) => {
    if (!map) {
        map = L.map('map').setView([latitude, longitude], 13);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
        }).addTo(map);
    } else {
        map.setView([latitude, longitude], 13);
    }

    // Clear existing markers
    map.eachLayer(layer => {
        if (layer instanceof L.Marker) {
            map.removeLayer(layer);
        }
    });

    // Add a new marker
    L.marker([latitude, longitude], {icon: myIcon}).addTo(map);
    map.zoomControl.remove();
    L.control.zoom({
        position: 'bottomright'
    }).addTo(map);
};

window.addEventListener('DOMContentLoaded', () => {
    getUserIPAddress()
        .then(userIP => {
            IPAddress = userIP;
            return getIPInfo(IPAddress);
        })
        .catch(error => {
            console.error('Error in DOMContentLoaded event:', error);
        });
});

searchBtn.addEventListener('click', () => {
    const searchedIP = searchBar.value;
    getIPInfo(searchedIP);
});

searchBar.addEventListener('keydown', (e) => {
    if(searchBar.value) {
        if (e.key === "Enter") {
            const searchedIP = searchBar.value;
            getIPInfo(searchedIP);
        }
    }
});

