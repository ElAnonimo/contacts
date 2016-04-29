angular.module('ContactsApp.filters', []).
  filter('mainFilter', ['$sce', function($sce){
    return function(contacts, filter) {
      //Массив для отобраных значений
      var result = [];
      //Проходим по всем контактам
      for(var i=0, l=contacts.length; i<l; i++) {
        //Сбрасываем признак отфильтрованости
        var filtered = false;
        //Считаем возраст
        var age = Math.abs( new Date(Date.now() - new Date(contacts[i]["date"]).getTime()).getUTCFullYear() - 1970);
        //Проходим по параметрам фильтра
        angular.forEach(filter, function(val, key) {
          if(key == "photo" && val == true && (!contacts[i][key] || contacts[i][key] == false)){
            filtered = true;
          }
          else if(key == "ageMin" && val && val > age){
            filtered = true;
          }
          else if(key == "ageMax" && val && val < age){
            filtered = true;
          }
          else if(key == "search" && val && contacts[i]["name"].toLowerCase().indexOf(val.toLowerCase()) == -1){
            filtered = true;
          }
          else if(key == "group" && val){
            if(val != "all" && val != contacts[i][key]){
              filtered = true;
            }
          }
        });
        //Если ни один фильтр не отработал добавляем в результирующий массив
        if(!filtered){
          result.push(contacts[i]);
        }
      }
      //Возвращаем результат
      return result;
    }
  }]);
