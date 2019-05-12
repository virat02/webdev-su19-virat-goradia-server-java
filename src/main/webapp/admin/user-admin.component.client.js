(function () {
    var $usernameFld, $passwordFld;
    var $firstNameFld, $lastNameFld;
    var $roleFld, $dobFld;
    var $removeBtn, $editBtn, $createBtn;

    var $userRowTemplate, $tbody;
    var userService = new AdminUserServiceClient();
    var userAdminHTML = this.baseURL+"/admin/user-admin.template.client.html";

    //Set the id
    $i = 1;

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
        $tbody = $('tbody');

        userService
            .findAllUsers()
            .then(renderUsers)

        //Get the respective buttons
        $createBtn = $(".wbdv-create");
        $removeBtn = $(".wbdv-remove");

        //Executes the createUser function in userService when the create button is clicked
        $createBtn.click(function () {
            var user = createUser();
            userService.createUser(user);
            window.location.replace(userAdminHTML);
        });

        //Executes the deleteUser function in userService when the delete button is clicked
        $removeBtn.click(function () {
            //Grab the userId to be deleted
            var userId = $(this).closest('tr').children('td.wbdv-userId').text();
            deleteUser(userId);
        })
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
        return {
            "id" : $i++,
            "username" : $usernameFld,
            "firstName": $firstNameFld,
            "lastName" : $lastNameFld,
            "role" : $roleFld,
            "dob" : $dobFld,
        };
    }

    // function findAllUsers() { … }
    // function findUserById() { … }

    //Function to delete the user based on the user id
    function deleteUser(userId) {
        var users = userService.deleteUser(userId);
        renderUsers(users)
        //window.location.replace(userAdminHTML);
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
