function validation() {
    var $firstName = $("#firstName");
    var $lastName = $("#lastName");
    var $email = $("#email");
    var $mobile = $("#mobile");
    var $zipcode = $("#zipcode");
    var $msg = $("#contact_validation-msg");
    
    // checking required fields
    if ($firstName.val().trim() === "" || !$firstName[0].checkValidity() || 
        $lastName.val().trim() === "" || !$lastName[0].checkValidity() || 
        $email.val().trim() === "" || !$email[0].checkValidity()) {
      
      $msg.html("Please fill out the form correctly. First name, last name, and email are required.<br>(This message will stay until you fix it)")
         .css({
            "background-color": "black",
            "color": "red",
            "font-size": "150%",
            "margin": "5%",
            "padding": "5%"
         });
      return false;
    }
    
    // zipcode validation if not empty
    if ($zipcode.val().trim() !== "" && !$zipcode[0].checkValidity()) {
      $msg.html("Please enter a valid 5-digit zip code.<br>(This message will stay until you fix it)")
         .css({
            "background-color": "black",
            "color": "red",
            "font-size": "150%",
            "margin": "5%",
            "padding": "5%"
         });
      return false;
    }
    
    return true;
}

// Set up the form submission with jQuery
$(document).ready(function() {
    // Make sure the validation message element exists
    if ($("#contact_validation-msg").length === 0) {
        $("#myForm").after('<div id="contact_validation-msg"></div>');
    }
    
    // Handle form submission
    $("#myForm").on("submit", function(e) {
        return validation();
    });
});

//Weather API integration
// Change to use the free Current Weather API
const API_KEY = 'd9c85e06f41a45c33012b1441582abad';

// Coordinates for Pittsburgh, PA
const PITTSBURGH_LAT = 40.4406;
const PITTSBURGH_LON = -79.9959;

// Updated URL to use the free Current Weather API (works with free API keys)
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${PITTSBURGH_LAT}&lon=${PITTSBURGH_LON}&units=imperial&appid=${API_KEY}`;

// Function to fetch the weather data
async function getPittsburghWeather() {
    document.getElementById('weather-temp').innerHTML = '<p>Loading weather data...</p>';
    
    try {
        const response = await fetch(apiUrl);
        
        // Check if the request was successful
        if (!response.ok) {
            throw new Error(`API error: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        document.getElementById('weather-temp').innerHTML = `
            <p class="error">Failed to fetch weather data. Error: ${error.message}</p>
            <p>Make sure you've replaced the API_KEY with your actual OpenWeatherMap API key.</p>
        `;
    }
}

// Updated function to display the weather data from the Current Weather API
function displayWeather(data) {
    // The structure is different in the Current Weather API
    const weatherHTML = `
        ${data.main.temp}°F with ${data.weather[0].description}
    `;
    
    document.getElementById('weather-temp').innerHTML = weatherHTML;
}



document.addEventListener('DOMContentLoaded', function() {
    const lightbox = document.querySelector('.lightbox');
    const lightboxImage = document.querySelector('.lightbox-img');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    let currentIndex = 0;
    
    // opens the lightbox
    function openLightbox(index) {
        const item = galleryItems[index];
        const image = item.querySelector('img');
        const caption = item.getAttribute('data-caption');
        
        lightboxImage.src = image.src;
        lightboxCaption.textContent = caption;
        lightbox.classList.add('active');
        currentIndex = index;
        
        // no scrolling on rest of page
        document.body.style.overflow = 'hidden';
    }
    
    // clses the lightbox
    function closeLightbox() {
        lightbox.classList.remove('active');
        
        // allows scrolling on rest of page
        document.body.style.overflow = '';
    }
    
    // navigates to next image
    function nextImage() {
        currentIndex = (currentIndex + 1) % galleryItems.length;
        const item = galleryItems[currentIndex];
        const image = item.querySelector('img');
        const caption = item.getAttribute('data-caption');
        
        lightboxImage.src = image.src;
        lightboxCaption.textContent = caption;
    }
    
    // navigates to prev image
    function prevImage() {
        currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
        const item = galleryItems[currentIndex];
        const image = item.querySelector('img');
        const caption = item.getAttribute('data-caption');
        
        lightboxImage.src = image.src;
        lightboxCaption.textContent = caption;
    }
    
    // adds click event to gallery items
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            openLightbox(index);
        });
    });
    
    // closes lightbox when click close button
    lightboxClose.addEventListener('click', closeLightbox);
    
    // closes lightbox when click empty space around image
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // click to next img
    lightboxNext.addEventListener('click', nextImage);
    
    // click to prev image
    lightboxPrev.addEventListener('click', prevImage);
    
    // navigating with the keyboard
    document.addEventListener('keydown', function(e) {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowRight') {
            nextImage();
        } else if (e.key === 'ArrowLeft') {
            prevImage();
        }
    });
});

document.addEventListener('DOMContentLoaded', function(){
    getPittsburghWeather();
});

