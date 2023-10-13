[![Статус тестов](../../actions/workflows/tests.yml/badge.svg)](../../actions/workflows/tests.yml)

# **Mesto**

### Обзор
* [Описание](#описание)
* [Стек](#стек)
* [Развертывание](#развертывание)
* [Планируемые дополнения](#планируемые-дополнения)
* [Ссылки на проект](#ссылки-на-проект)
<br>

## Описание

Проект о посещенных местах. Страница профиля путешественника с возможностью редактирования профиля (имя, описание рода деятельности пользователя, аватар), валидации форм, добавления карточек с посещенными местами и просмотр фотографии карточки. 
Есть возможность авторизации и регистрации нового пользователя. Сайт одинаково хорошо отображается как на Desktop, так и на мобильных устройствах.

Репозиторий содержит Frontend и Backend части приложения. 
- Frontend расположен в директории `frontend/` 
- Backend расположен в директории `backend/`

## Стек

- **Frontend:** JavaScript, HTML5, CSS3, ReactJS, WebPack, Babel.
- **Backend:** Node.js, Express, MongoDB

## Развертывание

Для копирования и запуска приложения Вам потребуются [Git](https://git-scm.com/) и [Node.js](https://nodejs.org/en/download/) (вместе с которым автоматически устанавливается менеджер пакетов [npm](http://npmjs.com/)) предварительно установленные на компьютер.

Далее пишем в командной строке следующие команды:

```
// Клонирование репозитория
$ git clone https://github.com/lexev97/react-mesto-api-full-gha.git

// Переход в пиректорию с frontend частью проекта
$ cd react-mesto-api-full-gha/frontend

// Установка зависимостей
$ npm install

// Переход в пиректорию с backend частью проекта
$ cd .. && cd react-mesto-api-full-gha/backend

// Установка зависимостей
$ npm install
```

Запуск проекта:

```
// Запуск frontend части (при нахождении в директории react-mesto-api-full-gha/frontend)
$ npm start

// Запуск backend части (при нахождении в директории react-mesto-api-full-gha/backend)
$ npm run dev
```

## Планируемые дополнения

- Добавление второго языка

## Ссылки на проект

Frontend: https://place.nomoredomains.xyz <br/>
**тестовый аккаунт:**<br/>
email: mail@mail.ru<br/>
pass: 123456789<br/>

Backend: https://api.place.nomoredomains.xyz

IP: 84.201.143.32
