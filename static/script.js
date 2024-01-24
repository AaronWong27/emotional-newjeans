let dvd;

function init() {
    dvd = document.getElementById('dvd');

    if (!dvd) {
        console.error("Element with id 'dvd' not found.");
        return;
    }

    dvd.style.position = 'absolute';
    document.body.style.background = '#4d4d4d';
    setInterval(frame, 5);
}

function handle_collision() {
    let dvd_height = dvd.offsetHeight;
    let dvd_width = dvd.offsetWidth;
    let left = dvd.offsetLeft;
    let top = dvd.offsetTop;
    let win_height = window.innerHeight;
    let win_width = window.innerWidth;

    if (left <= 0 || left + dvd_width >= win_width) {
        x_incr = ~x_incr + 1;
        update_color();
    }
    if (top <= 0 || top + dvd_height >= win_height) {
        y_incr = ~y_incr + 1;
        update_color();
    }
}

function frame() {
    handle_collision();
    dvd.style.top = dvd.offsetTop + y_incr + 'px';
    dvd.style.left = dvd.offsetLeft + x_incr + 'px';
}


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

            if (data[1].toLowerCase() === "fear") {
                // Load an image for Fear
                var spotifyEmbed = `<iframe style="border-radius:12px" src="https://open.spotify.com/embed/track/5sdQOyqq2IDhvmx2lHOpwd?utm_source=generator" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`
                popup.innerHTML += spotifyEmbed;
            }
            else if (data[1].toLowerCase() === "happy") {
                // Load an image for Happy
                var spotifyEmbed = `<iframe style="border-radius:12px" src="https://open.spotify.com/embed/track/0a4MMyCrzT0En247IhqZbD?utm_source=generator" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`
                popup.innerHTML += spotifyEmbed;
            }
            else if (data[1].toLowerCase() === "angry") {
                // Load an image for Angry
                var spotifyEmbed = `<iframe style="border-radius:12px" src="https://open.spotify.com/embed/track/210JJAa9nJOgNa0YNrsT5g?utm_source=generator" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`
                popup.innerHTML += spotifyEmbed;
            }
            else if (data[1].toLowerCase() === "sad") {
                // Load an image for Sad
                var spotifyEmbed = `<iframe style="border-radius:12px" src="https://open.spotify.com/embed/track/5expoVGQPvXuwBBFuNGqBd?utm_source=generator" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`
                popup.innerHTML += spotifyEmbed;
            }
            else {
                // Load an image for Surprise
                var spotifyEmbed = `<iframe style="border-radius:12px" src="https://open.spotify.com/embed/track/65FftemJ1DbbZ45DUfHJXE?utm_source=generator" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`
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



