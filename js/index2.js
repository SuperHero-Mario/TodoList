// let todolist = [
//   {
//     title: "Jessica",
//     isLocked: true,
//     todos: [
//       {
//         desc: "吃饭",
//         isDone: false,
//       },
//       {
//         desc: "睡觉",
//         isDone: false,
//       },
//       {
//         desc: "打豆豆",
//         isDone: true,
//       },
//     ],
//   },
//   {
//     title: "Mark",
//     isLocked: false,
//     todos: [
//       {
//         desc: "吃饭",
//         isDone: true,
//       },
//       {
//         desc: "睡觉",
//         isDone: false,
//       },
//       {
//         desc: "打豆豆",
//         isDone: false,
//       },
//     ],
//   },
// ];
let todolist = [];
if (localStorage.getItem("todolist")) {
  todolist = JSON.parse(localStorage.getItem("todolist"));
}
// 获取左侧菜单menu的盒子
let menuBox = document.querySelector(".menu");
// 获取添加按钮
let addMenuItemBtn = document.getElementById("addTodo");
// 获取头部的title
let headerTitle = document.getElementById("title");
// 获取头部title的徽标
let headerBadge = document.getElementById("title-badge");
// 获取头部的小锁
let headerLock = document.getElementById("lock");
// 获取todos的容器
let todoItemWrapper = document.querySelector(".todoItemWrapper");
// 获取头部区域请输入的input框;
let addTodoInp = document.getElementById("addTodoInp");
// 获取头部的删除按钮
let headerRemoveBtn = document.getElementById("remove");
// 获取右侧头部的容器
let rightHeaderWrapper = document.querySelector(".header");
//获取头部隐藏title-input框
let titleInput = document.querySelector("#title-input");
// 定义currentIndex变量，来保存当前被选中的menuItem，默认选中第一个menuItem，所以我们这个值为0
let currentIndex = localStorage.getItem("currentIndex") || 0;
//获取头部隐藏title-input框的父级
let titleEditer = document.querySelector(".header .title-editer");
//头部隐藏取消
let cancel = document.querySelector("#cancel");
//获取头部的title的父级
let titleBox = document.querySelector(".titleBox");
renderMenuItem();
renderTodos();
// 实现右侧区域新增加功能
addTodoInp.addEventListener("keyup", function (e) {
  if (e.key === "Enter" && this.value) {
    let Newtodos = {
      desc: this.value,
      isDone: false,
    };
    todolist[currentIndex].todos.push(Newtodos);
  }
  renderTodos();
  localStorage.setItem("todolist", JSON.stringify(todolist));
});

// 实现头部的删除功能
headerRemoveBtn.onclick = function () {
  // 从todolist中删除指定的todoItem
  todolist.splice(currentIndex, 1);
  // 来修改 currentIndex
  if (currentIndex > 0) {
    currentIndex--;
  }
  // 重新渲染左侧菜单
  renderMenuItem();
  // 重新渲染右侧的内容区
  renderTodos();
  localStorage.setItem("todolist", JSON.stringify(todolist));
};

// 实现新增功能
addMenuItemBtn.onclick = function () {
  // 1、创建一个描述menuItem的对象，添加到 todolist 数组中
  let newTodoObj = {
    title: "newList",
    isLocked: false,
    todos: [],
  };
  todolist.push(newTodoObj);
  // 2、修改 currentIndex
  currentIndex = todolist.length - 1;
  // 3、创建一个新的menuItem，并且添加到新增按钮的前面
  renderMenuItem();
  // 4、重新渲染右侧内容区
  renderTodos();
  localStorage.setItem("todolist", JSON.stringify(todolist));
};

// 给头部的小锁绑定点击事件，来切换锁定状态
headerLock.onclick = function () {
  // 1、修改todolist里面当前被激活的menuItem的 isLocked属性
  todolist[currentIndex].isLocked = !todolist[currentIndex].isLocked;
  // 2、重新渲染右侧的内容区
  renderTodos();
  // 3、修改menuItem左侧的图标
  renderMenuItem();
  localStorage.setItem("todolist", JSON.stringify(todolist));
};
//点击右侧头部，变成可编辑状态，点击回车更改头部值title-input
headerTitle.addEventListener("click", function () {
  if (!todolist[currentIndex].isLocked) {
    // 把当前输入的值给隐藏的input
    titleInput.value = headerTitle.innerHTML;
    titleBox.style.display = "none";
    titleEditer.style.display = "block";
  }

  // 当点击头部标题以后右侧删除小按钮显示出来，给他添加点击事件
  cancel.onclick = function () {
    titleBox.style.display = "block";
    titleBox.style.display = "flex";
    titleEditer.style.display = "none";
  };
  // 头部右侧隐藏input绑定点击事件
  titleInput.addEventListener("keyup", function (e) {
    if (!todolist[currentIndex].isLocked === true) {
      if (e.key === "Enter") {
        headerTitle.innerHTML = this.value;
        titleBox.style.display = "block";
        titleEditer.style.display = "none";
        todolist[currentIndex].title = headerTitle.innerHTML;
        titleBox.style.display = "flex";
        renderMenuItem();
        renderTodos();
        localStorage.setItem("todolist", JSON.stringify(todolist));
      }
    }
  });
});
// 根据todolist的数据来生成左侧menuItem    一个函数只干一件事，只渲染左侧列表每一项
function renderMenuItem() {
  // 先清空menuItem，在渲染新的
  let menuItemList = document.querySelectorAll(".menu-item");
  for (let i = 0; i < menuItemList.length - 1; i++) {
    menuItemList[i].remove();
  }

  // 再遍历创建menuItem
  todolist.forEach(function (menuItemObj, idx) {
    let menuItemDiv = document.createElement("div");
    menuItemDiv.classList.add("menu-item");
    // 如果idx等于currentIndex，就说明我们这个 menuItemDiv 被选中了
    if (idx == currentIndex) {
      menuItemDiv.classList.add("menuItem-active");
    }
    // 给menuItemDiv设置自定义属性
    menuItemDiv.setAttribute("data-index", idx);

    // 创建menuItem左侧小图标
    let menuLeftIcon = document.createElement("span");
    menuLeftIcon.classList.add("glyphicon", "menu-left-icon");
    // 根据当前menuItem是否锁定状态，来动态添加Icon图标
    if (menuItemObj.isLocked) {
      menuLeftIcon.classList.add("glyphicon-lock");
    } else {
      menuLeftIcon.classList.add("glyphicon-pencil");
    }

    // 创建menuItem 的标题标签
    let menuItemTitle = document.createElement("span");
    menuItemTitle.classList.add("menuTitle");
    // 设置标题
    menuItemTitle.innerText = menuItemObj.title;

    // 创建徽标标签
    let menuItemBadge = document.createElement("span");
    menuItemBadge.classList.add("badge", "menu-right-badge");
    if (idx == currentIndex) {
      menuItemBadge.classList.add("active-badge");
    }
    // 统计徽标的数字，统计到的是todos列表里面是false的每一项
    let noDoneArr = menuItemObj.todos.filter(function (todoObj) {
      return todoObj.isDone == false;
    });
    // 让徽标里面的个数等于todos列表里是falase的个数
    menuItemBadge.innerText = noDoneArr.length;

    // 给每一个 menuItemDiv 绑定点击事件，点击的时候来切换右侧的内容
    menuItemDiv.onclick = function () {
      // 动态修改当前被激活的menuItem的索引
      currentIndex = this.getAttribute("data-index");
      将currentIndex保存在localStorage里
      currentIndex = localStorage.setItem("currentIndex", "currentIndex");

      // 1、切换menuItem被激活的样式
      let menuItemList = document.querySelectorAll(".menu-item");
      for (let i = 0; i < menuItemList.length - 1; i++) {
        menuItemList[i].classList.remove("menuItem-active");
      }

      // 2、切换menuItem的徽标的被激活的样式
      let menuItemBadgeList = document.querySelectorAll(".menu-right-badge");
      menuItemBadgeList.forEach(function (badge) {
        badge.classList.remove("active-badge");
      });
      menuItemBadgeList[currentIndex].classList.add("active-badge");

      this.classList.add("menuItem-active");

      // 2、切换右侧展示的内容
      renderTodos();
    };

    // 拼装menuItem
    menuItemDiv.appendChild(menuLeftIcon);
    menuItemDiv.appendChild(menuItemTitle);
    menuItemDiv.appendChild(menuItemBadge);
    // 将menuItemDiv插入到新增按钮的前面
    // 需要用insertBefore来插入到新增按钮的前面，不能使用appendChild
    menuBox.insertBefore(menuItemDiv, addMenuItemBtn);
  });
}

// 根据todolist的数据来生成右侧的todo
function renderTodos() {
  // 没有数据的时候
  if (todolist.length <= 0) {
    rightHeaderWrapper.style.display = "none";
    todoItemWrapper.style.display = "none";
    return;
  } else {
    // 有数据的情况
    rightHeaderWrapper.style.display = "block";
    todoItemWrapper.style.display = "block";
  }

  // 获取左侧菜单被激活的徽标
  let menuItemActiveBadge = document.getElementsByClassName("active-badge")[0];
  // 修改右侧头部的标题  等于左侧选中项item的title
  headerTitle.innerText = todolist[currentIndex].title;
  // 修改右侧头部的徽标数值
  headerBadge.innerText = menuItemActiveBadge.innerText;

  // 动态渲染头部小锁的图标
  if (todolist[currentIndex].isLocked) {
    headerLock.classList.remove("glyphicon-pencil");
    headerLock.classList.add("glyphicon-lock");
    addTodoInp.disabled = true;
  } else {
    headerLock.classList.remove("glyphicon-lock");
    headerLock.classList.add("glyphicon-pencil");
    addTodoInp.disabled = false;
  }

  // 先将 todoItemWrapper 里面的todoItem全部移除掉
  todoItemWrapper.innerHTML = "";
  // 循环生成todos
  creatTodos();
  localStorage.setItem("todolist", JSON.stringify(todolist));
}

// 创建右侧下方每一个todos，并渲染到页面
function creatTodos() {
  todolist[currentIndex].todos.forEach(function (todoObj, index) {
    // 创建todoItem这个最外层的div
    let todoItemDiv = document.createElement("div");
    todoItemDiv.classList.add("todoItem");

    // 创建label标签
    let olabel = document.createElement("label");
    olabel.classList.add("label");

    // 创建 checkbox 多选框
    let oCheckbox = document.createElement("input");
    oCheckbox.type = "checkbox";
    if (todoObj.isDone) {
      oCheckbox.checked = true;
    }

    // 创建输入框
    let oInput = document.createElement("input");
    oInput.type = "text";
    oInput.classList.add("input", "todoItem-input");
    if (todoObj.isDone) {
      oInput.classList.add("todo-done");
      oInput.disabled = true;
    }
    oInput.value = todoObj.desc;
    //修改右侧内容的input，数据同时修改并保存
    oInput.onkeyup = function (en) {
      en = en || window.event;
      if (en.key == "Enter") {
        todoObj.desc = oInput.value;
        localStorage.setItem("todolist", JSON.stringify(todolist));
      }
    };

    // 创建删除按钮
    let deleteBtn = document.createElement("span");
    deleteBtn.classList.add("glyphicon", "glyphicon-trash", "todoItem-delete");
    if (todoObj.isDone) {
      deleteBtn.style.display = "block";
    } else {
      deleteBtn.style.display = "none";
    }

    // 给多选框按钮添加change事件
    oCheckbox.onchange = function () {
      if (this.checked) {
        todoObj.isDone = true;
        deleteBtn.style.display = "block";
        oInput.classList.add("todo-done");
        // 重新渲染，让徽标数字跟着变化
        renderMenuItem();
        renderTodos();
      } else {
        todoObj.isDone = false;
        deleteBtn.style.display = "none";
        oInput.classList.remove("todo-done");
      }
      // 重新渲染，让徽标数字跟着变化
      renderMenuItem();
      renderTodos();
      localStorage.setItem("todolist", JSON.stringify(todolist));
    };
    // 点击垃圾桶删除此项
    deleteBtn.onclick = function () {
      this.parentElement.remove();
      todolist[currentIndex].todos.splice(index, 1);
      localStorage.setItem("todolist", JSON.stringify(todolist));
    };
    // 判断锁定状态
    if (todolist[currentIndex].isLocked) {
      oCheckbox.disabled = true;
      oInput.disabled = true;
      deleteBtn.style.display = "none";
    }

    // 拼接todoItem
    olabel.appendChild(oCheckbox);
    todoItemDiv.appendChild(olabel);
    todoItemDiv.appendChild(oInput);
    todoItemDiv.appendChild(deleteBtn);

    // 将 todoItemDiv 添加到 todoItemWrapper
    todoItemWrapper.appendChild(todoItemDiv);
  });
}
