const vueinst = new Vue({
    el: '#app',
    data: {
        clubs: clubs,
        selected_club: -1,
        delete_modal_visible: false,
        edit_modal_visible: false,
        add_modal_visible: false,
        edit_color: "",
        edit_name: "",
        edit_managers: [],
        manager_dropdown_visible: false,
        new_manager: "",
        available_managers: [],
    },
    methods: {
        getClubManagers: function(clubId) {
            var club = clubs.find((c) => c.id === clubId);

            let clubManagers = "";
            for (let i in club.managers) {
                if (i === "0") {
                    clubManagers += club.managers[i].username;
                } else {
                    clubManagers += ", ";
                    clubManagers += club.managers[i].username;
                }
            }
            return clubManagers;
        },
        deleteClub: function() {
            clubs.splice(this.getSelectedClubIndex(), 1);
            this.clubs = clubs;

            this.selected_club = -1;
            this.delete_modal_visible = false;
        },
        showEditModal: function(clubId) {
            this.edit_modal_visible = true;
            this.selected_club = clubId;
            this.setEditValues();
        },
        editClub: function() {
            clubs[this.getSelectedClubIndex()].color = this.edit_color;
            clubs[this.getSelectedClubIndex()].name = this.edit_name;
            clubs[this.getSelectedClubIndex()].managers = JSON.parse(
                JSON.stringify(this.edit_managers)
            );

            this.clubs = clubs;
            this.edit_modal_visible = false;
            this.selected_club = -1;
            this.resetEditValues();
        },
        setEditValues: function() {
            if (this.selected_club === -1) {
                this.resetEditValues();
            } else {
                this.edit_color = this.getSelectedClub().color;
                this.edit_name = this.getSelectedClub().name;
                this.edit_managers = JSON.parse(JSON.stringify(this.getSelectedClub().managers));
                this.new_manager = "";
                this.manager_dropdown_visible = false;
                this.available_managers = [];
            }
        },
        getSelectedClubIndex: function() {
            return clubs.findIndex((club) => club.id === this.selected_club);
        },
        getSelectedClub: function() {
            return clubs[this.getSelectedClubIndex()];
        },
        removeManager: function(index) {
            this.edit_managers.splice(index, 1);
            this.updateAvailableManagers();
        },
        updateAvailableManagers: function() {
            let not_available_managers = [];
            for (let manager of this.edit_managers) {
                not_available_managers.push(manager.username);
            }

            this.available_managers = users.filter(
                (user) => user.role === "CLUB MANAGER" && !not_available_managers.includes(user.username)
            );
        },
        showManagerDropdownOrAddManager: function() {
            if (this.new_manager === "") {
                this.updateAvailableManagers();
                this.manager_dropdown_visible = true;
            } else {
                this.addManager();
            }
        },
        addManager: function() {
            let manager = users.find((user) => user.username === this.new_manager);
            this.edit_managers.push(manager);
            this.manager_dropdown_visible = false;
            this.new_manager = "";
        },
        resetEditValues: function() {
            this.edit_color = "#000000";
            this.edit_name = "";
            this.edit_managers = [];
            this.new_manager = "";
            this.manager_dropdown_visible = false;
            this.available_managers = [];
        },
        showAddModal: function() {
            this.add_modal_visible = true;
            this.resetEditValues();
        },
        addClub: function() {
            let new_club = {
                id: clubs.length + 1,
                color: this.edit_color,
                name: this.edit_name,
                managers: JSON.parse(JSON.stringify(this.edit_managers))
            };

            clubs.push(new_club);
            this.clubs = clubs;
            this.add_modal_visible = false;
            this.resetEditValues();
        }
    }
});
