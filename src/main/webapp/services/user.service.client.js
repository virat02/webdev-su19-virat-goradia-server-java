function AdminUserServiceClient() {
    this.createUser = createUser;
    this.findAllUsers = findAllUsers;
    this.findUserById = findUserById;
    this.deleteUser = deleteUser;
    this.updateUser = updateUser;
    this.baseURL = 'http://localhost:8080';
    var self = this;

    //Function to create a user
    function createUser(user, callback) {
        return fetch(self.baseURL+"/users", {
            method: 'post',
            body: JSON.stringify(user),
            headers: {
                'content-type' : 'application/json'
            }
        }).then(response =>
            response.json().then(json => {
                return json;
            })
        );
    }

    //Function to find all the existing users
    function findAllUsers(callback) {
        return fetch(self.baseURL+"/users")
            .then(response =>
                response.json().then(json => {
                    return json;
                })
            );
    }

    //Function to find a user based on the input userId
    function findUserById(userId, callback) {
        return fetch(self.baseURL+"/user/"+userId)
            .then(function (response) {
                return response.json();
            })
    }

    //Function to update a user
    function updateUser(userId, user, callback) {
        return fetch(self.baseURL+"/users", {
            method: 'put',
            body: JSON.stringify(user),
            headers: {
                'content-type' : 'application/json'
            }
        }).then(response =>
            response.json().then(json => {
                return json;
            })
        );
    }

    //Function to delete a user based on the userId
    function deleteUser(userId, callback) {
        return fetch(self.baseURL+"/delete/user/"+userId, {
            method : 'delete'
        }).then(response =>
            response.json().then(json => {
                return json;
            })
        );
    }
}
