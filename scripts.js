let tasks = []; // {title:"ddddd",done:false}

function renderEditor() {
    let inputEl = document.querySelector("#default-todo-panel .todo-editor > input");

    //inputEl.onchange = (e) => {
    //  console.log("text:", e.target.value);
    //    console.log("input change:", e);
    // };
    //定义一个添加待办事项的函数
    let addTask = () => {
        //如果输入空值，返回
        if (inputEl.value.length === 0) {
            return;
        }
        //定义一个新的待办事项对象
        let newTask = {
            title: inputEl.value,
            done: false,
            vip: false
        };

        inputEl.value = "";
        //将该对象放入数组尾部
        tasks.push(newTask);

        console.log("task: ", tasks);
        //重新渲染待办事项列表
        renderTaskItems();
    };


    //按回车键运行待办事项函数
    inputEl.onkeypress = (e) => {

        if (e.key === "Enter") {
            addTask();
        }
    };
    //点击按钮待办事项函数
    let addEl = document.querySelector("#default-todo-panel .todo-editor > button");
    addEl.onclick = (e) => {
        addTask();
    };

}

function renderTaskItems() {
    console.log("render items");
    let itemsEl = document.querySelector("#default-todo-panel .todo-items");
    //移除所有节点
    itemsEl.querySelectorAll("div").forEach((node) => node.remove());

    console.log(itemsEl);

    for (let i = 0; i < tasks.length; i++) {
        let task = tasks[i];
        let itemEl = document.createElement("div");
        itemEl.className = "task";

        let doneEl = document.createElement("input");
        doneEl.type = "checkbox";
        doneEl.checked = task.done;
        if (task.done) {
            itemEl.classList.add("done");
        } else {
            itemEl.classList.remove("done");
        }

        doneEl.onchange = (e) => {
            task.done = e.target.checked;
            if (task.done) {
                itemEl.classList.add("done");
            } else {
                itemEl.classList.remove("done");
            }
        }
        itemEl.append(doneEl);

        let titleEl = document.createElement("label");
        titleEl.innerText = task.title;
        itemEl.append(titleEl);

        let ctrlbarEl = renderTaskCtrlBar(tasks, i);

        itemEl.append(ctrlbarEl);

        itemsEl.append(itemEl);
    }
}


function renderTaskCtrlBar(tasks, taskIdx) {
    let ctrlbarEl = document.createElement("div");
    ctrlbarEl.className = "ctrlbar";

    let viptagEl = document.createElement("button");
    ctrlbarEl.append(viptagEl);
    if (tasks[taskIdx].vip) {
        viptagEl.innerText = "⭐";
    } else {
        viptagEl.innerText = "✰";
    }
    viptagEl.onclick = function (a) {
        if (tasks[taskIdx].vip) {
            tasks[taskIdx].vip = false;
            viptagEl.innerText = "✰";
        } else {
            tasks[taskIdx].vip = true;
            viptagEl.innerText = "⭐";
        }
    }

    let upEl = document.createElement("button");
    if (taskIdx === 0) {
        upEl.disabled = true;
    }
    upEl.innerText = "↿";
    upEl.onclick = () => {
        let order = tasks[taskIdx];
        tasks[taskIdx] = tasks[taskIdx - 1]
        tasks[taskIdx - 1] = order;
        renderTaskItems();
    };
    ctrlbarEl.append(upEl);

    let downEl = document.createElement("button");
    if (taskIdx === tasks.length-1){
        downEl.disabled = true;
    }
    downEl.innerText = "⇂";
    downEl.onclick = () => {
        let order = tasks[taskIdx];
        tasks[taskIdx] = tasks[taskIdx + 1]
        tasks[taskIdx + 1] = order;
        renderTaskItems();
    };
    ctrlbarEl.append(downEl);

    let cancelEl = document.createElement("button");
    cancelEl.innerText = "×";
    cancelEl.onclick = () => {
        tasks.splice(taskIdx, 1);
        renderTaskItems();
    };
    ctrlbarEl.append(cancelEl);

    return ctrlbarEl;
}

renderEditor();
renderTaskItems();