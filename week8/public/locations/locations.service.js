/**
 * @class Locations
 * 
 * Creates a list of locations and updates a list
 */
class Locations {
  locations = [];
  locationsService;

  constructor(locationsService) {
      this.locationsService = locationsService;
  }

  init() {
      this.render();
  }

  /**
   * DOM renderer for building the list row item.
   * Uses bootstrap classes with some custom overrides.
   *
   * {@link https://getbootstrap.com/docs/4.4/components/list-group/}
   * @example
   * <li class="list-group-item">
   *   <button class="btn btn-secondary" onclick="deleteLocation(e, index)">X</button>
   *   <span>Location name</span>
   *   <span>date create</span>
   * </li>
   */
  _renderListRowItem = (location) => {
      const listGroupItem = document.createElement('li');
      listGroupItem.id = `location-${location._id}`;
      listGroupItem.className = 'list-group-item';

      const deleteBtn = document.createElement('button');
      const deleteBtnTxt = document.createTextNode('X');
      deleteBtn.id = 'delete-btn';
      deleteBtn.className = 'btn btn-secondary';
      deleteBtn.addEventListener('click', this._deleteEventHandler(location._id));
      deleteBtn.appendChild(deleteBtnTxt);

      const locationNameSpan = document.createElement('span');
      const locationName = document.createTextNode(location.name);
      locationNameSpan.appendChild(locationName);

      const locationDateSpan = document.createElement('span');
      const locationDate = document.createTextNode(location.createdAt);
      locationDateSpan.append(locationDate);

      // add list item's details
      listGroupItem.append(deleteBtn);
      listGroupItem.append(locationNameSpan);
      listGroupItem.append(locationDateSpan);

      return listGroupItem;
  };

  /**
   * Assembles the list items tehn moutns them to a parent node.
   */
  _renderList = () => {
      // get the "Loading..." text node from parent element
      const locationsDiv = document.getElementById('locations');
      const loadingDiv = locationsDiv.childNodes[0];
      const fragment = document.createDocumentFragment();
      const ul = document.createElement('ul');
      ul.id = 'locations-list';
      ul.className = 'list-group list-group-flush checked-list-box';

      this.locations.map((location) => {
          const listGroupRowItem = this._renderListRowItem(location);

          // add entire list item
          ul.appendChild(listGroupRowItem);
      });

      fragment.appendChild(ul);
      locationsDiv.replaceChild(fragment, loadingDiv);
  }

  /** 
   * Display a default message when a user has an empty list.
   */
  _renderMsg = () => {
      const locationsDiv = document.getElementById('locations');
      const loadingDiv = locationsDiv.childNodes[0];
      const listParent = document.getElementById('locations-list');
      const msgDiv = this._createMsgElement('Create some new locations!');

      if (locationsDiv) {
          locationsDiv.replaceChild(msgDiv, loadingDiv);
      } else {
          locationsDiv.replaceChild(msgDiv, listParent);
      }
  }

  /**
   * Pure function for adding a location.
   *
   * @param {Object} newLocation - form's values as an object
   */
  addLocation = async (newLocation) => {
    try {
      const { name } = newLocation;
      const savedLocation = await this.locationsService.addLocation({ name }); // we just want the name
      if (savedLocation) {
        this.locations.push(savedLocation); // push location with all it parts
      } else {
        this.locations.push(newLocation);
      }
      return savedLocation;
    } catch (err) {
      console.log(err);
      alert('Unable to add location. Please try again later.');
      return null;
    }
};

/**
 * DOM Event handler helper for adding a location to the DOM.
 *
 * @param {string} locationId - id of the location to delete
 */
_addLocationEventHandler = async () => {
  const locationInput = document.getElementById('formInputLocationName');
  const locationName = locationInput.value;

  // validation checks
  if (!locationName) {
    alert('Please enter a location name.');
    return;
  }

  const savedLocation = await this.addLocation({ name: locationName });

  const { newLocationEl } = this._createNewLocationEl(savedLocation); // add location to list


  const listParent = document.getElementById('locations-list');

  if (listParent) {
    listParent.appendChild(newLocationEl);
  } else {
    this._renderList();
  }
  locationInput.value = ''; // clear form text input
};

/**
 * Create the DOM element for the new location with all its parts.
 *
 * @param {Object} location - { name } partial location object
 */
_createNewLocationEl = (location) => {
  const newLocationEl = this._renderListRowItem(location);

  return { newLocationEl };
};

  /**
   * Pure function for deleting a location.
   *
   * @param {string} locationId - id for the location to be deleted
   */
  deleteLocation = async (locationId) => {
    try {
      const res = await this.locationsService.deleteLocation(locationId);
      this.locations = this.locations.filter((location) => location._id !== locationId);

      if (res !== null) {
        alert('Location deleted successfully!');
      }
      return res;
    } catch (err) {
      alert('Unable to delete location. Please try again later.');
    }
  };

  /**
   * Event handler helpder for deleting a location from the DOM.
   * This relies on a pre-existing location in the list of locations.
   * 
   * @param {string} locationId - id of the location to delete
   */
  _deleteEventHandler = (locationId) => () => {
    const location = document.getElementById(`location-${locationId}`);
    location.remove();

    this.deleteLocation(locationId).then(() => {
      if (!this.locations.length) {
        this._renderMsg();
      }
    });
  }

  /**
   * Creates a message div block.
   * 
   * @param {string} msg - custom message to display
   */
  _createMsgElement = (msg) => {
      const msgDiv = document.createElement('div');
      const text = document.createTextNode(msg);
      msgDiv.id = 'user-message';
      msgDiv.className = 'center';
      msgDiv.appendChild(text);

      return msgDiv;
  }

  render = async () => {
      const locations = await this.locationsService.getLocations();

      try {
          if (locations.length) {
              this.locations = locations;

              this._renderList();
          } else {
              this._renderMsg();
          }
      } catch (err) {
          alert(`Error: ${err.message}`);
      }
  }
}
