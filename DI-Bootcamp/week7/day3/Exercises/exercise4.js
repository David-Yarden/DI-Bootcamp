const building = {
    numberOfFloors: 4,
    numberOfAptByFloor: {
        firstFloor: 3,
        secondFloor: 4,
        thirdFloor: 9,
        fourthFloor: 2,
    },
    nameOfTenants: ["Sarah", "Dan", "David"],
    numberOfRoomsAndRent:  {
        sarah: [3, 990],
        dan:  [4, 1000],
        david: [1, 500],
    },
}
console.log("Number of floors:", building.numberOfFloors);
console.log("Apt on first floor:", building.numberOfAptByFloor.firstFloor);
console.log("Apt on third floor:", building.numberOfAptByFloor.thirdFloor);
console.log("Second tenant:", building.nameOfTenants[1]);
console.log("Rooms of second tenant:", building.numberOfRoomsAndRent.dan[0]);
const sarahRent = building.numberOfRoomsAndRent.sarah[1];
const danRent = building.numberOfRoomsAndRent.dan[1];
const davidRent = building.numberOfRoomsAndRent.david[1];
if (sarahRent + davidRent > danRent) {
    building.numberOfRoomsAndRent.dan[1] = 1200;
    console.log("Dan's new rent:", building.numberOfRoomsAndRent.dan[1]);
}