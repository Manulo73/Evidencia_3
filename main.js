// Document Elements


// HTML Functions
function saveTableData() {
    const tableRows = document.querySelectorAll("#ingresosTable tbody tr");
    const tableData = [];

    tableRows.forEach(row => {
        const fecha = row.querySelector('input[name="ingresoFecha[]"]').value;
        const origen = row.querySelector('input[name="ingresoOrigen[]"]').value;
        const cantidad = row.querySelector('input[name="ingresoCantidad[]"]').value;

        tableData.push({ fecha, origen, cantidad });
    });

    localStorage.setItem("ingresosData", JSON.stringify(tableData));
}

function loadTableData() {
    const savedData = JSON.parse(localStorage.getItem("ingresosData")) || [];
    const tbody = document.querySelector("#ingresosTable tbody");
    tbody.innerHTML = "";

    savedData.forEach(data => {
        const newRow = document.createElement("tr");

        newRow.innerHTML = `
            <td><input type="date" name="ingresoFecha[]" value="${data.fecha}" /></td>
            <td><input type="text" name="ingresoOrigen[]" value="${data.origen}" placeholder="Origen" /></td>
            <td><input type="number" name="ingresoCantidad[]" value="${data.cantidad}" placeholder="Cantidad" /></td>
        `;

        tbody.appendChild(newRow);
    });
}

function addIngreso() {
    const table = document.getElementById("ingresosTable").querySelector("tbody");
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
        <td><input type="date" name="ingresoFecha[]" /></td>
        <td><input type="text" name="ingresoOrigen[]" placeholder="Origen" /></td>
        <td><input type="number" name="ingresoCantidad[]" placeholder="Cantidad" /></td>
    `;
    table.appendChild(newRow);
}

function saveGastosData() {
    const tableRows = document.querySelectorAll("#gastosTable tbody tr");
    const tableData = [];

    tableRows.forEach(row => {
        const fecha = row.querySelector('input[name="gastoFecha[]"]').value;
        const categoria = row.querySelector('input[name="gastoCategoria[]"]').value;
        const cantidad = row.querySelector('input[name="gastoCantidad[]"]').value;

        tableData.push({ fecha, categoria, cantidad });
    });

    localStorage.setItem("gastosData", JSON.stringify(tableData));
}

// Function to load "Gastos" table data from localStorage
function loadGastosData() {
    const savedData = JSON.parse(localStorage.getItem("gastosData")) || [];
    const tbody = document.querySelector("#gastosTable tbody");
    tbody.innerHTML = "";

    savedData.forEach(data => {
        const newRow = document.createElement("tr");

        newRow.innerHTML = `
            <td><input type="date" name="gastoFecha[]" value="${data.fecha}" /></td>
            <td><input type="text" name="gastoCategoria[]" value="${data.categoria}" placeholder="Categoría" /></td>
            <td><input type="number" name="gastoCantidad[]" value="${data.cantidad}" placeholder="Cantidad" /></td>
        `;

        tbody.appendChild(newRow);
    });
}

// Function to add a new row to the Gastos table
function addGasto() {
    const table = document.getElementById("gastosTable").querySelector("tbody");
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
        <td><input type="date" name="gastoFecha[]" /></td>
        <td><input type="text" name="gastoCategoria[]" placeholder="Categoría" /></td>
        <td><input type="number" name="gastoCantidad[]" placeholder="Cantidad" /></td>
    `;
    table.appendChild(newRow);
}

function saveMoneyData() {
    const moneyValue = document.getElementById("saveMoney").value;
    
    // Save the value to localStorage
    localStorage.setItem("saveMoney", moneyValue);
}

// Function to load 'saveMoney' data from localStorage when the page loads
function loadMoneyData() {
    const savedMoney = localStorage.getItem("saveMoney");

    // If data exists, set it to the input field
    if (savedMoney !== null) {
        document.getElementById("saveMoney").value = savedMoney;
    }
}

function calculateIngresos() {
    const tableRows = document.querySelectorAll("#ingresosTable tbody tr");
    let totalIngresos = 0;

    tableRows.forEach(row => {
        const cantidad = parseFloat(row.querySelector('input[name="ingresoCantidad[]"]').value) || 0;
        totalIngresos += cantidad;
    });

    return totalIngresos;
}

// Function to calculate the total of gastos
function calculateGastos() {
    const tableRows = document.querySelectorAll("#gastosTable tbody tr");
    let totalGastos = 0;

    tableRows.forEach(row => {
        const cantidad = parseFloat(row.querySelector('input[name="gastoCantidad[]"]').value) || 0;
        totalGastos += cantidad;
    });

    return totalGastos;
}

function updateCalculations() {
    // Get total ingresos and gastos
    const totalIngresos = calculateIngresos();
    const totalGastos = calculateGastos();

    // Calculate the result for "ab" (Ingresos - Gastos)
    const ab = totalIngresos - totalGastos;
    if (ab > 0) { document.getElementById("ab").style.color = "green"; } else { document.getElementById("ab").style.color = "red"; }
    document.getElementById("ab").innerText = ab.toFixed(2); // Display the result in "ab"

    // Get the save money value
    const saveMoney = parseFloat(document.getElementById("saveMoney").value) || 0;

    // Calculate the result for "cd" (ab - saveMoney)
    const cd = ab - saveMoney;
    if (cd > 0) { document.getElementById("cd").style.color = "green"; } else { document.getElementById("cd").style.color = "red"; }
    document.getElementById("cd").innerText = cd.toFixed(2); // Display the result in "cd"

    // Calculate the result for "cd4" (cd / 4)
    const cd4 = cd / 4;
    if (cd4 > 0) { document.getElementById("cd4").style.color = "green"; } else { document.getElementById("cd4").style.color = "red"; }
    document.getElementById("cd4").innerText = cd4.toFixed(2); // Display the result in "cd4"
}

function updateTotals(num) {
    // Reset daily totals
    const dailyTotals = {
        Lunes: 0,
        Martes: 0,
        Miercoles: 0,
        Jueves: 0,
        Viernes: 0,
        Sabado: 0,
        Domingo: 0
    };

    let grandTotal = 0;

    // Calculate category totals and update daily totals
    let rows = "";
    if (num == 0) {
        rows = document.querySelectorAll('#expenseTable tbody tr');
    } else if (num == 1) {
        rows = document.querySelectorAll('#expenseTable1 tbody tr');
    } else if (num == 2) {
        rows = document.querySelectorAll('#expenseTable2 tbody tr');
    } else if (num == 3) {
        rows = document.querySelectorAll('#expenseTable3 tbody tr');
    }


    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        if (cells.length > 1 && !row.classList.contains('total-row')) {
            let rowTotal = 0;

            for (let i = 1; i <= 7; i++) {
                const input = cells[i].querySelector('input');
                const value = parseFloat(input.value) || 0;
                rowTotal += value;

                // Update daily totals
                const dayName = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'][i - 1];
                dailyTotals[dayName] += value;
            }

            // Update the category total
            cells[8].textContent = rowTotal;

            // Update grand total
            grandTotal += rowTotal;
        }
    });

    if (num == 0){
        // Update daily totals in the table
        for (const day in dailyTotals) {
            const dailyTotalCell = document.getElementById(`total${day}`);
            if (dailyTotalCell) {
                dailyTotalCell.textContent = dailyTotals[day];
            }
        }
    } else {
        for (const day in dailyTotals) {
            const dailyTotalCell = document.getElementById(`total${day}${num}`);
            if (dailyTotalCell) {
                dailyTotalCell.textContent = dailyTotals[day];
            }
        }
    }

    if (num == 0) {
        document.getElementById('grandTotal').textContent = grandTotal;
    } else if (num == 1) {
        document.getElementById('grandTotal1').textContent = grandTotal;
    } else if (num == 2) {
        document.getElementById('grandTotal2').textContent = grandTotal;
    } else if (num == 3) {
        document.getElementById('grandTotal3').textContent = grandTotal;
    }

    res1 = parseFloat(document.getElementById('grandTotal').textContent) || 0;
    res2 = parseFloat(document.getElementById('grandTotal1').textContent) || 0;
    res3 = parseFloat(document.getElementById('grandTotal2').textContent) || 0;
    res4 = parseFloat(document.getElementById('grandTotal3').textContent) || 0;
    document.getElementById("r1").textContent = res1 + res2 + res3 + res4;

    document.getElementById("r2").textContent = parseFloat(document.getElementById("ab").textContent) - (res1 + res2 + res3 + res4);

    saveTableDataWeek(num);
}

function saveTableDataWeek(num) {
    const tableId = `#expenseTable${num === 0 ? "" : num} tbody tr`;
    const rows = document.querySelectorAll(tableId);

    const tableData = [];
    rows.forEach(row => {
        const rowData = [];
        const cells = row.querySelectorAll('td');

        cells.forEach(cell => {
            const input = cell.querySelector('input');
            if (input) {
                rowData.push(input.value || ""); // Save input values
            } else {
                rowData.push(cell.textContent.trim()); // Save text content
            }
        });

        tableData.push(rowData);
    });

    // Save to localStorage with a unique key for the table
    localStorage.setItem(`tableData${num}`, JSON.stringify(tableData));
}

function loadTableDataWeek(num) {
    const tableKey = `tableData${num}`;
    const tableData = JSON.parse(localStorage.getItem(tableKey));
    console.log(tableData);

    if (!tableData) return; // No data to load

    let rows = "";
    if (num == 0) {
        rows = document.querySelectorAll('#expenseTable tbody tr');
    } else if (num == 1) {
        rows = document.querySelectorAll('#expenseTable1 tbody tr');
    } else if (num == 2) {
        rows = document.querySelectorAll('#expenseTable2 tbody tr');
    } else if (num == 3) {
        rows = document.querySelectorAll('#expenseTable3 tbody tr');
    }

    rows.forEach((row, rowIndex) => {
        const cells = row.querySelectorAll('td');

        tableData[rowIndex]?.forEach((data, cellIndex) => {
            const input = cells[cellIndex]?.querySelector('input');
            if (input) {
                input.value = data; // Populate input values
            } else if (cells[cellIndex]) {
                cells[cellIndex].textContent = data; // Populate text content
            }
        });
    });

    // Recalculate totals after loading
    updateTotals(num);
}

document.getElementById("saveData").addEventListener("click", function() {
    saveGastosData();
    saveTableData();
    saveMoneyData();
});

document.getElementById("topBar_title").addEventListener("click", function() {
    location.href='index.html';
});

document.getElementById("updateBtn").addEventListener("click", updateCalculations);

window.addEventListener("load", function() {
    loadGastosData();
    loadTableData();
    loadMoneyData();
    updateCalculations();
    updateTotals(0);
    loadTableDataWeek(0);
    loadTableDataWeek(1);
    loadTableDataWeek(2);
    loadTableDataWeek(3);
});