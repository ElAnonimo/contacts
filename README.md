`sudo npm install --global gulp-cli
npm install --save-dev gulp`

# Описание
Объект каталога (контакт) размещается на облачной БД Firebase и содержит атрибуты:

1. Идентификатор
2.  Фамилия и имя 
3.  дата рождения 
4.  Фото 
5.  Группа, подгруппа
6.  Адрес электронной почты 
7.  Описание

Инструменты поиска представлены в виде:

1.  Поиск по фамилии и имени контакта. 
2.  Фильтр по максимальному и минимальному возрасту. 
3.  Возможность поиска контактов только с изображением.

Реализован просмотр деталей контакта. При этом набор настроек поиска сохраняется при закрытии деталей контакта и переходе по группам и подгруппам.

Реализованы редактирование, удаление, добавление контактов.

Управление сборкой и зависимостями на клиентской стороне осуществлено при помощи сборщика проектов gulp и менеджера пакетов bower. 

Для установки компонентов и запуска используйте команду `npm start`. Для сборки используйте команду `gulp`.
