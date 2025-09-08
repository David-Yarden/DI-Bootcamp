const family = {
    first_son: "David",
    father: "Daniel",
    second_son: "Gabriel",
    mother: "Michèle"
};
for (let key in family) {
  console.log("Key:", key);
}
for (let key in family) {
  console.log("Value:", family[key]);
}