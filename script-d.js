

let data = {};

const apiUrl = 'https://cors-anywhere.herokuapp.com/https://ommu1982.pythonanywhere.com/static/boligprisstatistikk.json';

async function dataSet() {
    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        data = await response.json();
        console.log('Fetched data:', data); // Log data to inspect its structure

        populateSelect(data);

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function populateSelect(data) {
    const selectElement = document.getElementById('citySelect');

    // Check if data is not an object
    if (typeof data !== 'object' || data === null) {
        console.error('Error: Data is not an object or is null');
        return;
    }

    // Clear existing options
    selectElement.innerHTML = '';

    // Iterate over keys (city names) in the object
    Object.keys(data).forEach(cityName => {
        const option = document.createElement('option');
        
        option.value = cityName;  // Use the city name as the option value
        option.textContent = cityName;  // Use the city name as the option text content
        selectElement.appendChild(option);

    });

    // Trigger display of initial city data
    displayCityData(data);
}

function displayCityData(data) {

    let selectedCity = document.getElementById('citySelect').value;
    console.log(selectedCity);

    let cityData = data[selectedCity]; // Retrieve data for the selected city
    
    const cityDataElement = document.getElementById('PriceSelect');

        // Clear previous data
        cityDataElement.innerHTML = '';

        // Populate the PriceSelect dropdown with properties of the selected city
        const properties = Object.keys(cityData).slice(0, 6);
        properties.forEach(property => {
            const option = document.createElement('option');
            option.value = property;  // Use the property name as the option value
            option.textContent = property;  // Use the property name as the option text content
            cityDataElement.appendChild(option);
        });

        displayCityPriceData(cityData);
}

function displayCityPriceData(cityData) {


    const selectedCityPrice = document.getElementById('PriceSelect').value;
    const cityDataDetails = cityData[selectedCityPrice]; // Retrieve details for the selected property

    const cityDataContainer = document.getElementById('cityData');
    cityDataContainer.innerHTML = ''; // Clear previous data


// Convert cityDataDetails to a number if possible
let cityDataAddPercent = cityDataDetails;
let cityDataColor = parseFloat(cityDataDetails);

if (!isNaN(cityDataAddPercent)) {
    // If it's a valid number, use it for calculations
        cityDataAddPercent += " %"; // Add % sign if not already present
}

// Create a header to display the details
const header = document.createElement('h2');
header.textContent = cityDataAddPercent;

// Change color based on value
if (!isNaN(cityDataColor) && cityDataColor > 0) {
    header.style.color = "#65B970";
    header.classList.add("theNumberchange-positive");
} else {
    if (cityDataColor === 0) {
        header.style.color = "#0A8DFF";  
    } else {
    header.style.color = "#FF5A5A";
    header.classList.add("theNumberchange-negative");
}
}

cityDataContainer.appendChild(header);



/*
if (Array.isArray(propertyValue) && propertyValue.length === 2) {
    // Convert propertyValue elements to numbers if necessary
    let num1 = parseFloat(propertyValue[0]);
    let num2 = parseFloat(propertyValue[1]);
    let Averagem2 = num1 / num2;
    console.log(num1);
}*/



const propertiesToDisplay = Object.keys(cityData).slice(6, 8);


propertiesToDisplay.forEach((property, index) => {

    

    let propertyValue = cityData[property];
    console.log(propertyValue);





    // Ensure propertyValue is treated as a number
    if (typeof propertyValue === 'string') {
        propertyValue = propertyValue.replace(/\s/g, '');
        propertyValue = parseFloat(propertyValue); // Convert to number if it's a string
    }

    // Check if propertyValue is a number and compute propertyNumber accordingly
    if (!isNaN(propertyValue) && typeof cityDataDetails === 'number' && cityDataDetails !== 0) {
        let percentageVal = cityDataDetails / 100;
        const result = propertyValue / (1 + percentageVal);

      /*  measureAveragem2(result);*/

/*
        if (!window.resultArray) {
            window.resultArray = [];
        }
        
        // Push the result to the array
        window.resultArray.push(result);
    
        let Averagem2 = 0;
        if (window.resultArray.length >= 2) {
            Averagem2 = window.resultArray[1] / window.resultArray[0];
        }
        console.log(Averagem2); // Log the array to verify
     
*/


        console.log(propertyValue);

        const div2 = document.createElement('p');
        const div = document.createElement('h2');
        const formattedResult = result.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "); // Add spaces back
        div2.textContent = `${property}`; // Display with 2 decimal places and spaces
        div.textContent = `${formattedResult} kr`; // Display with 2 decimal places and spaces
        cityDataContainer.appendChild(div);
        cityDataContainer.appendChild(div2);
        div.classList.add(`numberAverage-${index}`);
        div2.classList.add(`numberAverage2-${index}`);
        
    } else {
        const div2 = document.createElement('p');
        const div = document.createElement('h2');
        const formattedValue = propertyValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "); // Add spaces back
        div2.textContent = `${property}`; // Display with 2 decimal places and spaces
        div.textContent = `${formattedValue} kr`; // Display with 2 decimal places and spaces
        cityDataContainer.appendChild(div);
        cityDataContainer.appendChild(div2);
        div.classList.add(`numberAverage-${index}`);
        div2.classList.add(`numberAverage2-${index}`);
    }
/*
    let addAverageNumber = document.getElementById('numberAverage2-0');
    addAverageNumber.textContent = `${Averagem2}`;
    cityDataContainer.appendChild(addAverageNumber);
*/
});

}
/*
function measureAveragem2(result) {
    // Initialize an array if not already initialized
    if (!window.resultArray) {
        window.resultArray = [];
    }
    
    // Push the result to the array
    window.resultArray.push(result);

    let Averagem2 = window.resultArray[1] / window.resultArray[0];
    console.log(Averagem2); // Log the array to verify
  
}*/


// Populate the <select> with city names when the page loads
document.addEventListener('DOMContentLoaded', () => {
    dataSet(); // Fetch data and populate the <select>
    displayCityImage(data);
});

setTimeout(() => {
document.getElementById('citySelect').addEventListener('change', () => {
        displayCityData(data);
        displayCityImage(data);
},

document.getElementById('PriceSelect').addEventListener('change', () => {
    displayCityPriceData(data[document.getElementById('citySelect').value]); // Display detailed data for the selected property
})

);}, 500);



function displayCityImage() {
    let selectedCity = document.getElementById('citySelect').value;
    let focusImage = document.getElementById('mapNorway');
    console.log(selectedCity);

   // let cityData = data[selectedCity]; // Retrieve data for the selected city

    let intialZoom = focusImage.style.width = '300%';

    switch (selectedCity) {
        case "Oslo":
            focusImage.style.transform = 'translate(2%, -80%)'; // Center position
            intialZoom;
            break;
        case "Bergen":
            focusImage.style.transform = 'translate(13%, -66%)'; // Top left corner
            intialZoom;
            break;
        case "Kristiansand m/omegn":
            focusImage.style.transform = 'translate(12%, -87%)'; // Adjust position as needed
            intialZoom;
            break;
         case "Trondheim":
             focusImage.style.transform = 'translate(1%, -57%)'; // Adjust position as needed
             intialZoom;
             break;
        case "Stavanger m/omegn":
            focusImage.style.transform = 'translate(18%, -81%)'; // Adjust position as needed
            intialZoom;
            break;
        case "Tromsø":
            focusImage.style.transform = 'translate(-30%, -8%)'; // Adjust position as needed
            intialZoom;
            break;
        case "Norge":
            focusImage.style.transform = 'translate(90%, 5%)'; // Adjust position as needed
            focusImage.style.width = '50%'; // Default position
            break;
        // Add more cases for other cities as needed
        default:
            // Handle default or unexpected value
            focusImage.style.transform = 'translate(2%, -80%)';
            intialZoom;
            break;
    }
}


