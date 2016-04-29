angular.module('ContactsApp.controllers', []).
  controller('mainController', function($scope, $firebaseArray, dbService) {

    //Главный фильтр
    $scope.filter = {
      ageMin: "",
      ageMax: "",
      photo: false,
      group: "",
      search: ""
    };
    //Список групп и контактов
    $scope.usersList = dbService.usersList;
    $scope.groups = dbService.groups;
    $scope.groupsList = dbService.groupsList;

    $( "#datepicker" ).datepicker();
    $scope.groups.$loaded()
      .then(function() {
        dbService.createGroupsList($scope.groups);
        $('#tree').treeview({data: $scope.groups});
        $('#tree').on('nodeSelected', function(event, data) {
          $scope.$apply(function() {
              $scope.filter.group = data.href;
          });
        });
      });
    $scope.getGroupName = function(groupId){

      var groupName = _.find($scope.groupsList, function(val){
        return val['href'] == groupId;
      });
      return groupName['text'];
    }
    //Сохранение контакта
    $scope.contactSave = function(){
      //Если есть ид то это редактирование существующего иначе добавление нового
      $scope.contact.date = $('#datepicker').val();
      if($scope.contact.$id){
        dbService.editContact($scope.contact);
      }
      else{
        dbService.addContact($scope.contact);
      }
      //Очистка переменной и скрытие окна
      $scope.contact = {};
      $('#contactModal').modal('hide');
    }
    //Редактирование контакта
    $scope.editContact = function(user){
      //Записываем значения и открываем окно
      var contact = angular.copy(user);
      $scope.contact = contact;
      $('#contactModal').modal('show');
    }
  });
