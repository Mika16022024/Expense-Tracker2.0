const form = document.querySelector("form");
const expenseList = document.querySelector("#expense-list");
let total = 0;
let expenses = [];
const savedExpenses = localStorage.getItem("expenses");

if (savedExpenses) {
    expenses = JSON.parse(savedExpenses);
}
function displayExpense(expenseData) {
    const expense = document.createElement("div");

    expense.textContent =
        expenseData.name + " - R" + expenseData.amount + " (" + expenseData.category + ")";

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.type = "button";

    deleteButton.addEventListener("click", function() {
        expenses = expenses.filter(function(item) {
            return item !== expenseData;
        });

        total -= expenseData.amount;
        document.querySelector("#total").textContent = total;

        localStorage.setItem("expenses", JSON.stringify(expenses));

        expense.remove();

        updateSummary();
    });

    expense.appendChild(deleteButton);
    expenseList.appendChild(expense);
}
expenses.forEach(function(expenseData) {
    displayExpense(expenseData);
    total += expenseData.amount;
});

document.querySelector("#total").textContent = total;
const summary = {};

expenses.forEach(function(expenseData) {
    if (summary[expenseData.category]) {
        summary[expenseData.category] += expenseData.amount;
    } else {
        summary[expenseData.category] = expenseData.amount;
    }
});
function updateSummary() {
    const summary = {};

    expenses.forEach(function(expenseData) {
        if (summary[expenseData.category]) {
            summary[expenseData.category] += expenseData.amount;
        } else {
            summary[expenseData.category] = expenseData.amount;
        }
    });

    const summaryElement = document.querySelector("#summary");
    summaryElement.innerHTML = "";

    for (let category in summary) {
        const item = document.createElement("p");

        item.textContent = category + ": R" + summary[category];

        summaryElement.appendChild(item);
    }
}
updateSummary();
form.addEventListener("submit", function(event) {
    event.preventDefault();

    const expenseName = document.querySelector('input[type="text"]').value;
    const amount = document.querySelector('input[type="number"]').value;
    const category = document.querySelector("#category").value;
    if (expenseName === "" || amount === "") {
    alert("Please enter an expense and amount.");
    return;
}

expenses.push({
    name: expenseName,
    amount: Number(amount),
    category: category
});

localStorage.setItem("expenses", JSON.stringify(expenses));
updateSummary();
total += Number(amount);
document.querySelector("#total").textContent = total;
   const expense = document.createElement("div");

expense.textContent = expenseName + " - R" + amount + " (" + category + ")";

const deleteButton = document.createElement("button");
deleteButton.textContent = "Delete";
deleteButton.type = "button";

deleteButton.addEventListener("click", function() {
    total -= Number(amount);
    document.querySelector("#total").textContent = total;

    expenses = expenses.filter(function(item) {
        return item.name !== expenseName || item.amount !== Number(amount);
    });

    localStorage.setItem("expenses", JSON.stringify(expenses));

    expense.remove();
});
updateSummary();

expense.appendChild(deleteButton);
expenseList.appendChild(expense);

    form.reset();
});