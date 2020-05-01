// Start with an iffe and expose the public variable on global
(function () {
  // "it" function defines the test case
  function it(desc, func) {
    //encapsulate the func call in try/catch block so that testing does not stop if one test fails
    try {
      func();
      // If the test case passes then log the test case description in the browser console with a checkmark
      console.log('\x1b[32m%s\x1b[0m', '\u2714 ' + desc);
    } catch (error) {
      // log the error on the console with an 'x'
      console.log('\n');
      console.log('\x1b[31m%s\x1b[0m', '\u2718 ' + desc);
      console.error(error);
      console.log('\n');
    }
  }

  function assert(isTrue) {
    if (!isTrue) {
      throw new Error();
    }
  }

  it('should fail', function () {
    assert(1 !== 1);
  });

  it('should pass', function () {
    assert(1 === 1);
  });

  it('should validate a date string', function () {
    // Valid Date
    assert($myapp.isValidDate('02/02/2020'));

    // Invalid Date
    assert(!$myapp.isValidDate('01/32/2020'));
  });

  it('should add a todo item to the list', function () {
    var selector = document.querySelector('#selector');
    selector.innerHTML = '<form id="aform"><input type="text" name="todo-input"><button>Submit</button></form><ul id="todo-list"></ul>';
    var form = document.querySelector('#aform');
    form.elements['todo-input'].value = 'task 1';

    var ev = document.createEvent('HTMLEvents');
    ev.initEvent('submit', true, true);
    form.dispatchEvent(ev);

    assert(selector.innerHTML.toLowerCase().includes('<li>task 1</li>'));
    selector.innerHTML = '';
  });

  it('should get render user details object', function () {
    // Stub the get function
    $myapp.get = function (url, callback) {
      if (url === '/api/users?id=1') {
        callback({ fname: 'Amit', lname: 'Gupta' });
      } else {
        callback(false);
      }
    };

    // Attach #user-detail div to the test dom
    var selector = document.querySelector('#selector');
    selector.innerHTML = '<div id="user-detail"></div>';

    $myapp.getUser(1);
    assert(selector.innerHTML.includes('Amit Gupta'));
    selector.innerHTML = '';
  });
})();
