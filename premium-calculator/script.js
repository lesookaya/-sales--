const funnelTable = document.querySelector("#funnelTable");
const addFunnelRowButton = document.querySelector("#addFunnelRow");

function formatPercent(value) {
  if (!Number.isFinite(value)) {
    return "-";
  }

  return `${Math.round(value)}%`;
}

function updateFunnelConversions() {
  const rows = Array.from(funnelTable.querySelectorAll("tbody tr"));

  rows.forEach((row, index) => {
    const conversionCell = row.querySelector(".conversion");
    const currentValue = Number(row.querySelector(".funnel-value").value);

    if (index === 0) {
      conversionCell.textContent = "-";
      return;
    }

    const previousValue = Number(rows[index - 1].querySelector(".funnel-value").value);
    const conversion = previousValue > 0 ? (currentValue / previousValue) * 100 : NaN;

    conversionCell.textContent = formatPercent(conversion);
  });
}

function addFunnelRow() {
  const tbody = funnelTable.querySelector("tbody");
  const row = document.createElement("tr");

  row.innerHTML = `
    <td><input type="text" value="Новая стадия"></td>
    <td><input class="funnel-value" type="number" min="0" step="1"></td>
    <td class="conversion">-</td>
    <td><button class="icon-button remove-row" type="button" aria-label="Удалить строку">×</button></td>
  `;

  tbody.append(row);
  updateFunnelConversions();
}

function removeFunnelRow(button) {
  const rows = funnelTable.querySelectorAll("tbody tr");

  if (rows.length <= 1) {
    return;
  }

  button.closest("tr").remove();
  updateFunnelConversions();
}

funnelTable.addEventListener("input", (event) => {
  if (event.target.classList.contains("funnel-value")) {
    updateFunnelConversions();
  }
});

funnelTable.addEventListener("click", (event) => {
  if (event.target.classList.contains("remove-row")) {
    removeFunnelRow(event.target);
  }
});

addFunnelRowButton.addEventListener("click", addFunnelRow);
updateFunnelConversions();
