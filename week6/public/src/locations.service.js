const LOCATIONS_API = `${BASE_API_URL}/locations`;

const getLocations = () => _get(LOCATIONS_API, OPTIONS_WITH_AUTH);

const addLocation = (formData) =>
  _post(LOCATIONS_API, formData, DEFAULT_OPTIONS_WITH_AUTH);

const deleteLocation = (locationId) =>
  _delete(`${LOCATIONS_API}/${locationId}`, OPTIONS_WITH_AUTH);