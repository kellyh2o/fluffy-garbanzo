/**
 * @class LocationList
 *
 * Creates a list of locations and updates a location
 */
class LocationList {
    locations = [];

    constructor() {}

    /**
     * Builds location list parent.
     * Uses bootstrap classes with some custom overrides.
     */
    createLocationListParent = () => {
        const ul = document.createElement('ul');
        ul.id = 'locations-list';
        ul.className = 'list-group list-group-flush checked-list-box';
        return ul;
    };

    _deleteEventHandler = (locationId) => async () => {
        if (locationId) {
            const res = await deleteLocation(locationId);

            if (res !== null) {
                this.locations = this.locations.filter((location) => location._id !== locationId);
                const location = document.getElementById(`location-${locationId}`);
                location.remove();

                if (!this.locations.length) {
                    const div = document.getElementById('locations');
                    const loadingDiv = div.childNodes[1];
                    const errDiv = this.generateErrorMsg('Create some new locations!');
                    div.replaceChild(errDiv, loadingDiv);
                }
            }
        }
    }

/**
   * Builds the list item.
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
  buildLocationListRowItem = (location) => {
    const listGroupItem = document.createElement('li');
    listGroupItem.id = `location-${location._id}`; // task-1
    listGroupItem.className = 'list-group-item';

    const deleteBtn = document.createElement('button');
    const deleteBtnTxt = document.createTextNode('X');
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
   * Assembles the list items then mounts them to a parent node.
   * Uses bootstrap classes with some custom overrides.
   */
  buildLocationsList = (mount, locations) =>
    locations.map((location) => {
      const listGroupRowItem = this.buildLocationListRowItem(location);

      // add entire list item
      mount.append(listGroupRowItem);
    });

  generateErrorMsg = (msg) => {
    const div = document.createElement('div');
    const text = document.createTextNode(msg);
    div.id = 'user-message';
    div.className = 'center';
    div.appendChild(text);
    return div;
  };

  generateLocations = async () => {
    const res = await getLocations();
    const div = document.getElementById('locations');
    const loadingDiv = div.childNodes[1];

    if (res.length) {
      this.locations = res;
      const locationDiv = this.createLocationListParent();
      this.buildLocationsList(locationDiv, res);
      div.replaceChild(locationDiv, loadingDiv);
    } else {
      const div = document.getElementById('locations');
      const loadingDiv = div.childNodes[1];
      const errDiv = this.generateErrorMsg('Create some new locations!');
      div.replaceChild(errDiv, loadingDiv);
    }
  };
}

const inst = new LocationList();

// This is an IIFE (Immediately Invoked Function Expression).
(async () => {
  inst.generateLocations();
})();