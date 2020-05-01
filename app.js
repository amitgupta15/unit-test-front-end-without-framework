(function () {
  'use strict';

  // Create a global variable and expose it to the world
  var $myapp = {};
  self.$myapp = $myapp;

  $myapp.isValidDate = function (dateString) {
    var dateRegex = /(0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.](19|20)\d\d/gi;
    return dateRegex.test(dateString);
  };

  document.addEventListener('submit', function (event) {
    event.preventDefault();
    var elements = document.querySelector('#aform').elements;
    var todoItem = elements['todo-input'].value;

    var todoList = document.querySelector('#todo-list');
    if (todoItem) {
      todoList.innerHTML += '<li>' + todoItem + '</li>';
    }
  });

  $myapp.get = function (url, callback) {
    var requestListener = function () {
      if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
          var response = JSON.parse(httpRequest.response);
          callback(response);
        } else {
          alert('There was a problem with the request');
        }
      }
    };

    var httpRequest = new XMLHttpRequest();
    httpRequest.addEventListener('load', requestListener);
    httpRequest.open('GET', url);
    httpRequest.send();
  };

  $myapp.getUser = function (id) {
    $myapp.get('/api/users?id=' + id, function (user) {
      var domElement = document.querySelector('#user-detail');
      if (user) {
        domElement.innerHTML = user.fname + ' ' + user.lname;
      }
    });
  };
})();
