function showGreeting() {
  let hour = new Date().getHours();
  let greeting = document.getElementById("23010001_txt_msg");

  if (!greeting) return;

  if (hour < 12) {
    greeting.innerText = "Chào buổi sáng!";
  } else if (hour < 18) {
    greeting.innerText = "Chào buổi chiều!";
  } else {
    greeting.innerText = "Chào buổi tối!";
  }
}

function renderExpenses() {
  const tableBody = document.getElementById("expenseTableBody");
  if (!tableBody) return;

  tableBody.innerHTML = "";

  let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

  expenses.forEach((item) => {
    const formattedAmount = Number(item.amount).toLocaleString("vi-VN") + " đ";
    const rowHTML = `
            <tr>
                <td><strong>${item.mssv}</strong></td>
                <td>${item.name}</td>
                <td class="text-danger font-weight-bold">${formattedAmount}</td>
                <td><span class="badge badge-secondary p-2">${item.type}</span></td>
                <td>${item.date}</td>
            </tr>
        `;

    const lastDigit = parseInt(item.mssv.charAt(item.mssv.length - 1));
    if (lastDigit % 2 !== 0) {
      tableBody.insertAdjacentHTML("afterbegin", rowHTML);
    } else {
      tableBody.insertAdjacentHTML("beforeend", rowHTML);
    }
  });
}

const formElement = document.getElementById("expenseForm");
if (formElement) {
  formElement.addEventListener("submit", function (e) {
    e.preventDefault();

    const mssv = document.getElementById("mssv").value.trim();
    const name = document.getElementById("expenseName").value;
    const amount = document.getElementById("expenseAmount").value;
    const type = document.getElementById("expenseType").value;
    const date = document.getElementById("expenseDate").value;

    const lastDigit = parseInt(mssv.charAt(mssv.length - 1));
    if (isNaN(lastDigit)) {
      alert("Vui lòng nhập Mã số sinh viên hợp lệ (ký tự cuối phải là số)!");
      return;
    }

    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

    const newExpense = { mssv, name, amount, type, date };
    expenses.push(newExpense);

    localStorage.setItem("expenses", JSON.stringify(expenses));

    renderExpenses();

    formElement.reset();
  });
}

window.addEventListener("DOMContentLoaded", () => {
  showGreeting();
  renderExpenses();
});
