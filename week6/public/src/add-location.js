/**
 * AJAX add new location to location list on save.
 */
const doAddLocation = async (e) => {
  e.preventDefault();

  const locationInput = document.getElementById('formInputLocationName');
  const locationName = locationInput.value;

  if (!locationName) {
    alert('Please enter a location name.');
    return;
  }

  const res = await addLocation({ name: locationName });

  if (res !== null) {
    inst.generateLocations();
  }
  locationInput.value = '';
};