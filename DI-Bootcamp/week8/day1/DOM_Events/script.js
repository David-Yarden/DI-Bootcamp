function insertRow() {
  let table = document.getElementById("sampleTable");
  let newRow = table.insertRow(-1);
  let cell1 = newRow.insertCell(0);
  let cell2 = newRow.insertCell(1);
  cell1.textContent = "New cell1";
  cell2.textContent = "New cell2";
}
