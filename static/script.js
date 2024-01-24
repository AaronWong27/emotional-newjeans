// Wait for the DOM to be fully loaded before executing the script
function submitData() {
    // Retrieve the value from the text box
    var inputValue = document.getElementById("largeTextArea").value;


    // Check if the text box is not empty
    if (inputValue.trim() !== '') {
        // Use fetch to send the data to the Python backend
        fetch('/process_data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'user_input=' + encodeURIComponent(inputValue),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Display the result in a pop-up
            var popup = document.createElement("div");
            popup.className = "popup";
            popup.innerHTML = "Detected Emotion: " + data[1] + " with a score of " + data[0]

            if (data[1].toLowerCase() === "surprise") {
                // Load an image for Surprise
                var spotifyEmbed = `<iframe style="border-radius:12px" src="https://open.spotify.com/embed/track/5sdQOyqq2IDhvmx2lHOpwd?utm_source=generator" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`
                popup.innerHTML += spotifyEmbed;
            }
            else if (data[1].toLowerCase() === "happy") {
                // Load an image for Surprise
                var spotifyEmbed = `<iframe style="border-radius:12px" src="https://open.spotify.com/embed/track/0a4MMyCrzT0En247IhqZbD?utm_source=generator" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`
                popup.innerHTML += spotifyEmbed;
            }
            popup.innerHTML +=  "<br><button onclick='closePopup()'>Close</button>";

            document.body.appendChild(popup);
        })
        .catch(error => console.error('Error:', error));
    }
}


function closePopup() {
    var popup = document.querySelector(".popup");
    if (popup) {
        popup.parentNode.removeChild(popup);
    }
}

// Add an event listener for the "keydown" event on the text input
var largeTextArea = document.getElementById("largeTextArea");
    if (largeTextArea) {
        largeTextArea.addEventListener("keydown", function (event) {
            // Check if the pressed key is Enter and the textarea is not empty
            if (event.key === "Enter" && this.value.trim() !== '') {
                // Prevent the form from being submitted
                event.preventDefault();
                // Trigger the data submission
                submitData();
            }
        });
    }

document.getElementById("submitButton").addEventListener("click", function() {
    submitData();
});
