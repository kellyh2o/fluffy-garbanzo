const getFormValues = () => {
    const firstName = document.getElementById('formInputFirstNameReg').value;
    const lastName = document.getElementById('formInputLastNameReg').value;
    const username = document.getElementById('formInputUsernameReg').value;
    const oldPassword = document.getElementById('formInputCurrentPasswordReg')
      .value;
    const newPassword = document.getElementById('formInputNewPasswordReg').value;
    const email = document.getElementById('formInputEmailReg').value;
    return { firstName, lastName, username, oldPassword, newPassword, email };
  };
  
  const validate = () => {
    const { firstName, lastName, username, oldPassword, newPassword, email } = getFormValues();
  
    if (firstName && !oldPassword) {
        alert('A password is required to update your first name.');
        return { firstName, lastName, username, oldPassword, newPassword, email };
    }
    else if (lastName && !oldPassword) {
        alert('A password is required to update your last name.');
        return { firstName, lastName, username, oldPassword, newPassword, email };
    }
    else if (username && !oldPassword) {
        alert('A password is required to update your username.');
        return { firstName, lastName, username, oldPassword, newPassword, email };
    } else if (email && !oldPassword) {
        alert('A password is required to update your email.');
        return { firstName, lastName, username, oldPassword, newPassword, email };
    } else if (!oldPassword && newPassword) {
        alert('A current password is required.');
        return { firstName, lastName, username, oldPassword, newPassword, email };
    }
    return { firstName, lastName, username, oldPassword, newPassword, email, isValid: true };
  };
  
  const resetFields = () => {
    document.getElementById('formInputFirstNameReg').value = '';
    document.getElementById('formInputLastNameReg').value = '';
    document.getElementById('formInputUsernameReg').value = '';
    document.getElementById('formInputCurrentPasswordReg').value = '';
    document.getElementById('formInputNewPasswordReg').value = '';
    document.getElementById('formInputEmailReg').value = '';
  };
  
  const saveChanges = async (e) => {
    e.preventDefault();
  
    const { firstName, lastName, username, email, oldPassword, newPassword, isValid } = validate();
    
    if (isValid) {
        try {
            const myProfile = await userService.getMe();
    
            const response = await userService.updateMe({
                firstName: firstName ? firstName : myProfile.firstName,
                lastName: lastName ? lastName : myProfile.lastName,
                username: username ? username : myProfile.username,
                email: email ? email : myProfile.email,
                oldPassword: newPassword ? oldPassword : "",
                password: newPassword ? newPassword : myProfile.oldPassword
            });
    
            if (response) {
                if (response.status && response.status !== 200) {
                    alert("An error occurred while updating your settings. Please try again later.");
                    resetFields();
                }
                else {
                    alert("Updated successfully.");
                    resetFields();
                }
            }
        } catch (err) {
            console.log(err);
            alert('Cannot process your request at this time.');
        }
    }
  };