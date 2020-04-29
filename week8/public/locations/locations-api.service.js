const LOCATIONS_API = `${BASE_API_URL}/locations`;

class LocationsService {
    getLocations = () => _get(LOCATIONS_API, OPTIONS_WITH_AUTH);

    addLocation = (formData) => _post(LOCATIONS_API, formData, DEFAULT_OPTIONS_WITH_AUTH);

    deleteLocation = (locationId) => _delete(`${LOCATIONS_API}/${locationId}`, OPTIONS_WITH_AUTH);
}
