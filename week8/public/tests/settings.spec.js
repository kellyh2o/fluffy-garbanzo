const usersService = new UserApiService();


describe('Bike Park Locations App', () => {
  fit('should update a users settings', async () => {

    const updatedUser = {
        firstName: "testUser",
        password: "testPassword"
    }

    const updateUserServiceSpy = spyOn(usersService, 'updateMe');

    await usersService.updateMe(updatedUser);

    expect(updateUserServiceSpy).toHaveBeenCalled();
  });
});