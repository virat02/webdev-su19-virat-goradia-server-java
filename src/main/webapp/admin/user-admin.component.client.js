(function () {

    //Fields
    const $usernameFld = $('#usernameFld');
    const $passwordFld = $('#passwordFld');
    const $firstNameFld = $('#firstNameFld');
    const $lastNameFld = $('#lastNameFld');
    const $roleFld = $('#roleFld');
    const $dobFld = $('#dobFld');
    const userRowTemplate = $('.wbdv-userRowTemplate');
    const tbody = $('tbody');

    //Buttons
    const $createBtn = $('.wbdv-create');
    const $deleteBtn = $('.wbdv-remove');
    const $updateBtn = $('.wbdv-update');
    const $editBtn = $('.wbdv-edit');

    //URL'S
    const findAllUsersUrl = 'http://localhost:8080/users';
    const deleteUserUrl = 'http://localhost:8080/delete/user/USER_ID';

    $.ajax(findAllUsersUrl, {
        'success': handleUsers
    });

    function handleUsers(users) {
        for(i in users) {
            appendUserToDom(users[i])
        }
    }

    //$elem.append('<h1>Welcome to jQuery</h1>');

    $createBtn.click(createUser);
    $deleteBtn.click(deleteUser);

    //Function to handle delete user event when clicked on cross icon
    function deleteUser(event) {

        let currentTarget = $(event.currentTarget);
        const id = currentTarget.attr('id');
        const url = deleteUserUrl.replace('USER_ID', id);
        console.log(url);

        $.ajax(url, {
            type: 'DELETE',
            'success': handleUsers
        })

    }

    //Function to append all the existing users to the DOM
    function appendUserToDom(user) {
        const row = userRowTemplate.clone();

        row.removeClass('d-none');

        const usernameCol = row.find('.wbdv-usernameCol');
        const passwordCol = row.find('.wbdv-passwordCol');
        const firstNameCol = row.find('.wbdv-firstNameCol');
        const lastNameCol = row.find('.wbdv-lastNameCol');
        const roleCol = row.find('.wbdv-roleCol');
        const dobCol = row.find('.wbdv-dobCol');

        const deleteBtn = row.find('.wbdv-remove');
        deleteBtn.click(deleteUser);
        deleteBtn.attr('id', user.id);

        usernameCol.html(user.username);
        passwordCol.html(user.password);
        firstNameCol.html(user.firstName);
        lastNameCol.html(user.lastName);
        roleCol.html(user.role);
        dobCol.html(user.dob);

        $usernameFld.val("");
        $passwordFld.val("");
        $firstNameFld.val("");
        $lastNameFld.val("");
        $roleFld.val("");
        $dobFld.val("");

        tbody.append(row)
    }

    //Function to handle create user event when clicked on plus icon
    function createUser() {
        console.log('createUser');

        const username = $usernameFld.val();
        const password = $passwordFld.val();
        const firstName = $firstNameFld.val();
        const lastName = $lastNameFld.val();
        const role = $roleFld.val();
        const dob = $dobFld.val();

        console.log(username, password, firstName, lastName, role, dob);

        const user = {
            username: username,
            password: password,
            firstName: firstName,
            lastName: lastName,
            role: role,
            dob: dob
        };

        appendUserToDom(user)
    }
})();