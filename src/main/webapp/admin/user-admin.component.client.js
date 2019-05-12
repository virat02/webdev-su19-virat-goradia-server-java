(function () {
    var $usernameFld, $passwordFld;
    var $firstNameFld, $lastNameFld;
    var $roleFld, $dobFld;
    var $removeBtn, $editBtn, $createBtn;

    var $userRowTemplate, $tbody;
    var userService = new AdminUserServiceClient();

    //Set the id
    $i = $('#adminPanel tr').length + 1;

    $(main);

    function main() {

        //Get all the fields
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
    }

    //Function to clear text boxes
    function clearTextBoxes() {
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

    // function findAllUsers() { … }
    // function findUserById() { … }

    //Function to delete the user based on the user id
    function deleteUser(userId) {
        userService.deleteUser(userId).then(renderUsers)
    }

    // function selectUser() { … }
    // function updateUser() { … }
    // function renderUser(user) { … }

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
