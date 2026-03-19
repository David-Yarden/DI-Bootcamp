const API_KEY = "5f9b2d4e8c3a1f7e6d0b9c2a4e8f1d3b"; // replace with your own key from exchangerate-api.com

const fromSelect = document.getElementById("from");
const toSelect = document.getElementById("to");
const amountInput = document.getElementById("amount");
const convertBtn = document.getElementById("convert-btn");
const switchBtn = document.getElementById("switch-btn");
const resultDiv = document.getElementById("result");
const errorDiv = document.getElementById("error");

// ── Fetch and populate supported currencies ───────────────────
async function loadCurrencies() {
  try {
    const response = await fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/codes`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const data = await response.json();
    if (data.result !== "success") throw new Error(data["error-type"]);

    data.supported_codes.forEach(([code, name]) => {
      const optionFrom = new Option(`${code} - ${name}`, code);
      const optionTo = new Option(`${code} - ${name}`, code);
      fromSelect.appendChild(optionFrom);
      toSelect.appendChild(optionTo);
    });

    // default selections
    fromSelect.value = "USD";
    toSelect.value = "EUR";
  } catch (error) {
    showError("Failed to load currencies: " + error.message);
  }
}

// ── Convert currency ──────────────────────────────────────────
async function convertCurrency() {
  clearMessages();
  const from = fromSelect.value;
  const to = toSelect.value;
  const amount = parseFloat(amountInput.value);

  if (!amount || amount <= 0) {
    showError("Please enter a valid amount.");
    return;
  }

  try {
    const response = await fetch(
      `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${from}/${to}/${amount}`
    );
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const data = await response.json();
    if (data.result !== "success") throw new Error(data["error-type"]);

    resultDiv.textContent = `${amount} ${from} = ${data.conversion_result.toFixed(2)} ${to}`;
  } catch (error) {
    showError("Conversion failed: " + error.message);
  }
}

// ── Switch currencies ─────────────────────────────────────────
switchBtn.addEventListener("click", () => {
  const temp = fromSelect.value;
  fromSelect.value = toSelect.value;
  toSelect.value = temp;

  // if there's already a result, reconvert with switched currencies
  if (resultDiv.textContent) {
    convertCurrency();
  }
});

convertBtn.addEventListener("click", convertCurrency);

function showError(msg) {
  errorDiv.textContent = msg;
  resultDiv.textContent = "";
}

function clearMessages() {
  errorDiv.textContent = "";
  resultDiv.textContent = "";
}

// init
loadCurrencies();
