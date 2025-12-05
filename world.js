document.addEventListener('DOMContentLoaded', function() {
    
    // Get references to the HTML elements using the CORRECT IDs from your index.html
    const lookupButton = document.getElementById('lookup'); 
    const countryInput = document.getElementById('country');
    const resultDiv = document.getElementById('result'); 

   
    if (lookupButton && countryInput && resultDiv) {
        
        lookupButton.addEventListener('click', function(event) {
            
            // Prevent the default form submission (important if the elements are inside a <form>)
            event.preventDefault();
            
            const countryName = countryInput.value.trim();
            
            // Construct the URL based on the input
            let url = 'world.php';
            if (countryName) {
                // If there is input, append the parameter
                url = `world.php?country=${encodeURIComponent(countryName)}`;
            }

            // Initialize the AJAX request
            const xhr = new XMLHttpRequest();
            
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    // Inject the HTML output from world.php into the 'result' div
                    resultDiv.innerHTML = xhr.responseText;
                } else if (xhr.readyState === 4) {
                    resultDiv.innerHTML = `<p>Error: Could not fetch data (HTTP Status ${xhr.status}). Check XAMPP/server logs.</p>`;
                }
            };

            // Open and send the GET request
            xhr.open('GET', url, true);
            xhr.send();
        });
    } 
    
});