/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующей cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если добавляемая cookie не соответсвует фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующей cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

listTable.addEventListener('click', (e) => {
  if (e.target.textContent === 'удалить'
    && e.target === e.target.parentNode.querySelectorAll('td')[2]) {
    let coockieName = e.target.parentNode.querySelector('td').textContent;

    document.cookie = coockieName + '=0 ; max-age=0';
    e.target.parentNode.remove();
  }
})

filterNameInput.addEventListener('keyup', function () {
  if (document.cookie.length != 0) {
    let
      cookies = document.cookie.split('; '),
      newListTable = document.createDocumentFragment();

    for (let cookie of cookies) {
      let
        cookieData = cookie.split('='),
        filterName = filterNameInput.value.toLowerCase();

      if (cookieData[0].toLowerCase().indexOf(filterName) != -1) {
        let
          tr = document.createElement('tr'),
          tdName = document.createElement('td'),
          tdValue = document.createElement('td'),
          tdDelete = document.createElement('td');

        tdName.textContent = cookieData[0];
        tdValue.textContent = cookieData[1];
        tdDelete.textContent = 'удалить';

        tr.appendChild(tdName);
        tr.appendChild(tdValue);
        tr.appendChild(tdDelete);

        newListTable.appendChild(tr);
      };
    };
    listTable.innerHTML = '';
    listTable.append(newListTable);
  }

});

addButton.addEventListener('click', () => {
  document.cookie = encodeURIComponent(addNameInput.value) + '=' + encodeURIComponent(addValueInput.value);

  let
    cookies = document.cookie.split('; '),
    newListTable = document.createDocumentFragment();

  for (let cookie of cookies) {
    let
      tr = document.createElement('tr'),
      tdName = document.createElement('td'),
      tdValue = document.createElement('td'),
      tdDelete = document.createElement('td'),
      cookieData = cookie.split('=');

    tdName.textContent = cookieData[0];
    tdValue.textContent = cookieData[1];
    tdDelete.textContent = 'удалить';

    tr.appendChild(tdName);
    tr.appendChild(tdValue);
    tr.appendChild(tdDelete);

    newListTable.append(tr);
  }
  listTable.innerHTML = '';
  listTable.append(newListTable);

  addNameInput.value = '';
  addValueInput.value = '';
});
