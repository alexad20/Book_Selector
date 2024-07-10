// Author: Alexa Tolentino
// Description: JavaScript for the Spin the Wheel - Book Selector application
// License: MIT License

// Function to fetch the books from the JSON file
async function fetchBooks() {
    const response = await fetch('./books.json');
    return await response.json();
}

// Event listener for DOMContentLoaded to ensure the DOM is fully loaded before executing the script
document.addEventListener('DOMContentLoaded', async () => {
    // Fetch books from the JSON file
    const books = await fetchBooks();

    // DOM elements
    const wheel = document.getElementById('wheel');
    const spinButton = document.getElementById('spinButton');
    const resultDiv = document.getElementById('result');

    // Initial angle of the wheel
    let currentAngle = 0;

    // Function to create the wheel with book slices
    function createWheel() {
        const sliceAngle = 360 / books.length;
        const colors = ['#b6d084', '#ffcb32', '#2f7604', '#ff5c40'];

        // Loop through books to create slices
        books.forEach((book, index) => {
            const slice = document.createElement('div');
            slice.className = 'slice';
            slice.style.background = colors[index % colors.length];
            slice.style.transform = `rotate(${sliceAngle * index}deg)`;

            const sliceContent = document.createElement('div');
            sliceContent.innerText = `${book.title}`;
            slice.appendChild(sliceContent);

            wheel.appendChild(slice);
        });
    }

    // Function to spin the wheel and select a book
    function spinWheel() {
        const spinAngle = Math.floor(Math.random() * 360) + 3600; // Random spin angle between 3600 and 3960 degrees
        currentAngle += spinAngle;
        wheel.style.transform = `rotate(${currentAngle}deg)`;

        setTimeout(() => {
            const selectedBookIndex = Math.floor((360 - (currentAngle % 360)) / (360 / books.length)) % books.length;
            resultDiv.innerText = `Selected Book: ${books[selectedBookIndex].title} (${books[selectedBookIndex].pages} pages)`;
        }, 4000); // Wait for 4 seconds to simulate the spinning effect
    }

    // Create the wheel when the script runs
    createWheel();

    // Add event listener to the spin button
    spinButton.addEventListener('click', spinWheel);
});
