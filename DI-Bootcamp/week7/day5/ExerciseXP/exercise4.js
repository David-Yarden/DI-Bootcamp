// Function calculates hotel cost
function hotelCost(nights) {
    const pricePerNight = 140;
    return nights * pricePerNight;
}

// Function calculates plane ride cost
function planeRideCost(destination) {
    destination = destination.toLowerCase();
    if (destination === "london") return 183;
    if (destination === "paris") return 220;
    return 300;
}

// Function calculates rental car cost
function rentalCarCost(days) {
    const pricePerDay = 40;
    let total = days * pricePerDay;
    if (days > 10) {
        total *= 0.95; // 5% discount
    }
    return total;
}

// Function that calls the three previous functions and prompts user input
function totalVacationCost() {
    let nights, destination, days;

    // Get number of hotel nights
    while (true) {
        nights = parseInt(prompt("How many nights will you stay in the hotel?"));
        if (!isNaN(nights) && nights >= 0) break;
        alert("Please enter a valid number of nights.");
    }

    // Get destination
    while (true) {
        destination = prompt("What is your destination?");
        if (destination && isNaN(destination)) break;
        alert("Please enter a valid destination (text).");
    }

    // Get number of rental car days
    while (true) {
        days = parseInt(prompt("How many days will you rent the car?"));
        if (!isNaN(days) && days >= 0) break;
        alert("Please enter a valid number of days.");
    }

    const hotel = hotelCost(nights);
    const plane = planeRideCost(destination);
    const car = rentalCarCost(days);
    const total = hotel + plane + car;

    console.log(`The car cost: $${car}, the hotel cost: $${hotel}, the plane tickets cost: $${plane}.`);
    console.log(`Total vacation cost: $${total}`);
    return total;
}

// Call the function
totalVacationCost();
