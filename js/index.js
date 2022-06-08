let addTodoInp = document.getElementById("addTodoInp");
let lock = document.querySelectorAll("#lock");
let remove = document.getElementById("remove");
let dateArr = [];
// addTodoInp.onkeyup = function (e) {
//   e = e || window.event;
//   if (e.keyCode === 13 && this.value) {
//     // 生成todos的描述的数据
//     let todoObj = {
//       todo: this.value,
//       isDone: false,
//     };
//     dateArr.push(todoObj);
//   }
// };
// let flag = false;
// lock.addEventListener("click", function () {
//   flag != flag;
//   lock.className = "glyphicon glyphicon-pencil";
// });
let flag = false;
for (let i = 0; i < lock.length; i++) {
  lock[i].addEventListener("click", function () {
    flag !== flag;
    if (flag != flag) {
      this.className = "glyphicon glyphicon-pencil";
    } else {
      this.className = "glyphicon glyphicon-lock actions-icon";
    }
  });
}
