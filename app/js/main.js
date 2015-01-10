(function(window, document, undefined) {

  var vnItemsTpl,
      vnItemsContainer;

  document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('h1').textContent = 'DOM Ready';

    vnItemsTpl = _.template(document.querySelector('#vn-items-tpl').innerHTML);
    vnItemsContainer = document.querySelector('.vn-item-container');

    insertTag();

    getCars();
  });

  function insertTag() {
    var h1 = document.querySelector('h1'),
        tag = document.createElement('p');

    tag.innerText = 'Example of added node';
    insertAfter(tag, h1);
  }

  /**
   * Insert new node after element
   *
   * @param newElement The new node
   * @param targetElement The target node
   */
  function insertAfter(newElement, targetElement) {
    // Target is what you want it to go after. Look for this elements parent.
    var parent = targetElement.parentNode;

    // If the parents lastchild is the targetElement...
    if (parent.lastchild == targetElement) {
      // Add the newElement after the target element.
      parent.appendChild(newElement);
    } else {
      // Else the target has siblings, insert the new element between the target and it's next sibling.
      parent.insertBefore(newElement, targetElement.nextSibling);
    }
  }

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
