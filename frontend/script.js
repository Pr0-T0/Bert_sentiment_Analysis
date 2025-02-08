document.addEventListener("DOMContentLoaded", function () {
    const inputField = document.getElementById("prompt");
    const submitButton = document.querySelector(".submit-button");
    const imagePreview = document.querySelector(".image-preview");
    const happinessBar = document.getElementById("happinessBar");

    // Define sentiment images for different happiness levels
    const sentimentImages = [
        "images/img-cry.jpg",      // Level 0 - Very Sad
        "images/img-sad-max.jpg",  // Level 1 - Sad
        "images/img-sad.jpg",      // Level 2 - Slightly Sad
        "images/img-neutral.jpg",  // Level 3 - Neutral
        "images/img-happy.jpg",    // Level 4 - Happy
        "images/img-laugh.jpg",    // Level 5 - Very Happy
        "images/img-happiest.jpg"  // Level 6 - Happiest
    ];

    const happinessColors = [
        "darkred",  // Level 0
        "red",      // Level 1
        "orange",   // Level 2
        "gray",     // Level 3
        "lightgreen", // Level 4
        "green",    // Level 5
        "darkgreen" // Level 6
    ];

    const happinessWidths = ["10%", "20%", "35%", "50%", "65%", "80%", "100%"];

    let happinessLevel = 3; // Start at neutral (level 3)

    submitButton.addEventListener("click", function () {
        const userInput = inputField.value.trim();

        fetch("http://127.0.0.1:8000/sentiment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: userInput })
        })
        .then(response => response.json())
        .then(data => {
            console.log("API Response:", data); // Debugging output

            if (!data.sentiment) {
                console.error("Invalid response from API:", data);
                return;
            }

            // Adjust happiness level based on sentiment response
            if (data.sentiment === "Positive") {
                happinessLevel = Math.min(happinessLevel + 1, 6); // Increase happiness up to max (6)
            } else if (data.sentiment === "Negative") {
                happinessLevel = Math.max(happinessLevel - 1, 0); // Decrease happiness down to min (0)
            }

            // Update image preview
            imagePreview.src = sentimentImages[happinessLevel];

            // Update happiness bar
            happinessBar.style.width = happinessWidths[happinessLevel];
            happinessBar.style.backgroundColor = happinessColors[happinessLevel];
            inputField.value = "";
        })
        .catch(error => console.error("Error:", error));
    });
});
