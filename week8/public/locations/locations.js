/**
 * AJAX add new locations to location list on save.
 */
const doAddLocation = async (e) => {
    e.preventDefault();
    locations._addLocationEventHandler();
  };