const vueinst = new Vue({
    el: '#app',
    data: {
        users: users,
        selected_user: -1,
        delete_modal_visible: false,
        edit_modal_visible: false,
        edit_username: "",
        edit_first_name: "",
        edit_last_name: "",
        edit_email: "",
        edit_phone_number: "",
        edit_role: "",
        username_filter: "",
        user_role_filter: "all roles"
    },
    methods: {
        deleteUser: function() {
            users.splice(this.getSelectedUserIndex(), 1);
            this.users = users;
            this.filterUsers();

            this.selected_user = -1;
            this.delete_modal_visible = false;
        },
        showEditModal: function(userId) {
            this.edit_modal_visible = true;
            this.selected_user = userId;

            this.setEditValues();
        },
        setEditValues: function() {
            if (this.selected_user === -1) {
                this.edit_username = "";
                this.edit_first_name = "";
                this.edit_last_name = "";
                this.edit_email = "";
                this.edit_phone_number = "";
                this.edit_role = "";
            } else {
                this.edit_username = users[this.getSelectedUserIndex()].username;
                this.edit_first_name = users[this.getSelectedUserIndex()].firstName;
                this.edit_last_name = users[this.getSelectedUserIndex()].lastName;
                this.edit_email = users[this.getSelectedUserIndex()].email;
                this.edit_phone_number = users[this.getSelectedUserIndex()].phoneNumber;
                this.edit_role = users[this.getSelectedUserIndex()].role;
            }
        },
        editUser: function() {
            users[this.getSelectedUserIndex()].username = this.edit_username;
            users[this.getSelectedUserIndex()].firstName = this.edit_first_name;
            users[this.getSelectedUserIndex()].lastName = this.edit_last_name;
            users[this.getSelectedUserIndex()].email = this.edit_email;
            users[this.getSelectedUserIndex()].phoneNumber = this.edit_phone_number;
            users[this.getSelectedUserIndex()].role = this.edit_role;

            this.users = users;
            this.filterUsers();

            this.selected_user = -1;
            this.edit_modal_visible = false;
            this.setEditValues();
        },
        filterUsers: function() {
            this.users = users.filter((user) => user.username.includes(this.username_filter));
            if (this.user_role_filter !== "all roles") {
                this.users = this.users.filter((user) => user.role === this.user_role_filter);
            }
        },
        getSelectedUserIndex: function() {
            return users.findIndex((user) => user.id === this.selected_user);
        },
        getSelectedUser: function() {
            return users[this.getSelectedUserIndex()];
        }
    }
});
