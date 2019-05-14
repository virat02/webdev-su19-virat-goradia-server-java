(function () {
    var $usernameFld, $passwordFld, $userIdFld;
    var $firstNameFld, $lastNameFld;
    var $roleFld, $dobFld;
    var $createBtn;

    var $userRowTemplate, $tbody;
    var userService = new AdminUserServiceClient();

    //Set the id
    $i = $('#adminPanel tr').length + 1;

    $(main);

    function main() {

        //Get all the fields
        $userIdFld = $("#userIdFld");
        $usernameFld = $("#usernameFld");
        $passwordFld = $("#passwordFld");
        $firstNameFld = $("#firstNameFld");
        $lastNameFld = $("#lastNameFld");
        $roleFld = $("#roleFld");
        $dobFld = $("#dobFld");

        $userRowTemplate = $(".wbdv-userRowTemplate");
        $tbody = $(".wbdv-tbody");

        userService
            .findAllUsers()
            .then(renderUsers)

        //Get the respective buttons
        $createBtn = $(".wbdv-create");

        //Executes the createUser function in userService when the create button is clicked
        $createBtn.click(function () {
            let user = createUser();
            userService.createUser(user).then(renderUsers);
            clearTextBoxes()
        });

        //Executes the deleteUser function in userService when the delete button is clicked
        $(document).on('click', '.wbdv-remove', function () {
            //Grab the userId to be deleted
            let userId = $(this).closest('tr').children('td.wbdv-userId').text();
            deleteUser(userId);
        });

        //Lets the user edit when the edit button is clicked
        $(document).on('click', '.wbdv-edit', function () {

            var userId = $(this).closest('tr').children('td.wbdv-userId').text();
            var username = $(this).closest('tr').children('td.wbdv-usernameCol').text();
            var password = $(this).closest('tr').children('td.wbdv-passwordCol').text();
            var firstName = $(this).closest('tr').children('td.wbdv-firstNameCol').text();
            var lastName = $(this).closest('tr').children('td.wbdv-lastNameCol').text();
            var role = $(this).closest('tr').children('td.wbdv-roleCol').text();
            var dob = $(this).closest('tr').children('td.wbdv-dobCol').text();

            renderUser(userId, username, password, firstName, lastName, role, dob);

        });

        //Executes the updateUser function in userService when the save button is clicked
        $(document).on('click', '.wbdv-update', function () {
            var userId = $("#userIdFld").val();
            var user = updateUser(userId);
            userService.updateUser(userId, user).then(renderUsers);

            clearTextBoxes()
        })
    }

    //Function to clear text boxes
    function clearTextBoxes() {
        $("#userIdFld").val("");
        $("#usernameFld").val("");
        $("#passwordFld").val("");
        $("#firstNameFld").val("");
        $("#lastNameFld").val("");
        $("#roleFld").val("");
        $("#dobFld").val("");
    }

    //Function to create a user
    function createUser() {
        //Get all the fields
        $usernameFld = $("#usernameFld").val();
        $passwordFld = $("#passwordFld").val();
        $firstNameFld = $("#firstNameFld").val();
        $lastNameFld = $("#lastNameFld").val();
        $roleFld = $("#roleFld").val();
        $dobFld = $("#dobFld").val();

        //Return back the user json object
        let user =  {
            "id" : $i++,
            "username" : $usernameFld,
            "firstName": $firstNameFld,
            "lastName" : $lastNameFld,
            "role" : $roleFld,
            "dob" : $dobFld,
        };

        clearTextBoxes();

        return user;
    }

    //Function to delete the user based on the user id
    function deleteUser(userId) {
        userService.deleteUser(userId).then(renderUsers)
    }

    // function selectUser() { … }

    //Function to update the user with the param userId
    function updateUser(userId) {

        //Get all the fields
        $usernameFld = $("#usernameFld").val();
        $passwordFld = $("#passwordFld").val();
        $firstNameFld = $("#firstNameFld").val();
        $lastNameFld = $("#lastNameFld").val();
        $roleFld = $("#roleFld").val();
        $dobFld = $("#dobFld").val();


        //Return back the user json object
        let user =  {
            "id" : userId,
            "username" : $usernameFld,
            "firstName": $firstNameFld,
            "lastName" : $lastNameFld,
            "role" : $roleFld,
            "dob" : $dobFld,
        };

        clearTextBoxes();
        return user;

    }

    function renderUser(userId, username, password, firstName, lastName, role, dob) {
        $("#userIdFld").val(userId);
        $("#usernameFld").val(username);
        $("#passwordFld").val(password);
        $("#firstNameFld").val(firstName);
        $("#lastNameFld").val(lastName);
        $("#roleFld").val(role);
        $("#dobFld").val(dob);
    }

    //Function to render all the existing users
    function renderUsers(users) {

        //Empty the content of the table
        $tbody.empty();

        for(var u = 0; u < users.length; u++){
            var clone = $userRowTemplate.clone();
            clone.removeClass('d-none');
            clone.find(".wbdv-userId").html(users[u].id);
            clone.find(".wbdv-usernameCol").html(users[u].username);
            clone.find(".wbdv-firstNameCol").html(users[u].firstName);
            clone.find(".wbdv-lastNameCol").html(users[u].lastName);
            clone.find(".wbdv-roleCol").html(users[u].role);
            clone.find(".wbdv-dobCol").html(users[u].dob);

            $tbody.append(clone);
        }
    }
})();
