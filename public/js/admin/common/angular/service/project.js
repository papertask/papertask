/**
 * Created by eastagile on 11/11/14.
 */

var angularApp = angularApp || angular.module('project', []);

angularApp.factory("CurrentcyRate", function(){
    var rates = [{
        'id': 1,
        'name': 'CNY',
        'rate': 6.3,
    }
	]
	function get($id){
        for(var i = 0; i < rates.length; i++){
            if(rates[i].id == $id){
                return rates[i];
            }
        }
    }
	return {
        get: get,
        all: function () {
            return rates;
        }
    }
});	

angularApp.factory("ProjectStatus", function(){
    var statuses = [
	{
        'id': 0,
        'name': 'Quoting',
        'decorator': 'info'
    },{
        'id': 1,
        'name': 'Quoted',
        'decorator': 'info'
    },{
        'id': 2,
        'name': 'Ordered',
        'decorator': 'danger'
    },{
        'id': 3,
        'name': 'Ongoing',
        'decorator': 'danger'
    },{
        'id': 4,
        'name': 'Reviewing',
        'decorator': 'danger'
    },{
        'id': 5,
        'name': 'Completed',
        'decorator': 'danger'
    },{
        'id': 6,
        'name': 'Rejected',
        'decorator': 'danger'
    }];

    return {
        get: function ($id) {
            for (var i = 0; i < statuses.length; i++) {
                if (statuses[i].id == $id) {
                    return statuses[i];
                }
            }
        },
        all: function () {
            return statuses;
        }
    }
});

angularApp.factory("TransGraphs", function(){
    var statuses = [{
        'id': 0,
        'name': 'no',
        'decorator': 'No Translate Graphic'
    },{
        'id': 1,
        'name': 'yes',
        'decorator': 'Translate Graphic'
    }];

    return {
        get: function ($id) {
            for (var i = 0; i < statuses.length; i++) {
                if (statuses[i].id == $id) {
                    return statuses[i];
                }
            }
        },
        all: function () {
            return statuses;
        }
    }
});

angularApp.factory("Fapiao", function(){
    var statuses = [{
        'id': 0,
        'name': 'no',
        'decorator': 'No Need Fapiao'
    },{
        'id': 1,
        'name': 'yes',
        'decorator': 'No Need Fapiao'
    }];

    return {
        get: function ($id) {
            for (var i = 0; i < statuses.length; i++) {
                if (statuses[i].id == $id) {
                    return statuses[i];
                }
            }
        },
        all: function () {
            return statuses;
        }
    }
});


angularApp.factory("TaskStatus", function(){
    var unassigned = {
        'id': 3,
        'name': 'Unassigned',
        'decorator': 'danger'
    };
    var statuses = [{
        'id': 1,
        'name': 'Complete',
        'decorator': 'default'
    },{
        'id': 2,
        'name': 'Ongoing',
        'decorator': 'primary'
    }, unassigned,{
        'id': 4,
        'name': 'Pooling',
        'decorator': 'warning'
    },{
        'id': 5,
        'name': 'Evaluating',
        'decorator': 'info'
    },{
        'id': 6,
        'name': 'Assigning',
        'decorator': 'warning'
    },{
        'id': 7,
        'name': 'Reviewing',
        'decorator': 'warning'
    }
	
	];

    return {
        get: function ($id) {
            for (var i = 0; i < statuses.length; i++) {
                if (statuses[i].id == $id) {
                    return statuses[i];
                }
            }
        },
        all: function () {
            return statuses;
        },
        unassigned: unassigned
    }
});

angularApp.factory("FeedbackQuality", function(){
    var values = [{
        'id': 1,
        'name': 'Bad',
        'title': 'Very poor. There were multiple mistakes and/or the style was very poor.'
    },{
        'id': 2,
        'name': 'Poor',
        'title': 'Poor. There were mistakes and/or the style was poor.'
    },{
        'id': 3,
        'name': 'Satisfactory',
        'title': 'Satisfactory. If mistakes occurred, they were corrected.'
    },{
        'id': 4,
        'name': 'Good',
        'title': 'Good. The overall style was appropriate and there were few, if any, mistakes.'
    },{
        'id': 5,
        'name': 'Perfect',
        'title': 'Perfect'
    }];

    return {
        get: function ($id) {
            for (var i = 0; i < values.length; i++) {
                if (values[i].id == $id) {
                    return values[i];
                }
            }
        },
        all: function () {
            return values;
        }
    }
});

angularApp.factory("FeedbackTime", function(){
    var values = [{
        'id': 1,
        'name': 'Much Slower',
        'title': 'Much slower than I expected'
    },{
        'id': 2,
        'name': 'Slower',
        'title': 'Slower than I expected'
    },{
        'id': 3,
        'name': 'Satisfactory',
        'title': 'Satisfactory'
    },{
        'id': 4,
        'name': 'Faster',
        'title': 'Faster than I expected'
    },{
        'id': 5,
        'name': 'Much faster',
        'title': 'Much faster than I expected'
    }];

    return {
        get: function ($id) {
            for (var i = 0; i < values.length; i++) {
                if (values[i].id == $id) {
                    return values[i];
                }
            }
        },
        all: function () {
            return values;
        }
    }
});

angularApp.factory("ProjectPriority", function(){
    var priorities = [{
        id: 1,
        name: 'Normal',
        decorator: 'primary'
    }, {
        id: 2,
        name: 'High',
        decorator: 'danger'
    }];

    return {
        get: function ($id) {
            for (var i = 0; i < priorities.length; i++) {
                if (priorities[i].id == $id) {
                    return priorities[i];
                }
            }
        },
        all: function () {
            return priorities;
        }
    }
});


angularApp.factory("ProjectField", function(){
    var fields = [{
        'id': 1,
        'name': 'Field 1'
    },{
        'id': 2,
        'name': 'Field 2'
    },{
        'id': 3,
        'name': 'Field 3'
    },{
        'id': 4,
        'name': 'Field 4'
    }];
    return {
        get: function ($id) {
            for (var i = 0; i < fields.length; i++) {
                if (fields[i].id == $id) {
                    return fields[i];
                }
            }
        },
        all: function () {
            return fields;
        }
    }
});


angularApp.factory("PayStatus", function(){
    var statuses = [{
        'id': 1,
        'name': 'UnPaid'
    },{
        'id': 2,
        'name': 'Paid'
    }];
    return {
        get: function ($id) {
            for (var i = 0; i < statuses.length; i++) {
                if (statuses[i].id == $id) {
                    return statuses[i];
                }
            }
        },
        all: function () {
            return statuses;
        }
    }
});
angularApp.factory("Currency", function(){
    var statuses = [{
        'id': 1,
        'name': 'USD'
    },{
        'id': 2,
        'name': 'CNY'
    }];
    return {
        get: function ($id) {
            for (var i = 0; i < statuses.length; i++) {
                if (statuses[i].id == $id) {
                    return statuses[i];
                }
            }
        },
        all: function () {
            return statuses;
        }
    }
});

angularApp.factory("ProjectServiceLevel", function(){
    var levels = [{
        decorator: 'success',
        id: 1,
        name: 'Professional',
        price: {
            USD: 1.00,
            CNY: 10.00
        }
    },{
        decorator: 'info',
        id: 2,
        name: 'Business',
        price: {
            USD: 2.00,
            CNY: 20.00
        }
    }, {
        decorator: 'primary',
        id: 3,
        name: 'Premium',
        price: {
            USD: 3.00,
            CNY: 30.00
        }
    }];
    return {
        get: function($id){
            for(var i = 0; i < levels.length; i++){
                if(levels[i].id == $id){
                    return levels[i];
                }
            }
        },
        all: function(){
            return levels;
        }
    }
});
angularApp.factory("LangGroup", function(){
	var group = [{
        "id": 1,
        "name": "Afrikaans",
        "group_id": 4,
        "group_name": "Others"
    },
        {
        "id": 2,
        "name": "Arabic",
        "group_id": 1,
        "group_name": "European/CE/Greek/Russian"
    },
        {
        "id": 3,
        "name": "Belarusian",
        "group_id": 1,
        "group_name": "European/CE/Greek/Russian"
    },
        {
        "id": 4,
        "name": "Bosnian",
        "group_id": 1,
        "group_name": "European/CE/Greek/Russian"
    },
        {
        "id": 5,
        "name": "Bosnian",
        "group_id": 1,
        "group_name": "European/CE/Greek/Russian"
    },
        {
        "id": 6,
        "name": "Burmese",
        "group_id": 4,
        "group_name": "Others"
    },
	{
        "id": 7,
        "name": "Chinese (Hong Kong)",
        "group_id": 2,
        "group_name": "SC/TC/JP/KO"
    },
	{
        "id": 8,
        "name": "Chinese (Simplified)",
        "group_id": 2,
        "group_name": "SC/TC/JP/KO"
    },
        {
        "id": 9,
        "name": "Chinese (Traditional)",
        "group_id": 2,
        "group_name": "SC/TC/JP/KO"
    },
        {
        "id": 10,
        "name": "Croatian",
        "group_id": 1,
        "group_name": "European/CE/Greek/Russian"
    },
        {
        "id": 11,
        "name": "Czech",
        "group_id": 1,
        "group_name": "European/CE/Greek/Russian"
    },
        {
        "id": 12,
        "name": "Danish",
        "group_id": 1,
        "group_name": "European/CE/Greek/Russian"
    },
        {
        "id": 13,
        "name": "Dinka",
        "group_id": 4,
        "group_name": "Others"
    },
        {
        "id": 14,
        "name": "Dutch",
        "group_id": 1,
        "group_name": "European/CE/Greek/Russian"
    },
        {
        "id": 15,
        "name": "Dutch (Belgium)",
        "group_id": 1,
        "group_name": "European/CE/Greek/Russian"
    },
        {
        "id": 16,
        "name": "English",
        "group_id": 1,
        "group_name": "European/CE/Greek/Russian"
    },
        {
        "id": 17,
        "name": "English (British)",
        "group_id": 1,
        "group_name": "European/CE/Greek/Russian"
    },
        {
        "id": 18,
        "name": "English (United States)",
        "group_id": 1,
        "group_name": "European/CE/Greek/Russian"
    },
        {
        "id": 19,
        "name": "Estonian",
        "group_id": 1,
        "group_name": "European/CE/Greek/Russian"
    },
        {
        "id": 20,
        "name": "Finnish",
        "group_id": 1,
        "group_name": "European/CE/Greek/Russian"
    },
        {
        "id": 21,
        "name": "Flemish",
        "group_id": 1,
        "group_name": "European/CE/Greek/Russian"
    },
        {
        "id": 22,
        "name": "French",
        "group_id": 1,
        "group_name": "European/CE/Greek/Russian"
    },
        {
        "id": 23,
        "name": "French (Algeria)",
        "group_id": 1,
        "group_name": "European/CE/Greek/Russian"
    },
        {
        "id": 24,
        "name": "French (Belgium)",
        "group_id": 1,
        "group_name": "European/CE/Greek/Russian"
    },
        {
        "id": 25,
        "name": "French (Canada)",
        "group_id": 1,
        "group_name": "European/CE/Greek/Russian"
    },
        {
        "id": 26,
        "name": "French (Switzerland)",
        "group_id": 1,
        "group_name": "European/CE/Greek/Russian"
    },
        {
        "id": 27,
        "name": "German",
        "group_id": 1,
        "group_name": "European/CE/Greek/Russian"
    },
        {
        "id": 28,
        "name": "German (Austria)",
        "group_id": 1,
        "group_name": "European/CE/Greek/Russian"
    },
        {
        "id": 29,
        "name": "German (Switzerland)",
        "group_id": 1,
        "group_name": "European/CE/Greek/Russian"
    },
        {
        "id": 30,
        "name": "Greek",
        "group_id": 1,
        "group_name": "European/CE/Greek/Russian"
    },
        {
        "id": 31,
        "name": "Hebrew",
        "group_id": 4,
        "group_name": "Others"
    },
        {
        "id": 32,
        "name": "Hindi",
        "group_id": 4,
        "group_name": "Others"
    },
        {
        "id": 33,
        "name": "Hmong",
        "group_id": 4,
        "group_name": "Others"
    },
        {
        "id": 34,
        "name": "Hungarian",
        "group_id": 1,
        "group_name": "European/CE/Greek/Russian"
    },
        {
        "id": 35,
        "name": "Icelandic",
        "group_id": 1,
        "group_name": "European/CE/Greek/Russian"
    },
        {
        "id": 36,
        "name": "Indonesian",
        "group_id": 3,
        "group_name": "TH/VN"
    },
        {
        "id": 37,
        "name": "Italian",
        "group_id": 1,
        "group_name": "European/CE/Greek/Russian"
    },
        {
        "id": 38,
        "name": "Japanese",
        "group_id": 2,
        "group_name": "SC/TC/JP/KO"
    },
        {
        "id": 39,
        "name": "Javanese",
        "group_id": 4,
        "group_name": "Others"
    },
        {
        "id": 40,
        "name": "Kazakh",
        "group_id": 1,
        "group_name": "European/CE/Greek/Russian"
    },
        {
        "id": 41,
        "name": "Khmer",
        "group_id": 4,
        "group_name": "Others"
    },
	{
        "id": 42,
        "name": "Korean",
        "group_id": 2,
        "group_name": "SC/TC/JP/KO"
    },
        {
        "id": 43,
        "name": "Laothian",
        "group_id": 1,
        "group_name": "European/CE/Greek/Russian"
    },
        {
        "id": 44,
        "name": "Latvian",
        "group_id": 1,
        "group_name": "European/CE/Greek/Russian"
    },
        {
        "id": 45,
        "name": "Lithuanian",
        "group_id": 1,
        "group_name": "European/CE/Greek/Russian"
    },
        {
        "id": 46,
        "name": "Macedonian",
        "group_id": 1,
        "group_name": "European/CE/Greek/Russian"
    },
        {
        "id": 47,
        "name": "Malay",
        "group_id": 3,
        "group_name": "TH/VN"
    },
        {
        "id": 48,
        "name": "Maltese",
        "group_id": 1,
        "group_name": "European/CE/Greek/Russian"
    },
        {
        "id": 49,
        "name": "Maori",
        "group_id": 4,
        "group_name": "Others"
    },
        {
        "id": 50,
        "name": "Mongolian",
        "group_id": 4,
        "group_name": "Others"
    },
        {
        "id": 51,
        "name": "Norwegian",
        "group_id": 1,
        "group_name": "European/CE/Greek/Russian"
    },
        {
        "id": 52,
        "name": "Persian/Farsi",
        "group_id": 4,
        "group_name": "Others"
    },
        {
        "id": 53,
        "name": "Polish",
        "group_id": 1,
        "group_name": "European/CE/Greek/Russian"
    },
        {
        "id": 54,
        "name": "Portuguese",
        "group_id": 1,
        "group_name": "European/CE/Greek/Russian"
    },
        {
        "id": 55,
        "name": "Portuguese (Brazil)",
        "group_id": 1,
        "group_name": "European/CE/Greek/Russian"
    },
        {
        "id": 56,
        "name": "Romanian",
        "group_id": 1,
        "group_name": "European/CE/Greek/Russian"
    },
        {
        "id": 57,
        "name": "Russian",
        "group_id": 1,
        "group_name": "European/CE/Greek/Russian"
    },
        {
        "id": 58,
        "name": "Samoan",
        "group_id": 4,
        "group_name": "Others"
    },
        {
        "id": 59,
        "name": "Serbian",
        "group_id": 1,
        "group_name": "European/CE/Greek/Russian"
    },
        {
        "id": 60,
        "name": "Slovak",
        "group_id": 1,
        "group_name": "European/CE/Greek/Russian"
    },
        {
        "id": 61,
        "name": "Slovenian",
        "group_id": 1,
        "group_name": "European/CE/Greek/Russian"
    },
        {
        "id": 62,
        "name": "Somali",
        "group_id": 4,
        "group_name": "Others"
    },
        {
        "id": 63,
        "name": "Spanish",
        "group_id": 1,
        "group_name": "European/CE/Greek/Russian"
    },
        {
        "id": 64,
        "name": "Spanish (Chile)",
        "group_id": 1,
        "group_name": "European/CE/Greek/Russian"
    },
        {
        "id": 65,
        "name": "Spanish (Colombia)",
        "group_id": 1,
        "group_name": "European/CE/Greek/Russian"
    },
        {
        "id": 66,
        "name": "Spanish (International)",
        "group_id": 1,
        "group_name": "European/CE/Greek/Russian"
    },
        {
        "id": 67,
        "name": "Spanish (Latin America)",
        "group_id": 1,
        "group_name": "European/CE/Greek/Russian"
    },
        {
        "id": 68,
        "name": "Spanish (Mexico)",
        "group_id": 1,
        "group_name": "European/CE/Greek/Russian"
    },
        {
        "id": 69,
        "name": "Spanish (Panama)",
        "group_id": 1,
        "group_name": "European/CE/Greek/Russian"
    },
        {
        "id": 70,
        "name": "Spanish (Peru)",
        "group_id": 1,
        "group_name": "European/CE/Greek/Russian"
    },
        {
        "id": 71,
        "name": "Sundanese",
        "group_id": 4,
        "group_name": "Others"
    },
        {
        "id": 72,
        "name": "Swedish",
        "group_id": 1,
        "group_name": "European/CE/Greek/Russian"
    },
        {
        "id": 73,
        "name": "Tagalog",
        "group_id": 4,
        "group_name": "Others"
    },
        {
        "id": 74,
        "name": "Tamil",
        "group_id": 4,
        "group_name": "Others"
    },
	{
        "id": 75,
        "name": "Thai",
        "group_id": 3,
        "group_name": "TH/VN"
    },
        {
        "id": 76,
        "name": "Tibetan",
        "group_id": 4,
        "group_name": "Others"
    },
        {
        "id": 77,
        "name": "Tonga",
        "group_id": 4,
        "group_name": "Others"
    },
        {
        "id": 78,
        "name": "Turkish",
        "group_id": 1,
        "group_name": "European/CE/Greek/Russian"
    },
        {
        "id": 79,
        "name": "Ukrainian",
        "group_id": 1,
        "group_name": "European/CE/Greek/Russian"
    },
        {
        "id": 80,
        "name": "Uzbek",
        "group_id": 1,
        "group_name": "European/CE/Greek/Russian"
    },
	{
        "id": 81,
        "name": "Vietnamese",
        "group_id": 3,
        "group_name": "TH/VN"
    },
        {
        "id": 82,
        "name": "Welsh",
        "group_id": 1,
        "group_name": "European/CE/Greek/Russian"
    },
        {
        "id": 83,
        "name": "Xhosa",
        "group_id": 4,
        "group_name": "Others"
    },
        {
        "id": 84,
        "name": "Zulu",
        "group_id": 4,
        "group_name": "Others"
    },
	
	];
	
	return {
        get: function($id){
            for(var i = 0; i < group.length; i++){
                if(group[i].id == $id){
                    return group[i];
                }
            }
        },
    }
});


angularApp.factory("ProjectType", function($sce){
    var types = [{
        "id": 1,
        "name": "Translation (No TM)",
        "name_short": "No TM",
		"name_task" : $sce.trustAsHtml("No TM"),
		"tootip" : "Translation without Translation Memory",
        "name_text": "Translation (No TM)"
    }, {
        "id": 2,
        "name": "Translation (Use TM)",
        "name_short": "TM",
		"name_task" : $sce.trustAsHtml("TM"),
		"tootip" : "Translation with Translation Memory",
        "name_text": "Translation (Use TM)"
    }, {
        "id": 3,
        "name": "Proofreading",
        "name_short": "Proofreading",
		"name_task" : $sce.trustAsHtml("Proofreading"),
        "name_text": "Proofreading"
    }, {
        "id": 4,
        "name": $sce.trustAsHtml('DTP <i class=\"fa fa-apple\"><\/i>'),
        "name_short": "MAC",
		"name_task" : $sce.trustAsHtml('DTP <i class=\"fa fa-apple\"><\/i>'),	
		"tootip" : "Desktop Publishing",
        "name_text": "DTP MAC"
    }, {
        "id": 5,
        "name": $sce.trustAsHtml('DTP <i class=\"fa fa-windows\"><\/i>'),
        "name_short": "WIN",
		"name_task" : $sce.trustAsHtml('DTP <i class=\"fa fa-windows\"><\/i>'),
		"tootip" : "Desktop Publishing",
        "name_text": "DTP Windows"
    }, {
        "id": 6,
        "name": $sce.trustAsHtml("Engineering"),
        "name_short": "ENG",
		"name_task" : $sce.trustAsHtml("Engineering"),
		"tootip" : "Engineering",
        "name_text": "Engineering"
    }, {
        "id": 7,
        "name": "Simultaneous",
        "name_short": "SIM",
		"name_task" : $sce.trustAsHtml("Simultaneous"),
		"tootip" : "Simultaneous",
        "name_text": "Simultaneous"
    }, {
        "id": 8,
        "name": "Consecutive",
        "name_short": "CON",
		"name_task" : $sce.trustAsHtml("Consecutive"),
		"tootip" : "Consecutive",
        "name_text": "Consecutive"
    }, {
        "id": 9,
        "name": "Business Escort",
        "name_short": "BE",
		"name_task" : $sce.trustAsHtml("Business Escort"),
		"tootip" : "Business Escort",
        "name_text": "Business Escort"
    }, {
        "id": 10,
        "name": "Tourism Escort",
        "name_short": "TE",
		"name_task" : $sce.trustAsHtml("Tourism Escort"),
		"tootip" : "Tourism Escort",
        "name_text": "Tourism Escort"
    }];

    function get($id){
        for(var i = 0; i < types.length; i++){
            if(types[i].id == $id){
                return types[i];
            }
        }
    }

    function find($ids){
        var found = [];
        for(var i = 0; i < $ids.length; i++){
            var obj = get($ids[i]);
            if(obj){
                found.push(obj);
            }
        }
        return found;
    }

    var sub = {
        translations: find([1, 2, 3]),
        dtps: find([4, 5, 6]),
        interpretings: find([7, 8, 9, 10])
    };

    function is_in($typeName, $object){
        var arr = sub[$typeName];
        for(var i = 0; i < arr.length; i++){
            if(arr[i].id == $object.id){
                return true;
            }
        }
        return false;
    }

    return {
        get: get,
        all: function(){
            return types;
        },
        translations: sub.translations,
        dtps: sub.dtps,
        interpretings: sub.interpretings,
        find: find,
        is_in: is_in
    }
});


angularApp.factory("DateFormatter", function(){
    var month_names_short = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var month_names_full = [ "January", "February", "March", "April", "May", "June",
                             "July", "August", "September", "October", "November", "December" ];
    function short($date){
    	if(!$date)
			return "";
        if(typeof($date) == 'undefined'){
            return "";
        }
		var date;

		if($date.date){
			var tem = $date.date;
			if(typeof tem !== 'undefined'){
				var tempDate = tem.split(' ');
				date = new Date(tempDate[0]+'T'+tempDate[1]);
			} else {
				return "";
			}
		}
		else {
			var tem = $date;
			if(typeof tem !== 'undefined'){
				var tempDate = tem.split(' ');
				date = new Date(tempDate[0]+'T'+tempDate[1]);
			} else {
				return "";
			}
		}

        // 2014.Oct.10
        return date.getFullYear() + "." + month_names_short[date.getMonth()] + "." + date.getDate();
    }

    function format($date){
	console.log("check_date");
		console.log($date);
		
		if(!$date)
			return "";
        if(typeof($date) == 'undefined'){
            return "";
        }
		var date;
		
		if($date.date){
			var tem = $date.date;
			if(typeof tem !== 'undefined'){
				
				var tempDate = tem.split(' ');
				if(tempDate[0]=='-0001-11-30')
					return 'undefined';
				date = new Date(tempDate[0]+'T'+tempDate[1]);
			} else {
				return "";
			}
		}
		else {
			var tem = $date;
			if(typeof tem !== 'undefined'){
				var tempDate = tem.split(' ');
				date = new Date(tempDate[0]+'T'+tempDate[1]);
			} else {
				return "";
			}
		}
        //15 October 2014 - 11:04 AM
        var hour = date.getHours();
        var t = "AM";
        if(hour > 12){
            hour = hour -12;
            t = "PM";
        }
        return date.getDate() + " " + month_names_full[date.getMonth()] + " " + date.getFullYear()
                + " - " + hour + ":" + date.getSeconds() + " " + t;
    }
	function format1($date){
		if(!$date)
			return "";
        if(typeof($date) == 'undefined'){
            return "";
        }
		var date;
		
		if($date.date){
			var tem = $date.date;
			if(typeof tem !== 'undefined'){
				var tempDate = tem.split(' ');
				if(tempDate[0]=='-0001-11-30')
					return 'undefined';
				date = new Date(tempDate[0]+'T'+tempDate[1]);
			} else {
				return "";
			}
		}
		else {
			var tem = $date;
			if(typeof tem !== 'undefined'){
				var tempDate = tem.split(' ');
				date = new Date(tempDate[0]+'T'+tempDate[1]);
			} else {
				return "";
			}
		}
        //15 October 2014 - 11:04 AM

        return date.getDate() + " " + month_names_full[date.getMonth()] + " " + date.getFullYear();
    }

    return {
        short: short,
        format: format,
		format1:format1
    }
});

/**
 * File size filter
 * https://gist.github.com/yrezgui/5653591
 */
angularApp.filter( 'filesize', function () {
   var units = [
     'bytes',
     'KB',
     'MB',
     'GB',
     'TB',
     'PB'
   ];

   return function( bytes, precision ) {
     if ( isNaN( parseFloat( bytes )) || ! isFinite( bytes ) ) {
       return '?';
     }

     var unit = 0;

     while ( bytes >= 1024 ) {
       bytes /= 1024;
       unit ++;
     }

     return bytes.toFixed( + precision ) + ' ' + units[ unit ];
   };
});

angularApp.factory("API", function($http){

    function factory(url, singleKey, multipleKey){
        if(url[url.length - 1] != '/'){
            url += "/";
        }

        function get($id, $func){
            return $http.get(url + $id)
                .success(function($data){
                    var obj = $data[singleKey];
                    $func(obj);
                });
        }

        function list($params, $func){
            return $http.get(url + "?" + jQuery.param($params))
                .success(function($data){
                    var objs = $data[multipleKey];
                    var pages = $data.pages;
                    $func(objs, pages);
                });
        }

        function del($id, $func){
            return $http.delete(url + $id)
                .success(function($data){
                    var obj = $data[singleKey];
                    $func(obj);
                });
        }

        function update($id, $data, $func){
            return $http.put(url + $id, $data)
                .success(function($data){
                    $func($data[singleKey]);
                });
        }

        function create($data, $func){
            return $http.post(url, $data)
                .success(function($data){
                    $func($data[singleKey]);
                });
        }

        return {
            create: create,
            delete: del,
            get: get,
            list: list,
            update: update
        };
    }

    return {
        factory: factory
    };
});


angularApp.factory("ProjectApi", function(API){
    return API.factory('/api/admin/project/', 'project', 'projects');
});


angularApp.factory("StaffApi", function(API){
    return API.factory('/api/admin/staff/', 'staff', 'staffs');
});

angularApp.factory("ClientApi", function(API){
    return API.factory('/api/admin/client/', 'client', 'clients');
});

angularApp.factory("FieldApi", function(API){
    return API.factory('/api/admin/field/', 'field', 'fields');
});

angularApp.factory("LanguageApi", function(API){
    return API.factory('/api/admin/language/', 'language', 'languages');
});

angularApp.factory("TaskApi", function(API){
    return API.factory('/api/admin/task/', 'task', 'tasks');
});

angularApp.factory("ActivityApi", function(API){
    return API.factory('/api/admin/activity/', 'activity', 'activities');
});

angularApp.factory("FeedbackApi", function(API){
    return API.factory('/api/admin/projectfeedback/', 'feedback', 'feedbacks');
});

angularApp.factory("CorrectionApi", function(API){
    return API.factory('/api/admin/projectcorrection/', 'correction', 'corrections');
});
