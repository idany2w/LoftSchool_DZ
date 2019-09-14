/* ДЗ 6 - Асинхронность и работа с сетью */

/*
 Задание 1:

 Функция должна возвращать Promise, который должен быть разрешен через указанное количество секунду

 Пример:
   delayPromise(3) // вернет promise, который будет разрешен через 3 секунды
 */
function delayPromise(seconds) {
  let promise = new Promise((resolve) => {
    setTimeout(() => resolve(), seconds * 1000);
  });
  return promise;
}

/*
 Задание 2:

 2.1: Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения

 Массив городов можно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json

 2.2: Элементы полученного массива должны быть отсортированы по имени города

 Пример:
   loadAndSortTowns().then(towns => console.log(towns)) // должна вывести в консоль отсортированный массив городов
 */
function loadAndSortTowns(doFetch = false) {

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

  if (doFetch) {
    return fetch('https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json')
      .then(response => {
        if (response.status >= 400) return Promise.reject();
        return response.json();
      })
      .then(value => citiesSort(value))
      .catch(() => console.error('Что-то пошло не так'));
  } else {
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
}

export {
  delayPromise,
  loadAndSortTowns
};
