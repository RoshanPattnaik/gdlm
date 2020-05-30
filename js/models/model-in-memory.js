directory.Employee = Backbone.Model.extend({

    initialize:function () {
        this.reports = new directory.ReportsCollection();
        this.reports.parent = this;
    },

    sync: function(method, model, options) {
        if (method === "read") {
            directory.store.findById(parseInt(this.id), function (data) {
                options.success(data);
            });
        }
    }

});

directory.EmployeeCollection = Backbone.Collection.extend({

    model: directory.Employee,

    sync: function(method, model, options) {
        if (method === "read") {
            directory.store.findByName(options.data.name, function (data) {
                options.success(data);
            });
        }
    }

});

directory.ReportsCollection = Backbone.Collection.extend({

    model: directory.Employee,

    sync: function(method, model, options) {
        if (method === "read") {
            directory.store.findByManager(this.parent.id, function (data) {
                options.success(data);
            });
        }
    }

});

directory.MemoryStore = function (successCallback, errorCallback) {

    this.findByName = function (searchKey, callback) {
        var employees = this.employees.filter(function (element) {
            var fullName = element.firstName + " " + element.lastName;
            return fullName.toLowerCase().indexOf(searchKey.toLowerCase()) > -1;
        });
        callLater(callback, employees);
    }

    this.findByManager = function (managerId, callback) {
        var employees = this.employees.filter(function (element) {
            return managerId === element.managerId;
        });
        callLater(callback, employees);
    }

    this.findById = function (id, callback) {
        var employees = this.employees;
        var employee = null;
        var l = employees.length;
        for (var i = 0; i < l; i++) {
            if (employees[i].id === id) {
                employee = employees[i];
                break;
            }
        }
        callLater(callback, employee);
    }

    // Used to simulate async calls. This is done to provide a consistent interface with stores that use async data access APIs
    var callLater = function (callback, data) {
        if (callback) {
            setTimeout(function () {
                callback(data);
            });
        }
    }

    this.employees = [
        {"id": 1, "firstName": "Deepak", "lastName": "Mishra", "managerId": 0, managerName: "", "title": "ESB Deployment Lead", "department": "GC EMEA ESB", "soeId": "dm46555", "cellPhone": "+65-81822010","email": "dl.gct.ap.cto.iccesb.ceemea.support@imcap.ap.ssmb.com", "role": "Escalation", "pic": "deepak_mishra.jpg"},
        {"id": 2, "firstName": "Murugaraj", "lastName": "Govindraj", "managerId": 1, managerName: "Deepak Mishra", "title": "EMEA ESB Deployment Lead", "department": "GC EMEA ESB", "soeId": "mg10073", "cellPhone": "+65-93867642","email": "dl.gct.ap.cto.iccesb.ceemea.support@imcap.ap.ssmb.com", "role": "Primary", "pic": "murugaraj_govindraj.jpg"},
		{"id": 3, "firstName": "Ramesh", "lastName": "Jonnalagadda", "managerId": 1, managerName: "Deepak Mishra", "title": "EMEA ESB Deployment Lead", "department": "GC EMEA ESB", "soeId": "rj24657", "cellPhone": "+65-90603346","email": "dl.gct.ap.cto.iccesb.ceemea.support@imcap.ap.ssmb.com", "role": "Primary", "pic": "ramesh_jonnalagadda.jpg"}
    ];

    callLater(successCallback);

}

directory.store = new directory.MemoryStore();