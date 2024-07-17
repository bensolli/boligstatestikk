

// API //
///////////////////////////////////////

let data = {};

const apiUrl = 'https://cors-anywhere.herokuapp.com/https://ommu1982.pythonanywhere.com/static/boligprisstatistikk.json';

async function dataSet() {
    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        data = await response.json();
        console.log('Fetched data:', data);

        populateSelect(data);

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}


// create city selection menu //
///////////////////////////////////////

function populateSelect(data) {
    const selectElement = document.getElementById('citySelect');

    /* Check if data is not an object
    if (typeof data !== 'object' || data === null) {
        console.error('Error: Data is not an object or is null');
        return;
    }*/

    selectElement.innerHTML = '';

    Object.keys(data).forEach(cityName => {
        const option = document.createElement('option');
        
        option.value = cityName;
        option.textContent = cityName;
        selectElement.appendChild(option);
    });

    displayCityData(data);
}



// Create Selection menu for Periods //
///////////////////////////////////////

function displayCityData(data) {

    let selectedCity = document.getElementById('citySelect').value;
    let cityData = data[selectedCity];
    const cityDataElement = document.getElementById('PriceSelect');

    cityDataElement.innerHTML = '';

        const properties = Object.keys(cityData).slice(0, 6);
        properties.forEach(property => {
            const option = document.createElement('option');
            option.value = property; 
            option.textContent = property;
            cityDataElement.appendChild(option);
        });

        displayCityPriceData(cityData);
}


// Display numbers //
///////////////////////////////////////

function displayCityPriceData(cityData) {

    const selectedCityPrice = document.getElementById('PriceSelect').value;
    const cityDataDetails = cityData[selectedCityPrice];
    const cityDataContainer = document.getElementById('cityData');
    cityDataContainer.innerHTML = '';
    
    
    // add % to the percentnumbers that dont have it, and toggle color //
    let cityDataAddPercent = cityDataDetails;
    let cityDataColor = parseFloat(cityDataDetails);

    if (!isNaN(cityDataAddPercent)) {
            cityDataAddPercent += " %";
    }

    const header = document.createElement('h2');
    header.textContent = cityDataAddPercent;

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


    // Iterate the numbers we want to display in HTML //
    const propertiesToDisplay = Object.keys(cityData).slice(6, 8);
    propertiesToDisplay.forEach((property, index) => {

    let propertyValue = cityData[property];
    console.log(propertyValue);

    // To make dynamic calculations we first have to remove the spaces //
    if (typeof propertyValue === 'string') {
        propertyValue = propertyValue.replace(/\s/g, '');
        propertyValue = parseFloat(propertyValue);
    }

    
    const numberValue = document.createElement('h2');
    const numberTitle = document.createElement('p');
    numberTitle.textContent = `${property}`; 

    // Checking that we only want to display calculate with the numbers that is not in a string in the original JSON //
    if (!isNaN(propertyValue) && typeof cityDataDetails === 'number' && cityDataDetails !== 0) {
        let percentageVal = cityDataDetails / 100;
        const result = Math.floor(parseFloat(propertyValue / (1 + percentageVal)));
       // averageM2(result);

        console.log(propertyValue);

        const formattedResult = result.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        numberValue.textContent = `${formattedResult} kr`; 
        
    } else {
        const formattedValue = propertyValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        numberValue.textContent = `${formattedValue} kr`; 
    }

    cityDataContainer.appendChild(numberValue);
    cityDataContainer.appendChild(numberTitle);

    //Adding class to add icon //
    numberValue.classList.add(`numberValue-${index}`);
    numberTitle.classList.add(`numberTitle-${index}`);
});


}


function averageM2(result) {
    const addAverageNumberElements = document.getElementsByClassName("numberTitle-0");

    // Initialize the result array if it doesn't exist
    if (!window.resultArray) {
        window.resultArray = [];
    }

    // Push the result into the array
    window.resultArray.push(result);

    // Check if there are at least two values in the array
    if (window.resultArray.length >= 2) {
        const averageM2Value = window.resultArray[1] / window.resultArray[0];

        console.log(window.resultArray);
        console.log(averageM2Value);

        // Update the text content of each HTML element with class 'numberTitle-0'
        for (let element of addAverageNumberElements) {
            element.textContent += ` ( ${averageM2Value.toFixed(0)} m2 )`; // Display the average rounded to the nearest integer
        }
    }
}



// Populate the <select> with city names when the page loads //
////////////////////////////////////////////////////////////

document.addEventListener('DOMContentLoaded', () => {
    dataSet();
    displayCityImage(data);
});


// updating the function when detecting change //
////////////////////////////////////////////////

setTimeout(() => {

    document.getElementById('citySelect').addEventListener('change', () => {
        displayCityData(data);
        displayCityImage(data);
    },

    document.getElementById('PriceSelect').addEventListener('change', () => {
        displayCityPriceData(data[document.getElementById('citySelect').value]); // Display detailed data for the selected property
    })

);}, 500);


// moving the focus point of the image, depending on the selected city //
////////////////////////////////////////////////////////////////////////

function displayCityImage() {
    let selectedCity = document.getElementById('citySelect').value;
    let focusImage = document.getElementById('mapNorway');
    console.log(selectedCity);


    let intialZoom = focusImage.style.width = '300%';

    switch (selectedCity) {
        case "Oslo":
            focusImage.style.transform = 'translate(2%, -80%)';
            intialZoom;
            break;
        case "Bergen":
            focusImage.style.transform = 'translate(13%, -66%)';
            intialZoom;
            break;
        case "Kristiansand m/omegn":
            focusImage.style.transform = 'translate(12%, -87%)';
            intialZoom;
            break;
         case "Trondheim":
             focusImage.style.transform = 'translate(1%, -57%)';
             intialZoom;
             break;
        case "Stavanger m/omegn":
            focusImage.style.transform = 'translate(18%, -81%)';
            intialZoom;
            break;
        case "Tromsø":
            focusImage.style.transform = 'translate(-30%, -8%)';
            intialZoom;
            break;
        case "Norge":
            focusImage.style.transform = 'translate(120%, 5%)';
            focusImage.style.width = '40%';
            break;
        // Add more cases for other cities as needed //
        default:
            focusImage.style.transform = 'translate(2%, -80%)';
            intialZoom;
            break;
    }
}


