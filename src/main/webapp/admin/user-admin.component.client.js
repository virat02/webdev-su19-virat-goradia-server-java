(function () {

    //Fields
    const $usernameFld = $('#usernameFld');
    const $passwordFld = $('#passwordFld');
    const $firstNameFld = $('#firstNameFld');
    const $lastNameFld = $('#lastNameFld');
    const $dobFld = $('#dobFld');
    const userRowTemplate = $('.wbdv-userRowTemplate');
    const tbody = $('tbody');

    //Buttons
    const $createBtn = $('#createBtn');
    const $deleteBtn = $('#deleteBtn');
    const $updateBtn = $('#updateBtn');
    const $editBtn = $('#editBtn');

    //URL'S
    const findAllUsersUrl = 'http://localhost:8080/users';
    const deleteUserUrl = 'http://localhost:8080/users/USER_ID';

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
        deleteBtn = $(event.currentTarget);
        const id = deleteBtn.attr('id');
        console.log(id);
        const url = deleteUserUrl.replace('USER_ID', id);
        console.log(url);
        $.ajax(url, {
            'type': 'DELETE',
            'success': handleUsers
        })
        // const tr = currentTarget.parent().parent()
        // console.log(tr)
        // tr.remove()
    }

    function appendUserToDom(user) {
        const row = userRowTemplate.clone();

        row.removeClass('d-none');

        const usernameCol = row.find('.wbdv-usernameCol');
        const passwordCol = row.find('.wbdv-passwordCol');
        const firstNameCol = row.find('.wbdv-firstNameCol');
        const lastNameCol = row.find('.wbdv-lastNameCol');
        const dobCol = row.find('.wbdv-dobCol');

        const deleteBtn = row.find('.wbdv-remove');
        deleteBtn.click(deleteUser);
        deleteBtn.attr('id', user.id);

        usernameCol.html(user.username);
        passwordCol.html(user.password);
        firstNameCol.html(user.firstName);
        lastNameCol.html(user.lastName);
        dobCol.html(user.dob);

        $usernameFld.val("");
        $passwordFld.val("");
        $firstNameFld.val("");
        $lastNameFld.val("");
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
        const dob = $dobFld.val();

        console.log(username, password, firstName, lastName, dob);

        const user = {
            username: username,
            password: password,
            firstName: firstName,
            lastName: lastName,
            dob: dob
        };

        appendUserToDom(user)
    }
})();