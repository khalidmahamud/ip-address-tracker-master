const apiKey = 'at_Na1kYEbyrfO6P7kXTpk542Qu1fa2S';

const infoCard = document.querySelector('.info-card');
const ipAddressText = document.querySelector('#ip-address-text');
const locationText = document.querySelector('#location-text');
const timezoneText = document.querySelector('#timezone-text');
const ispText = document.querySelector('#isp-text');

let userIPAddress;
let city;
let region;
let country;
let timezone;
let isp;
let latitude;
let longitude;

let map;

const getUserIPAddress = () => {
    return fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            return data.ip;
        })
        .catch(error => {
            console.error('Error fetching data.', error);
        });
};

const getIPInfo = (userIPAddress) => {
    return fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress=${userIPAddress}`)
        .then(response => response.json())
        .then(data => {
            city = data.location.city;
            region = data.location.region;
            country = data.location.country;
            timezone = data.location.timezone;
            isp = data.isp;
            latitude = data.location.lat;
            longitude = data.location.lng;

            map = L.map('map').setView([latitude, longitude], 13);
            var marker = L.marker([latitude, longitude]).addTo(map);
        })
        .catch(error => {
            console.error('Error fetching data.', error);
        });
        
}

window.addEventListener('DOMContentLoaded', () => {
    getUserIPAddress()
        .then(userIP => {
            userIPAddress = userIP;
            return getIPInfo(userIPAddress);
        })
        .then(() => {
            ipAddressText.textContent = userIPAddress;
            locationText.textContent = `${city}, ${region}, ${country}`;
            timezoneText.textContent = 'UTC-' + timezone;
            ispText.textContent = isp;
            
            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '© OpenStreetMap'
            }).addTo(map);
        })
        .catch(error => {
            console.error('Error in DOMContentLoaded event:', error);
        });
});
