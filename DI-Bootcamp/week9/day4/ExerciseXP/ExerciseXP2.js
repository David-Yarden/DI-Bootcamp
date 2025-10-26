const colors = ["Blue", "Green", "Red", "Orange", "Violet", "Indigo", "Yellow"];
const ordinal = ["th", "st", "nd", "rd"];

colors.forEach((color, index) => {
  const pos = index + 1;
  const suffix = pos % 10 == 1 && pos != 11 ? ordinal[1] :
                 pos % 10 == 2 && pos != 12 ? ordinal[2] :
                 pos % 10 == 3 && pos != 13 ? ordinal[3] :
                 ordinal[0];
  console.log(`${pos}${suffix} choice is ${color}.`);
});
