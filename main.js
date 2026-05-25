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

document.getElementById("expenseForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const mssv = document.getElementById("mssv").value.trim();
  const name = document.getElementById("expenseName").value;
  const amount = Number(document.getElementById("expenseAmount").value);
  const type = document.getElementById("expenseType").value;
  const date = document.getElementById("expenseDate").value;

  const formattedAmount = amount.toLocaleString("vi-VN") + " đ";

  const newRowHTML = `
        <tr>
            <td><strong>${mssv}</strong></td>
            <td>${name}</td>
            <td class="text-danger font-weight-bold">${formattedAmount}</td>
            <td><span class="badge badge-secondary p-2">${type}</span></td>
            <td>${date}</td>
        </tr>
    `;

  const tableBody = document.getElementById("expenseTableBody");
  const lastDigit = parseInt(mssv.charAt(mssv.length - 1));

  if (isNaN(lastDigit)) {
    alert("Vui lòng nhập Mã số sinh viên hợp lệ (ký tự cuối phải là số)!");
    return;
  }

  if (lastDigit % 2 !== 0) {
    tableBody.insertAdjacentHTML("afterbegin", newRowHTML);
  } else {
    tableBody.insertAdjacentHTML("beforeend", newRowHTML);
  }

  document.getElementById("expenseForm").reset();
});

window.addEventListener("DOMContentLoaded", () => {
  showGreeting();
});
