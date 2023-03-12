let addButton = document.querySelector(".add-button"); // кнопка показуння інпута

let addTask = document.querySelector(".add-task"); // дів з іннпутом і кнопкою додавання туду

let addTaskAddButton = document.querySelector(".add-task-add-button"); // кнопка додавання туду

let input = document.querySelector(".input"); // інпут

let todoList = document.querySelector(".todo-list"); // таблиця туду

const allToDos = localStorage.getItem("to-dos"); // ; локал сторедж туду
let myArray = [];
if(allToDos != null) { // перевіряємо, чи не порожній локал сторедж
    myArray = allToDos.split("|"); // створюємо масив з локал сторедж
    for (let index = 0; index < myArray.length; index++) { // даём каждому todo свой номер
        if (myArray[index] != "") { // чи туду має назву
            const para = document.createElement("p");
            para.classList.add("par" + index);
            para.innerText = myArray[index];
            const span = document.createElement("span");
            span.classList.add("par" + index); 
            span.classList.add("spans"); 
            span.innerText = 'done';
            todoList.appendChild(para);  // вкладає абзаци в таблицю туду
            para.appendChild(span);  // вкладає спани з done  в абзаци
        }  
    }
} //для відновленої сторінки
let spans = document.querySelectorAll(".spans"); // отримуємо всі done

for (let index = 0; index < spans.length; index++) {
    const element = spans[index];
    // делегація - коли ми створюємо елемент, на який вішаємо addEventListener не одразу
    todoList.addEventListener("click", (e) => {
        if (e.target.matches('.spans')) {
        let deletedClass = e.target.className.replace(" spans", "") // отримуємо клас спану done і очищуємо йлшл від  spans
        let deleteToDo = deletedClass.replace("par", "");
        myArray.splice(deleteToDo, 1);
        let element = document.querySelector("." + deletedClass);
        console.log(element); // достукуємося до відповідного абзаца
        element.remove(); // видаляємо цей абзац
        let text = element.textContent.replace("done", "");
        const allToDos = localStorage.getItem("to-dos"); // ; локал сторедж туду
        let arr = allToDos.split("|");
        arr.splice(deleteToDo, 1);
        console.log(arr);
        const str = arr.join("|")
        localStorage.setItem("to-dos", str)            
     }
    })    
}

addButton.addEventListener("click", () => {
    addTask.classList.add("flex"); // показуємо інпуь
})

let todos;

addTaskAddButton.addEventListener("click", () => { // додаємо туду
    if (input.value != "") {
        if (localStorage.getItem("to-dos") == null) {
        todos = "";
        } else {
            todos = localStorage.getItem("to-dos")  + "|"; 
        }

        let count;

        if (localStorage.getItem("to-dos") == null) {
            count = 0;
        } else {
            count = localStorage.getItem("to-dos").split("|").length;
        }
        todoList.innerHTML += "<p class='par" + count + "'>" + input.value + "<span class='par" + count + " spans'>done</span>" + "</p>"; // додаємо в таблицю туду
        localStorage.setItem("to-dos", todos + input.value); // додаємо в локалсторедж
        input.value = ""; // очищуємо імпут
        addTask.classList.remove("flex"); // приховуємо інпут
    } else {
        alert("fill in input"); // якщо інпут порожній
    }
}) 


// 1) створіть довільний масив, перетворіть його в стрінг і покажіть стрінг в консолі,
// 2) якщо  розмір масиву більший ніж 3
// 3) і якщо кількість знаків у стрінзі менша ніж 15
// 4) і показати в консолі останній символ стрінги