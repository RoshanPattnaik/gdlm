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
	    {"id": 1, "firstName": "Rupak", "lastName": "Bhattacharya", "managerId": 0, managerName: "", "title": "GDLM Onshore Team", "department": "Defect Management", "soeId": "rb67207", "cellPhone": "+65-96509544","email": "*GCT Global GDLM L3 Team Leads", "role": "Defect Management", "pic": "rupak_bhattacharya.jpg"},
		{"id": 2, "firstName": "Ranjith", "lastName": "Mandal", "managerId": 1, managerName: "Rupak Bhattacharya", "title": "GDLM Onshore Team", "department": "Defect Management", "soeId": "rm92881", "cellPhone": "+65-96580980","email": "*GCT Global GDLM L3 Team Leads", "role": "APAC CMS/CHANNELS LEAD", "pic": ""},
		{"id": 3, "firstName": "Arun", "lastName": "Janakiraman", "managerId": 1, managerName: "Rupak Bhattacharya", "title": "GDLM Onshore Team", "department": "Defect Management", "soeId": "rm92881", "cellPhone": "+65-97352226","email": "*GCT Global GDLM L3 Team Leads", "role": "Defect Management", "pic": ""},
		{"id": 4, "firstName": "Rekha", "lastName": "Kullu", "managerId": 1, managerName: "Rupak Bhattacharya", "title": "GDLM Onshore Team", "department": "Defect Management", "soeId": "rk39248", "cellPhone": "+65-62606127","email": "*GCT Global GDLM L3 Team Leads", "role": "APAC CBOL/ICMS/DOPR LEAD", "pic": ""},
		{"id": 5, "firstName": "Sathappan", "lastName": "Alagappan", "managerId": 1, managerName: "Rupak Bhattacharya", "title": "GDLM Onshore Team", "department": "Defect Management", "soeId": "sa79517", "cellPhone": "+65-90263470","email": "*GCT Global GDLM L3 Team Leads", "role": "EMEA CBOL LEAD", "pic": "sathappan_alagappan.jpg"},
		{"id": 6, "firstName": "Mani", "lastName": "Jagatheeswar", "managerId": 1, managerName: "Rupak Bhattacharya", "title": "GDLM Onshore Team", "department": "Defect Management", "soeId": "jm59842", "cellPhone": "+65-91449324","email": "*GCT Global GDLM L3 Team Leads", "role": "Defect Management", "pic": ""},
		{"id": 7, "firstName": "Suresh", "lastName": "Veerapandian", "managerId": 1, managerName: "Rupak Bhattacharya", "title": "GDLM Onshore Team", "department": "Defect Management", "soeId": "sv84557", "cellPhone": "+65-82688436","email": "*GCT Global GDLM L3 Team Leads", "role": "Defect Management", "pic": ""},
		{"id": 8, "firstName": "Duraimurugan", "lastName": "Thiruneelakandan", "managerId": 1, managerName: "Rupak Bhattacharya", "title": "GDLM Onshore Team", "department": "Defect Management", "soeId": "dt69890", "cellPhone": "+65-94296773","email": "*GCT Global GDLM L3 Team Leads", "role": "GDLM MIS LEAD", "pic": ""},
		{"id": 9, "firstName": "Senthil", "lastName": "Rajagopalan", "managerId": 1, managerName: "Rupak Bhattacharya", "title": "GDLM Onshore Team", "department": "Defect Management", "soeId": "sr25358", "cellPhone": "+65-81894393","email": "*GCT Global GDLM L3 Team Leads", "role": "EXTERNAL INTERFACES", "pic": ""},
		{"id": 10, "firstName": "Inthumathi", "lastName": "Viswanathan", "managerId": 1, managerName: "Rupak Bhattacharya", "title": "GDLM Onshore Team", "department": "Defect Management", "soeId": "iv47905", "cellPhone": "+65-88695357","email": "*GCT Global GDLM L3 Team Leads", "role": "Defect Management", "pic": "inthumathi_viswanathan"},
		{"id": 11, "firstName": "Raghavendra", "lastName": "Kondapalli", "managerId": 1, managerName: "Rupak Bhattacharya", "title": "GDLM Onshore Team", "department": "Defect Management", "soeId": "rk07484", "cellPhone": "+65-97259676","email": "*GCT Global GDLM L3 Team Leads", "role": "APAC ESB/PSG LEAD", "pic": ""},
		{"id": 12, "firstName": "Vijay", "lastName": "Vedantham", "managerId": 1, managerName: "Rupak Bhattacharya", "title": "GDLM Onshore Team", "department": "Defect Management", "soeId": "vv17293", "cellPhone": "+65-92343546","email": "*GCT Global GDLM L3 Team Leads", "role": "APAC ESB/PSG LEAD", "pic": ""},
		{"id": 13, "firstName": "Suryanarayan", "lastName": "Ramesh", "managerId": 1, managerName: "Rupak Bhattacharya", "title": "GDLM Onshore Team", "department": "Defect Management", "soeId": "sr47822", "cellPhone": "+65-83894537","email": "*GCT Global GDLM L3 Team Leads", "role": "Defect Management", "pic": ""},
		{"id": 14, "firstName": "Roshan", "lastName": "Pattnaik", "managerId": 1, managerName: "Rupak Bhattacharya", "title": "GDLM Onshore Team", "department": "Defect Management", "soeId": "rp26881", "cellPhone": "+65-91367028","email": "*GCT Global GDLM L3 Team Leads", "role": "EMEA ESB/PSG/APIM", "pic": ""},
		{"id": 15, "firstName": "Prashant", "lastName": "Hagavane", "managerId": 1, managerName: "Rupak Bhattacharya", "title": "GDLM Onshore Team", "department": "Defect Management", "soeId": "ph78761", "cellPhone": "+91-9768625925","email": "*GCT Global GDLM L3 Team Leads", "role": "EMEA MBOL LEAD", "pic": "prashant_hagavane"},
		{"id": 16, "firstName": "Sheela", "lastName": "Ramankutty", "managerId": 1, managerName: "Rupak Bhattacharya", "title": "GDLM Onshore Team", "department": "Defect Management", "soeId": "sr41591", "cellPhone": "+65-93365781","email": "*GCT Global GDLM L3 Team Leads", "role": "EXTERNAL INTERFACES", "pic": ""},
		{"id": 17, "firstName": "Smitha", "lastName": "Karunakaran", "managerId": 1, managerName: "Rupak Bhattacharya", "title": "GDLM Onshore Team", "department": "Defect Management", "soeId": "sk98253", "cellPhone": "+65-90052634","email": "*GCT Global GDLM L3 Team Leads", "role": "APAC MBOL LEAD", "pic": ""},
		{"id": 18, "firstName": "Ramesh", "lastName": "Selvaraj", "managerId": 1, managerName: "Rupak Bhattacharya", "title": "GDLM Onshore Team", "department": "Defect Management", "soeId": "rs93802", "cellPhone": "+65-91822508","email": "*GCT Global GDLM L3 Team Leads", "role": "Defect Management", "pic": ""},
		{"id": 19, "firstName": "Chiranjeev", "lastName": "Kumar", "managerId": 1, managerName: "Rupak Bhattacharya", "title": "GDLM Onshore Team", "department": "Defect Management", "soeId": "kc96578", "cellPhone": "+65-96509544","email": "*GCT Global GDLM L3 Team Leads", "role": "Defect Management", "pic": ""},
        {"id": 20, "firstName": "Deepak", "lastName": "Mishra", "managerId": 0, managerName: "", "title": "ESB Deployment Lead", "department": "GC EMEA ESB", "soeId": "dm46555", "cellPhone": "+65-81822010","email": "dl.gct.ap.cto.iccesb.ceemea.support@imcap.ap.ssmb.com", "role": "Escalation", "pic": "deepak_mishra.jpg"},        
		{"id": 21, "firstName": "Ramesh", "lastName": "Jonnalagadda", "managerId": 20, managerName: "Deepak Mishra", "title": "EMEA ESB Deployment Lead", "department": "GC EMEA ESB", "soeId": "rj24657", "cellPhone": "+65-90603346","email": "dl.gct.ap.cto.iccesb.ceemea.support@imcap.ap.ssmb.com", "role": "Primary", "pic": "ramesh_jonnalagadda.jpg"},
		{"id": 22, "firstName": "Murugaraj", "lastName": "Govindraj", "managerId": 21, managerName: "Deepak Mishra", "title": "EMEA ESB Deployment Lead", "department": "GC EMEA ESB", "soeId": "mg10073", "cellPhone": "+65-93867642","email": "dl.gct.ap.cto.iccesb.ceemea.support@imcap.ap.ssmb.com", "role": "Primary", "pic": "murugaraj_govindraj.jpg"},
		{"id": 23, "firstName": "Rakesh", "lastName": "Ranjan", "managerId": 0, managerName: "Rakesh Ranjan", "title": "EMEA-CAPI-PAY(162733)", "department": "GC EMEA ESB", "soeId": "rr56713", "cellPhone": "+65-91997145","email": "", "role": "Escalation", "pic": ""},
		{"id": 24, "firstName": "Vineet", "lastName": "Bengani", "managerId": 23, managerName: "Rakesh Ranjan", "title": "EMEA-CAPI-PAY(162733)", "department": "GC EMEA ESB", "soeId": "vb68476", "cellPhone": "","email": "", "role": "Primary", "pic": ""},
		{"id": 25, "firstName": "Niket", "lastName": "Sharma", "managerId": 23, managerName: "Rakesh Ranjan", "title": "EMEA-CAPI-PAY(162733)", "department": "GC EMEA ESB", "soeId": "ns15408", "cellPhone": "","email": "", "role": "Primary", "pic": ""},
		{"id": 26, "firstName": "Jyothsna", "lastName": "Lekhala", "managerId": 23, managerName: "Rakesh Ranjan", "title": "EMEA-CAPI-PAY(162733)", "department": "GC EMEA ESB", "soeId": "jl52080", "cellPhone": "","email": "", "role": "Primary", "pic": ""},
		{"id": 27, "firstName": "Manasa Anjani", "lastName": "Madduri", "managerId": 23, managerName: "Rakesh Ranjan", "title": "EMEA-CAPI-PAY(162733)", "department": "GC EMEA ESB", "soeId": "mm86544", "cellPhone": "","email": "", "role": "Secondary", "pic": ""},
		{"id": 28, "firstName": "Mandar", "lastName": "Pathankar", "managerId": 23, managerName: "Rakesh Ranjan", "title": "EMEA-CAPI-PAY(162733)", "department": "GC EMEA ESB", "soeId": "mp55902", "cellPhone": "","email": "", "role": "Secondary", "pic": ""},
		{"id": 29, "firstName": "Surya Prakash", "lastName": "Bhupalan", "managerId": 23, managerName: "Rakesh Ranjan", "title": "EMEA-CAPI-PAY(162733)", "department": "GC EMEA ESB", "soeId": "sb8925", "cellPhone": "","email": "", "role": "Primary", "pic": ""},
		{"id": 30, "firstName": "Pradeepan", "lastName": "Ravichandran", "managerId": 0, managerName: "", "title": "EMEA-CAPI-RETAIL(162733)", "department": "GC EMEA ESB", "soeId": "pr04657", "cellPhone": "+65 94239783","email": "", "role": "Primary", "pic": ""},
		{"id": 31, "firstName": "Kiran Kumar", "lastName": "Guthi", "managerId": 30, managerName: "Pradeepan Ravichandran", "title": "EMEA-CAPI-RETAIL(162733)", "department": "GC EMEA ESB", "soeId": "kg52858", "cellPhone": "","email": "", "role": "Primary", "pic": ""},
		{"id": 32, "firstName": "Biju", "lastName": "Baby", "managerId": 0, managerName: "", "title": "EMEA-CAPI-RETAIL(162733)", "department": "GC EMEA ESB", "soeId": "bb45905", "cellPhone": "+65 96551581","email": "", "role": "Escalation", "pic": ""},
		{"id": 33, "firstName": "Abhay Raj", "lastName": "Sinha", "managerId": 32, managerName: "Biju Baby", "title": "EMEA-CAPI-RETAIL(162733)", "department": "GC EMEA ESB", "soeId": "as92439", "cellPhone": "+65 81497015","email": "", "role": "Primary", "pic": ""},
		{"id": 34, "firstName": "Preetham", "lastName": "Parthiban", "managerId": 0, managerName: "", "title": "EMEA-CAPI-FRAMEWORK(162733)", "department": "GC EMEA ESB", "soeId": "pp60905", "cellPhone": "","email": "", "role": "Primary", "pic": ""},
		{"id": 35, "firstName": "Ravikant", "lastName": "Sharma", "managerId": 0, managerName: "", "title": "APIM", "department": "GC EMEA ESB", "soeId": "sr66643", "cellPhone": "+65 82389192","email": "", "role": "Primary", "pic": ""},
		{"id": 36, "firstName": "Sandeep", "lastName": "Mahapatra", "managerId": 35, managerName: "Ravikant Sharma", "title": "APIM", "department": "GC EMEA ESB", "soeId": "sm08673", "cellPhone": "+91 9172066975","email": "dl.gct.apac,apim.adp.dev.team@imcap.ap.ssmb.com", "role": "Primary", "pic": ""}
		
    ];

    callLater(successCallback);

}

directory.store = new directory.MemoryStore();