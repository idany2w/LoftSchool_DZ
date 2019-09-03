/* ДЗ 2 - работа с массивами и объектами */

/*
 Задание 1:

 Напишите аналог встроенного метода forEach для работы с массивами
 Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array
 */
function forEach(array, fn) {
  for (let i = 0; i < array.length; i++) fn(array[i], i, array);
}

/*
 Задание 2:

 Напишите аналог встроенного метода map для работы с массивами
 Посмотрите как работает map и повторите это поведение для массива, который будет передан в параметре array
 */
function map(array, fn) {
  let newArray = [];
  for (let i in array) newArray.push( fn(array[i], i, array) );   
  return newArray;
};

/*
 Задание 3:

 Напишите аналог встроенного метода reduce для работы с массивами
 Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array
 */
function reduce(array, fn, initial = false) {
  let prevVal, i;
  if(initial) {
    prevVal = initial;
    i = 0;
  } else {
    prevVal = array[0];
    i = 1;
  }
  for (i; i < array.length; i++) prevVal = fn(prevVal, array[i], i, array);
  return prevVal;
}

/*
 Задание 4:

 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива

 Пример:
   upperProps({ name: 'Сергей', lastName: 'Петров' }) вернет ['NAME', 'LASTNAME']
 */
function upperProps(obj) {
  let result = [];
  for (let v in obj) result.push( v.toUpperCase() );
  return result;
}

/*
 Задание 5 *:

 Напишите аналог встроенного метода slice для работы с массивами
 Посмотрите как работает slice и повторите это поведение для массива, который будет передан в параметре array
 */
function slice(array, from = 0, to = array.length) {
  let newArray = [];
  if (from*(-1) > array.length) from = 0;
  if (to > array.length) to = (array.length);
  if (from < 0) from = array.length + from;
  if (to < 0) to = array.length + to;
  for( let i = from; i < to; i++) newArray.push(array[i]);
  return newArray;
}

/*
 Задание 6 *:

 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) {
  let newObj ={};
  newObj = new Proxy(newObj, { 
    set(target, prop, val) { 
      if (typeof val == 'number') {
        target[prop] = val * val;
        return true;
      } else {
        return false;
      }
    }
  });
  return newObj;
}

export {
    forEach,
    map,
    reduce,
    upperProps,
    slice,
    createProxy
};
