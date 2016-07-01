var dataStore = {
	activeCustomerId : undefined,
	selectedCustomersIds: [],
	customerList: [],
	bundleList: [],
	tarifList: [],
	handheldList: [],
	accessoirList: []
};

var lookUpData = {
	bundles: [
		{id: "1234", name: 'Bundle 1', desc: 'Desc 1', tarif: 'Tarif 1', handheld: 'iPhone 1', accessoir: '123123', takeProp: '77', benefit: '$45'},
		{id: "2345", name: 'Bundle 2', desc: 'Desc 1', tarif: 'Tarif 1', handheld: 'iPhone 1', accessoir: '123123', takeProp: '77', benefit: '$45'},
		{id: "3456", name: 'Bundle 3', desc: 'Desc 1', tarif: 'Tarif 1', handheld: 'iPhone 1', accessoir: '123123', takeProp: '77', benefit: '$45'},

	],
	customers: [
		{id: '10001', name: 'Khaled Nabli', msisdn: '+41795095890', sms:0.4, voice: 0.15, data:0.99, national: 0.94, roaming: 0.65, clv: 5000, churn: 0.11, budget: 120},
		{id: '10002', name: 'Adrian Carr', msisdn: '+49795095890', sms:0.7, voice: 0.25, data:0.99, national: 0.74, roaming: 0.05, clv: 5000, churn: 0.9, budget: 120},
		{id: '10003', name: 'Nicolas Payares', msisdn: '+41795095890', sms:0.9, voice: 0.45, data:0.99, national: 0.64, roaming: 0.15, clv: 5000, churn: 0.7, budget: 120},
		{id: '10004', name: 'Kadir Dindar', msisdn: '+41795095890', sms:0.8, voice: 0.75, data:0.99, national: 0.24, roaming: 0.45, clv: 5000, churn: 0.4, budget: 120},
		{id: '10005', name: 'Mathias Bouten', msisdn: '+41795095890', sms:0.1, voice: 0.65, data:0.99, national: 0.44, roaming: 0.35, clv: 5000, churn: 0.6, budget: 120}
	],
	tarifs: [
		{id: 't1', name: 'Tarif 1', price: 7.58, rate: 2},
		{id: 't2', name: 'Tarif 2', price: 7.58, rate: 2},
		{id: 't3', name: 'Tarif 3', price: 7.58, rate: 2}
	],
	handhelds: [
		{id: 'h1', name: 'Handy 1', price: 7.58, rate: 2},
		{id: 'h2', name: 'Handy 2', price: 7.58, rate: 2},
		{id: 'h3', name: 'Handy 3', price: 7.58, rate: 2}
	],
	accessoirs: [
		{id: 'a1', name: 'Accessoir 1', price: 7.58, rate: 2},
		{id: 'a2', name: 'Accessoir 2', price: 7.58, rate: 2},
		{id: 'a3', name: 'Accessoir 3', price: 7.58, rate: 2}
	],
}

var settings = {
	rtdmHost : "10.38.15.76",
	getOffersEvent : "Feedback_Event",
};


/**** API CALLS to be redefined ****/

/**
* return the list of customers to deal with
**/
function getCustomerList() {
	// TODO: add logic to call backend system


	getCustomerListDone(lookUpData.customers);
}


function getCustomerListDone(result) {
	// TODO: add logic to process results from backend system
	dataStore.customerList = result;

	// call a callback to re-render.
}

/**
* return the next best offers for the active customer 
* input activeCustomer: the customer who is supposed to get the bundle;
* input relatedCustomer: this is used if we are negotiating for a group of customers
**/
function getBundles(activeCustomer, relatedCustomers) {
	// TODO: add logic to call backend system
	var bundles = lookUpData.bundles;



	getBundlesDone(bundles);
	getBundlesViaRTDM(activeCustomer.id);
}

function getBundlesDone(result) {
	// TODO: add logic to call backend system
	dataStore.bundleList = result;

	// call a callback to re-render
	renderBundlesTable();
}

/*** 
* RTDM implementation example
**/
function getBundlesViaRTDM(subscriberID) {
	var rtdmRequestInputs = {
		subscriberID: subscriberID, 
		bundleID: "", 
		smartPhoneID: "", 
		accesoriesID: ""
	};

	sendRequestToRTDM(settings.rtdmHost, settings.getOffersEvent, rtdmRequestInputs).done(getBundlesViaRTDMDone);
}

function getBundlesViaRTDMDone(result) {
	// TODO: add logic to call backend system
	var bundleIds = result.outputs.bundleIDs;
	var tarifIds = result.outputs.tariffIDs;

	dataStore.bundles = getBundleListByIds(bundleIds);
	//dataStore.tarifs = getTarifListByIds(tarifIds);

	// call a callback to re-render
	renderBundlesTable();
	//renderTarifTable();
}


/**
* return the available tarifs for the active customer 
* input activeCustomer: the customer who is supposed to get the bundle;
* input relatedCustomer: this is used if we are negotiating for a group of customers
**/
function getTarifs(activeCustomer, relatedCustomers) {
	// TODO: add logic to call backend system
	var tarifs = lookUpData.tarifs;

	getTarifsDone(tarifs);
}

function getTarifsDone(result) {
	// TODO: add logic to call backend system
	dataStore.tarifList = result;

	// call a callback to re-render
	renderTarifTable();
}


/**
* return the available handhelds for the active customer 
* input activeCustomer: the customer who is supposed to get the bundle;
* input relatedCustomer: this is used if we are negotiating for a group of customers
**/
function getHandhelds(activeCustomer, relatedCustomers) {
	// TODO: add logic to call backend system

	var handheld = lookUpData.handhelds;
	getHandheldsDone(handheld);
}

function getHandheldsDone(result) {
	// TODO: add logic to process results from backend system

	dataStore.handheldList = result;
	renderHandheldsTable();
}


/**
* return the available accessoirs for the active customer 
* input activeCustomer: the customer who is supposed to get the bundle;
* input relatedCustomer: this is used if we are negotiating for a group of customers
**/
function getAccessoirs(activeCustomer, relatedCustomers) {
	// TODO: add logic to call backend system

	var accessoirs = lookUpData.handhelds;
	getAccessoirsDone(accessoirs);
}

function getAccessoirsDone(result) {
	// TODO: add logic to process results from backend system

	dataStore.accessoirList = result;
	renderAccessoirTable();
}

/**
* update the prference of the active customer for a specific option
* input activeCustomer: the customer who is supposed to get the bundle;
* input relatedCustomer: this is used if we are negotiating for a group of customers
* input optionType: what are we preferring (HANDHELD, TARIF or ACCESSOIR)
* input preferenceValue: value of our prefrence (1: disliking - 3: neutral - 5: liking)
**/
function updatePreferences(activeCustomer, relatedCustomers, optionType, preferenceValue) {
	// TODO: add logic to call backend system

	var result = {};
	updatePreferences(result);
}

function updatePreferencesDone(result) {
	// TODO: add logic to process results from backend system

}


/**
* respond to an offer of the active customer for a specific offer
* input activeCustomer: the customer who is supposed to get the bundle;
* input relatedCustomer: this is used if we are negotiating for a group of customers
* input optionType: what are we preferring (HANDHELD, TARIF or ACCESSOIR)
* input preferenceValue: value of our prefrence (1: disliking - 3: neutral - 5: liking)
**/
function respondToOffer(activeCustomer, relatedCustomers, offer, responseType) {
	// TODO: add logic to call backend system

}

function respondToOfferDone(result) {
	// TODO: add logic to process results from backend system

}






function findIndexByKey(list, key, value) {
	return list.findIndex(function (element) { return element[key] === value; });
}


function getCustomerById(customerId) {
	var index = findIndexByKey(lookUpData.customers, 'id', customerId);

	if (index >= 0) {
		return dataStore.customerList[index];
	}

	return undefined;
}


function getCustomerListByIds(customerIds) {
	var result = [];
	for(var customerId of customerIds) {
		var customerObj = getCustomerById(customerId);
		if(customerObj != undefined) {
			result.push(customerObj);
		}
	}

	return result;
}


function getBundleById(bundleId) {
	var index = findIndexByKey(lookUpData.bundles, 'id', bundleId);

	if (index >= 0) {
		return lookUpData.bundles[index];
	}

	return undefined;
}


function getBundleListByIds(bundleIds) {
	var result = [];
	for(var bundleId of bundleIds) {
		var bundleObj = getBundleById(bundleId);
		if(bundleObj != undefined) {
			result.push(bundleObj);
		}
	}

	return result;
}
