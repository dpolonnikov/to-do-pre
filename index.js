//Заготовленный список дел
let items = [
	"Сделать проектную работу",
	"Полить цветы",
	"Пройти туториал по Реакту",
	"Сделать фронт для своего проекта",
	"Прогуляться по улице в солнечный день",
	"Помыть посуду",
];

//Получаем необходимые элементы
const listElement = document.querySelector(".to-do__list");
const formElement = document.querySelector(".to-do__form");
const inputElement = document.querySelector(".to-do__input");

//Функция получения задач
function loadTasks() {
	const tasks = JSON.parse(localStorage.getItem('tasks'));
	if(tasks && tasks.length>0) {
		return tasks;
	}
	return items;
}

//Создание разметки задачи
function createItem(item) {
	//Получаем элементы
	const template = document.getElementById("to-do__item-template");
	const clone = template.content.querySelector(".to-do__item").cloneNode(true);
  	const textElement = clone.querySelector(".to-do__item-text");
  	const deleteButton = clone.querySelector(".to-do__item-button_type_delete");
  	const duplicateButton = clone.querySelector(".to-do__item-button_type_duplicate");
  	const editButton = clone.querySelector(".to-do__item-button_type_edit");
  	textElement.textContent = item;
	//Событие для нажатия кнопки удаления
	deleteButton.addEventListener('click', function(evt) {
		clone.remove();
		const items = getTasksFromDOM();
		saveTasks(items);
	});
	//Копирование задачи
	duplicateButton.addEventListener('click', function(evt) {
		const itemName = textElement.textContent;
		const newItem = createItem(itemName);
		listElement.prepend(newItem);
		const items = getTasksFromDOM();
		saveTasks(items);
	});
	//Изменение задачи
	editButton.addEventListener('click', function(evt) {
		textElement.setAttribute('contenteditable', 'true');
		textElement.focus();
	});
	textElement.addEventListener('blur', function(evt) {
		textElement.setAttribute('contenteditable', 'false');
		const items = getTasksFromDOM();
		saveTasks(items);
	})
  	return clone;

}

//Функция для возвращения задачи в виде массива
function getTasksFromDOM() {
	const itemsNamesElements = document.querySelectorAll('.to-do__item-text');
	let tasks = [];
	itemsNamesElements.forEach((item)=> {
		tasks.push(item.textContent);
	})
	return tasks;
}

//Функция сохранения задачи в локальное хранилище
function saveTasks(tasks) {
	localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Получаем задачи
items = loadTasks();

items.forEach((item)=> {
	//Добавляем в контейнер созданную через функцию createItem разметку задачи
	listElement.append(createItem(item));
})

//Обработчик события при отправке формы
formElement.addEventListener('submit', function(evt) {
	evt.preventDefault();
	const taskText = inputElement.value;
	listElement.prepend(createItem(taskText));
	items = getTasksFromDOM();
	saveTasks(items);
	formElement.reset();
});