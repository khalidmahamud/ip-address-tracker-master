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
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return data.ip;
    } catch (error) {
        console.error('Error fetching data.', error);
    }
};

const getIPInfo = async (input) => {
    try {
        let url;

        // Check if the input is IP address
        const isIPAddress = /^\d+\.\d+\.\d+\.\d+$/.test(input);
        
        if (isIPAddress) {
            url = `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress=${input}`;
        } else {
            url = `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&domain=${input}`;
        }

        const response = await fetch(url);
        const data = await response.json();
        IPAddress = data.ip;
        city = data.location.city;
        region = data.location.region;
        country = data.location.country;
        timezone = data.location.timezone;
        isp = data.isp;
        latitude = data.location.lat;
        longitude = data.location.lng;

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

