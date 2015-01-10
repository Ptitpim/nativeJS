(function(window, document, undefined) {

  var vnItemsTpl,
      vnItemsContainer;

  document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('h1').textContent = 'DOM Ready';

    vnItemsTpl = _.template(document.querySelector('#vn-items-tpl').innerHTML);
    vnItemsContainer = document.querySelector('.vn-item-container');

    getCars();
  });

  // Get cars from json file
  function getCars() {
    var data,
        request = new XMLHttpRequest();

    request.open('GET', 'cars/stock.json', true);

    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        // Success
        data = JSON.parse(request.responseText);
        //console.log(data.vehicle.list.length +' véhicules chargés');

        vnItemsContainer.innerHTML = vnItemsTpl({
          vehicles: data.vehicle.list
        });
      } else {
        // error
      }
    };

    request.onerror = function() {
      // error
    };

    request.send();
  }

}(window, document));
