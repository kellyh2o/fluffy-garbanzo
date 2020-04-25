const locationsService = new LocationsService();
const locations = new Locations(locationsService);

describe('Bike Park Locations App', () => {
  fit('should initialize some HTML', () => {
    spyOn(locations, 'init');
    locations.init();

    expect(locations.init).toHaveBeenCalled();
  });

  fit('should add a location', async () => {
    const newLocation = {
      name: 'Regis University Mountain Bike Park',
      _id: 'c57b9102-35e3-4807-897f-9a8a282cd086'
    };

    const addLocationServiceSpy = spyOn(locationsService, 'addLocation');
    expect(locations.locations.length).toBe(0);

    await locations.addLocation(newLocation);

    expect(addLocationServiceSpy).toHaveBeenCalled();
    expect(locations.locations.length).toBe(1);
  });

  fit('should delete a location', async () => {

    const testLocation = {
        name: 'Regis University Mountain Bike Park',
        _id: 'c57b9102-35e3-4807-897f-9a8a282cd086'
    };

    const deleteLocationServiceSpy = spyOn(locationsService, 'deleteLocation');

    expect(locations.locations.length).toBe(1);

    await locations.deleteLocation(testLocation._id);

    expect(deleteLocationServiceSpy).toHaveBeenCalled();
    expect(locations.locations.length).toBe(0);

  });

  xit('should update an individual task', () => {
    // ..
  });
});