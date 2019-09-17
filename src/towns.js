/*
 Страница должна предварительно загрузить список городов из
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 и отсортировать в алфавитном порядке.

 При вводе в текстовое поле, под ним должен появляться список тех городов,
 в названии которых, хотя бы частично, есть введенное значение.
 Регистр символов учитываться не должен, то есть "Moscow" и "moscow" - одинаковые названия.

 Во время загрузки городов, на странице должна быть надпись "Загрузка..."
 После окончания загрузки городов, надпись исчезает и появляется текстовое поле.

 Разметку смотрите в файле towns-content.hbs

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер

 *** Часть со звездочкой ***
 Если загрузка городов не удалась (например, отключился интернет или сервер вернул ошибку),
 то необходимо показать надпись "Не удалось загрузить города" и кнопку "Повторить".
 При клике на кнопку, процесс загрузки повторяется заново
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');

/*
 Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения

 Массив городов пожно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 */
function loadTowns() {
  function citiesSort(value) {
    let cities = [];

    cities = value.sort((first, second, prop = 'name') => {
      let a = first[prop],
        b = second[prop];

      if (a < b) {
        return -1
      } else {
        return 1
      }
      return 0;
    })

    return cities;
  }

  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest();

    xhr.open('GET', 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json');
    xhr.responseType = 'json';
    xhr.send();
    xhr.addEventListener('load', () => {
      if (xhr.status >= 400) {
        reject();
      } else {
        resolve(citiesSort(xhr.response));
      }
    })
    xhr.addEventListener('error', reject);
    xhr.addEventListener('abort', reject);
  })
}

/*
 Функция должна проверять встречается ли подстрока chunk в строке full
 Проверка должна происходить без учета регистра символов

 Пример:
   isMatching('Moscow', 'moscow') // true
   isMatching('Moscow', 'mosc') // true
   isMatching('Moscow', 'cow') // true
   isMatching('Moscow', 'SCO') // true
   isMatching('Moscow', 'Moscov') // false
 */
function isMatching(full, chunk) {
  full = full.toLowerCase();
  chunk = chunk.toLowerCase();
  return full.indexOf(chunk) > -1
}

/* Блок с надписью "Загрузка" */
const loadingBlock = homeworkContainer.querySelector('#loading-block');
/* Блок с текстовым полем и результатом поиска */
const filterBlock = homeworkContainer.querySelector('#filter-block');
/* Текстовое поле для поиска по городам */
const filterInput = homeworkContainer.querySelector('#filter-input');
/* Блок с результатами поиска */
const filterResult = homeworkContainer.querySelector('#filter-result');

filterInput.addEventListener('keyup', function () {
  function foo() {
    loadTowns()
      .then(towns => {
        if (filterInput.value === '') {
          filterResult.innerHTML = '';
        } else {
          const value = filterInput.value;
          let fragment = document.createDocumentFragment();

          for (let item of towns) {
            if (isMatching(item.name, value)) {
              let element = document.createElement('p');

              element.textContent = item.name;
              fragment.appendChild(element);
            }
          }
          filterResult.innerHTML = '';
          filterResult.appendChild(fragment);
          fragment = null;
        }
      })
      .catch(() => {
        loadingBlock.textContent = 'Не удалось загрузить города';
        let resetButton = document.createElement('button');
        resetButton.textContent = 'Повторить';
        resetButton.addEventListener('click', () => {
          foo();
          resetButton.remove();
        });
        loadingBlock.appendChild(resetButton);
      })
  }
  foo();
});

export {
  loadTowns,
  isMatching
};
