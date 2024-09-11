// bài 1 :
const handelClick = document.getElementById("title");
handelClick.innerHTML = "Hello, DOM!.";

// bài 2 :
const handelClick2 = document.getElementById("text");
handelClick2.style.color = "red";

// bài 4 :

const handelClick4 = document.getElementById("remove").remove();
// console.log(handelClick4)

// bài 9 :
const EleDiv = document.querySelectorAll("div");
const divCount = EleDiv.length;

console.log(`Số lượng phần tử <div> trên trang là: ${divCount}`);

// bài 3 :
const list = document.querySelector("#list");

const newListItem = document.createElement("li");
newListItem.textContent = "Mục mới";
// list.appendChild(newListItem);

// bài 10 :
const handelClick10 = document.querySelectorAll(".item");

// handelClick10.forEach(item => {
//   item.textContent = 'Updated item';
// });
// handelClick10.map((item) => {
//   return item.classList.replace("item", "updatedItem");
// });
// bài 8
// const tableContainer = document.querySelector("#table-container");

// const table = document.createElement("table");

// for (let i = 0; i < 3; i++) {
//   const row = table.insertRow()
//   for (let j = 0; j < 3; j++) {
//     const cell = row.insertCell()
//     cell.textContent = `Hàng ${i + 1}, Cột ${j + 1}`
//   }
// }

// tableContainer.appendChild(table);

// bài 5
function changeImageSrc() {
  const handelClick5 = document.getElementById("image");

  handelClick5.src = "path/to/new-image.jpg";
}

// bài 7
const handelClick7 = document.querySelectorAll("p");
handelClick7.forEach((item) => {
  item.textContent = "Updated paragraph";
});

// Tạo bảng
const tableContainer = document.getElementById("table-container");
console.log(tableContainer);
const table = document.createElement("table");
table.border = "1"; // Thêm viền cho bảng (tùy chọn)

for (let i = 0; i < 3; i++) {
  const row = table.insertRow();
  for (let j = 0; j < 3; j++) {
    // Tạo 3 ô cho mỗi hàng
    const cell = row.insertCell();
    cell.textContent = `Hàng ${i + 1}, Ô ${j + 1}`;
  }
}

tableContainer.appendChild(table);
insertRow;
row.insertCell;
