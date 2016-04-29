angular.module('ContactsApp.services', []).
  factory('dbService', function($http, $firebaseArray) {
    //Сервиc для работы с БД
    var dbService = {};
    dbService.groupsList = [];
    var ref = new Firebase("https://v-contacts.firebaseio.com/contacts");
    dbService.usersList = $firebaseArray(ref);
    var ref2 = new Firebase("https://v-contacts.firebaseio.com/groups");
    dbService.groups = $firebaseArray(ref2);

    //Переводит дерево в массив
    dbService.createGroupsList = function(groups) {
      angular.forEach(groups, function(value, key) {
        dbService.groupsList.push({
          "text":value.text,
          "href":value.href
        });
        if(value.nodes){
          angular.forEach(value.nodes, function(value2, key2){
            dbService.groupsList.push({
              "text":value2.text,
              "href":value2.href
            });
          });
        }
      });
    }
    //Добавляет контакт
    dbService.addContact = function(user) {
      dbService.usersList.$add(user);
    }
    //Редактирует контакт
    dbService.editContact = function(user) {
      var item = dbService.usersList.$getRecord(user.$id);
      angular.forEach(user, function(val, key){
        item[key] = val;
      });
      dbService.usersList.$save(item);
    }
    return dbService;
  });
