const BASE_API_URL = 'http://localhost:3000/v1';
const LOCATIONS_API = `${BASE_API_URL}/locations`;

const getLocations = () => _get(LOCATIONS_API);