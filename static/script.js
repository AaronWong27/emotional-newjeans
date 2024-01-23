// Wait for the DOM to be fully loaded before executing the script
function submitData() {
    // Retrieve the value from the text box
    var inputValue = document.getElementById("textBox").value;

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
        .then(response => response.json())
        .then(data => {
            // Display the result in the resultContainer div
            var resultContainer = document.getElementById("resultContainer");
            resultContainer.innerHTML = "Detected Emotion: " + data[1] + " with a score of " + data[0];
        })
        .catch(error => console.error('Error:', error));
    }
}

// Add an event listener for the "keydown" event on the text input
var textBox = document.getElementById("textBox");
if (textBox) {
    textBox.addEventListener("keydown", function(event) {
        // Check if the pressed key is Enter and the text box is not empty
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
