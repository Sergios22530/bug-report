import VueFormGenerator from 'vue-form-generator';

const translations = {
    fieldIsRequired: 'Поле обов\'язкове для заповнення',
    invalidFormat: 'Невірний формат данних',
    fieldIsPasswords: 'Значення в полях мають співпадати',
    numberTooSmall: 'Число занадто мале. Мінімум:&nbsp;{0}',
    numberTooBig: 'Число занадто велике. Максимум:&nbsp;{0}',
    invalidNumber: 'Невірне число',
    invalidInteger: 'Поле має містити лише цифри',
    textTooSmall: 'Поле має містити мінімум {1} символи',
    textTooBig: 'Поле має містити не більше ніж {1} символів.Довжина тексту занадто велика',
    thisNotText: 'Це не текст',
    thisNotArray: 'Це не массив',
    currentDateError: 'Зазначена дата некоректна',
    selectMinItems: 'Оберіть щонайменше {0} елементів',
    selectMaxItems: 'Оберіть щонайбільше {0} елементів',
    invalidDate: 'Обрана дата некоректна',
    dateIsEarly: 'Обрана дата некоректна. Обрана:&nbsp;{0}, мінімальна:&nbsp;{1}',
    dateIsLate: 'Обрана дата некоректна. Обрана:&nbsp;{0}, максимальна:&nbsp;{1}',
    invalidEmail: 'Неправильний формат електронної адреси',
    invalidURL: 'Невірно вказана адресса',
    invalidCard: 'Невірно вказаний номер карти',
    invalidCardNumber: 'Невірно вказаний номер карти',
    invalidTextContainNumber: 'Невірно вказаний текст. Текст не може містити числа або спеціальні символи',
    invalidTextContainSpec: 'Невірно вказаний текст. Текст не може містити спеціальні символи',
    requirePassword: 'Паролі не збігаються. Перевір ще раз.',
};

for (const [key, translate] of Object.entries(translations)) {
    VueFormGenerator.validators.resources[key] = translate;
}
