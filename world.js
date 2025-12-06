document.addEventListener('DOMContentLoaded', function() {
    
    const countryInput = document.getElementById('country'); 
    const resultDiv = document.getElementById('result'); 
    
   
    const lookupCountryButton = document.getElementById('lookup-country');
    const lookupCitiesButton = document.getElementById('lookup-cities'); 

    
    function handleLookup(lookupType) {
        const countryName = countryInput.value.trim();
        
        let url = 'world.php';
        
        if (countryName) {
            url += `?country=${encodeURIComponent(countryName)}`;
        } else {
            url += `?country=`;
        }
        
        if (lookupType === 'cities') {
            url += `&lookup=cities`; 
        }

        const xhr = new XMLHttpRequest();
        
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                resultDiv.innerHTML = xhr.responseText;
            } else if (xhr.readyState === 4) {
                resultDiv.innerHTML = `<p>Error: Could not fetch data (HTTP Status ${xhr.status}). Check server connection.</p>`;
            }
        };

        xhr.open('GET', url, true);
        xhr.send();
    }

    if (lookupCountryButton) {
        lookupCountryButton.addEventListener('click', () => handleLookup('country'));
    }
    if (lookupCitiesButton) {
        lookupCitiesButton.addEventListener('click', () => handleLookup('cities'));
    }
});