let party = [
  {
    desert: 'Chocolate Mousse',
    calories: 30,
  },
  {
    desert: 'Apple Pie',
    calories: 15,
  },
  {
    desert: 'Croissant',
    calories: 50,
  },
  {
    desert: 'Strawberry Icecream',
    calories: 5,
  },
]
let calories =party.reduce((sum, item) => {
    if (item.desert !== "Apple Pie") {
        return sum + item.calories;
}
    return sum;
}, 0);
console.log(calories); // 85