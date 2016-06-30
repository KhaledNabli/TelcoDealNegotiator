var dataStore = {
	activeCustomerId : undefined,
	selectedCustomersIds: [],
	customerList: [],
	bundleList: [],
	tarifList: [],
	handheldList: [],
	accessoirList: []
};


/**** API CALLS to be redefined ****/

/**
* return the list of customers to deal with
**/
function getCustomerList() {
	// TODO: add logic to call backend system

	var customerList = [
		{id: '10001', name: 'Khaled Nabli', msisdn: '+41795095890', sms:0.7, voice: 0.5, data:0.99, national: 0.4, roaming: 0.65, clv: 5000, churn: 0.1, budget: 120},
		{id: '10002', name: 'Adrian Carr', msisdn: '+49795095890', sms:0.7, voice: 0.5, data:0.99, national: 0.4, roaming: 0.65, clv: 5000, churn: 0.1, budget: 120},
		{id: '10003', name: 'Nicolas Payares', msisdn: '+41795095890', sms:0.7, voice: 0.5, data:0.99, national: 0.4, roaming: 0.65, clv: 5000, churn: 0.1, budget: 120},
		{id: '10004', name: 'Kadir Dindar', msisdn: '+41795095890', sms:0.7, voice: 0.5, data:0.99, national: 0.4, roaming: 0.65, clv: 5000, churn: 0.1, budget: 120},
		{id: '10005', name: 'Mathias Bouten', msisdn: '+41795095890', sms:0.7, voice: 0.5, data:0.99, national: 0.4, roaming: 0.65, clv: 5000, churn: 0.1, budget: 120}
	];

	getCustomerListDone(customerList);
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
	var bundles = [
		{name: 'Bundle 1', desc: 'Desc 1', tarif: 'Tarif 1', handheld: 'iPhone 1', accessoir: '123123', takeProp: '77', benefit: '$45'},
		{name: 'Bundle 2', desc: 'Desc 1', tarif: 'Tarif 1', handheld: 'iPhone 1', accessoir: '123123', takeProp: '77', benefit: '$45'},
		{name: 'Bundle 3', desc: 'Desc 1', tarif: 'Tarif 1', handheld: 'iPhone 1', accessoir: '123123', takeProp: '77', benefit: '$45'},

	]

	getBundlesDone(bundles);
}

function getBundlesDone(result) {
	// TODO: add logic to call backend system
	dataStore.bundleList = result;

	// call a callback to re-render
	renderBundlesTable();
}

/**
* return the available tarifs for the active customer 
* input activeCustomer: the customer who is supposed to get the bundle;
* input relatedCustomer: this is used if we are negotiating for a group of customers
**/
function getTarifs(activeCustomer, relatedCustomers) {
	// TODO: add logic to call backend system
	var tarifs = [{id: 'tarif1', name: 'Tarif 1', price: 7.58, rate: 2},{id: 'tarif2', name: 'Tarif 2', price: 7.58, rate: 2},{id: 'tarif3', name: 'Tarif 3', price: 7.58, rate: 2}];

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

	var handheld = [{id: 'hand1', name: 'Hand 1', price: 7.58, rate: 1},{id: 'hand2', name: 'Hand 2', price: 7.58, rate: 2},{id: 'hand3', name: 'Hand 3', price: 7.58, rate: 3}];;
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

	var accessoirs = [{id: 'access1', name: 'Access 1', price: 7.58, rate: 1},{id: 'access2', name: 'Access 2', price: 7.58, rate: 2},{id: 'access3', name: 'Access 3', price: 7.58, rate: 3}];;
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

