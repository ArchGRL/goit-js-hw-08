import throttle from 'lodash.throttle';

const formEl = document.querySelector('.feedback-form');
const emailEl = document.querySelector('[name="email"]');
const messageEl = document.querySelector('[name="message"]');

let dataObj = {};

const LOCALSTORAGE_KEY = 'feedback-form-state';

const saveDataObj = e => {
     dataObj[e.target.name] = `${e.target.value}`;
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(dataObj));
  };

formEl.addEventListener('input', throttle(saveDataObj, 500));

document.addEventListener('DOMContentLoaded', () => {
  const localStorageData = localStorage.getItem(LOCALSTORAGE_KEY);
  if (localStorageData) {
    const parsedData = JSON.parse(localStorageData);
    emailEl.value = parsedData.email || '';
    messageEl.value = parsedData.message || '';
    dataObj = parsedData;
  } else {
    emailEl.value = '';
    messageEl.value = '';
  }
});

formEl.addEventListener('submit', e => {
  e.preventDefault();
  if (emailEl.value !== '' && messageEl.value !== '') {
    console.log(dataObj);
    localStorage.removeItem(LOCALSTORAGE_KEY);
    formEl.reset();
  } else {
    alert('Please, fill in all fields.');
  }
});

