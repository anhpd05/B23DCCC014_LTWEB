// 1. ES6 variables
// - localScope : chỉ ảnh hưởng bên trong hàm
// - globalScope : mang tính toàn cục
// EX1 :  localScope
// var a ;
var test = () => {
  var a = 2;
  console.log(a);
};
test();
// console.log(a); // in ra là : a is not defined

// EX2 :
var x = 10;
function myFnc() {
  x = x + 5;
  console.log(x);
}
console.log(x); // output : 10
myFnc(); // output : 15

// 2 .ES6 default parameters
// Tham số mặc định (default parameters) cho phép các tham số mang giá trị
// mặc định nếu tham số không có giá trị hoặc giá trị không xác định (undefined).

// Hoặc có thể hiểu tham số mặc định là tham số ban đầu được gán cho function.

// Xem ví dụ bên dưới để rõ hơn về tham số mặc định:

// 2.1 : ES6 - khai báo tham số mặc định
//         Có 2 cách khai báo tham số mặc định: gán mặc định tại vị trí khai báo
//         và gán bên trong function.
//         Gán mặc định tại vị trí khai báo

var defaultTest = (a, b = 0) => {
  return a + b;
};

var test1 = defaultTest(2);
console.log(test1); // output : 2

// 2.2 : Gán bên trong function

var member = (name) => {
  name = name || "Guess";
  return name;
};
var nameTest1 = member("AnhPD");
console.log(nameTest1); // AnhPD

var nameTest12 = member();
console.log(nameTest12); //
// 3.ES6 - spread syntax

// Spread syntax
//     - Cú pháp spread cho phép một phép lặp lại các phần tử của mãng (array)
//     hay đối tượng (object).

//     - Cú pháp spread được thể hiện dưới dạng dấu ..., xem ví dụ bên dưới để hiểu
//     rõ hơn nhé.

// 3.1 : Spread syntax với Array
const ownArray = ["AnhPD", 2, 3];
const newArray = [...ownArray, 54, 4, "NNNN"];
console.log(newArray);
// output : ['AnhPD', 2, 3, 54, 4, 'NNNN']

// 3.2 : Spread syntax với Object
//       Cũng tương tự như Array, ta xét ví dụ về Object sau:

const ownObj = {
  fullname: "AnhPD",
};

const newObj = {
  ...ownObj,
  age: 4,
};

console.log(newObj); // output : {fullname: 'AnhPD', age: 4}

// 4.ES6 - rest parameters
//     Rest parameters
//     - Tham số "còn lại" (rest parameters), là tham số đại diện
//     cho những tham số không được khai báo.

//     - Khi sử dụng khai báo đại diện bên trong một function
//     thì khi gọi function sẽ không giới hạn giá trị truyền vào.

//     - Đại diện này được ký hiệu bằng khai báo ...name
//     (cẩn thận coi chừng nhầm lẫn với spread syntax).

const testAgrument = (x, y, ...array) => {
  console.log("biến x:", x);
  console.log("biến y:", y);
  console.log("biến khác ", array);
};
testAgrument(23, 42, 23, 2, 3, 2, 3, 2, 4, 11, 9);

// function number(num1, num2, ...numOther){
//     console.log("x:", num1);
//     console.log("y:", num2);
//     console.log("Other number:", numOther);
//   }
//   number("one", "two", "three", "four", "five", "six");
//   /* ouput:
//   x: one
//   y: two
//   Other number: (4) ["three", "four", "five", "six"] */

// 5.ES6 destructuring
//     ES6 Destructuring (phá vỡ cấu trúc).
//     - Destructuring (phá vỡ cấu trúc) cho phép chúng ta dễ dàng
//       sử dụng các giá trị phần tử của Array hoặc Object.

//     - Destructuring rất hữu dụng khi làm việc với function có đối số.

//     - Xem các ví dụ bên dưới để rõ hơn về destructuring nhé.

// Ví dụ 1 :
var test001 = [23, "AnhPD"];
var [a, b] = test001;
console.log(a); // out put :23
console.log(b); // out put : AnhPD

// Ví dụ 2 :
var test002 = {
  tên: "AnhPD",
  tuổi: 19,
};
var { tên, tuổi } = test002;
console.log(tên); // out put : AnhPD
console.log(tuổi); // out put : 19

// 6.ES6 arrow function
// - Không có tính hoisting (fix : khai báo đầu)
// - Không có agrument hỗ trợ ( fixx bằng : rest parameters)
// - Dùng với "this" sẽ hiện ra là window
// - Đã có VD ở trên .

// 7. ES6 Classes
//     - Classes là một dạng function đặc biệt, thay vì sử dụng từ
//       function thì chúng ta sử dụng class và thuộc tính được gán bên
//       trong phương thức constructor().

//     - Classes có tính kế thừa (inheritance), dễ dàng kế thừa tất cả phương thức
//       từ Classes đã có trước đó.

// Ví dụ 1 :
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  show() {
    return `Tôi tên là: ${this.name}, ${this.age} tuổi`;
  }
}
let person1 = new Person("Nguyen Van A", 18);
console.log(person1);

// Ví dụ 2 :
class Member {
  constructor(name, age, address) {
    this.name = name;
    this.age = age;
    this.address = address;
  }

  memberName() {
    return this.name;
  }
}

class User extends Member {
  constructor(name, age, address, bod, phone) {
    super(name, age, address);
    (this.bod = bod), (this.phone = phone);
  }

  memberInfo() {
    return (
      this.memberName() + ` Tuổi :${this.age} ` + `Địa chỉ ${this.address}`
    );
  }
}
var per1 = new User("anh", 18, "5/7/2005", "012334123");
console.log(per1.memberName());
console.log(per1.memberInfo());
