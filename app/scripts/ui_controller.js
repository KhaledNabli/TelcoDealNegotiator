function startUi() {

	initRatingStars('div.starrr', optionRatingHasChanged);

	getCustomerList();



}


function initRatingStars(selector, onChangeHandler) {
	jQuery(selector).each(function (i,e) {
		// init element e with default rating;
		var rating = jQuery(e).attr('data-rating');
		if(rating != '') {
			jQuery(e).starrr({rating: rating});
		} else {
			jQuery(e).starrr();
		}
	});

	jQuery(selector).on('starrr:change', function(e, value){
  		jQuery(e.target).attr('data-rating', value);
  		if(onChangeHandler) {
  			onChangeHandler(e, value);
  		}
	});
}


function updateSpiderChart() {

	var selectedCustomerList = getCustomerListByIds(dataStore.selectedCustomersIds);

	var dataSets = selectedCustomerList.map(function (customerObj) {
		var bgColor = generateRandomeColor();
		return {
			label: customerObj.name,
			backgroundColor: 'rgba('+bgColor[0]+','+bgColor[1]+ ',' +bgColor[2]+ ',0.2)',
			borderColor: 'rgba('+bgColor[0]+','+bgColor[1]+ ',' +bgColor[2]+ ',1)',
			pointBackgroundColor: 'rgba('+bgColor[0]+','+bgColor[1]+ ',' +bgColor[2]+ ',1)',
			pointBorderColor: '#fff',
			pointHoverBackgroundColor: '#fff',
			pointHoverBorderColor: 'rgba('+bgColor[0]+','+bgColor[1]+ ',' +bgColor[2]+ ',1)',
			data: [customerObj.sms, customerObj.voice, customerObj.data, customerObj.national, customerObj.roaming, customerObj.churn]
		}
	});



	var data = {
		labels: ['SMS', 'VOICE', 'DATA', 'NATIONAL', 'INTERNATIONAL', 'CHURN'],
		datasets: dataSets
	};

	var ctx = $('canvas#myChart');

	var myRadarChart = new Chart(ctx, {
		type: 'radar',
		data: data
	});
}


function generateRandomeColor() {
	var red = Math.floor(Math.random() * 256);
	var green = Math.floor(Math.random() * 256);
	var blue = Math.floor(Math.random() * 256);


	return [red, green, blue];
}


function onFindCustomer(element) {
	var customerId = $('#searchMsisdnInput').val();

	if(customerId == '') {
		// empty
	} else if (dataStore.selectedCustomersIds.includes(customerId)) {
		// already in the list
	} else if (findIndexByKey(dataStore.customerList, 'id', customerId) < 0) {
		// invalid
	} else {
		addCustomerToNegotiation(customerId);
	}
	
	return false;
}

function updateCustomersSummary() {
	$('#customerSummaryLabel1').text('Benefit'); // TODO make dynamic
	$('#customerSummaryLabel2').text('Lifetime Value'); // TODO make dynamic

	var customerKpis1 = dataStore.customerList.map(function (customer) {
		// sum on budget
		if(dataStore.selectedCustomersIds.includes(customer.id)) {
			return customer.budget;
		} else {
			return 0;
		}
	})

	var customerKpi1Sum = customerKpis1.reduce(function(pv, cv) { return pv + cv; }, 0);

	var customerKpis2 = dataStore.customerList.map(function (customer) {
		// sum on budget
		if(dataStore.selectedCustomersIds.includes(customer.id)) {
			return customer.clv;
		} else {
			return 0;
		}
	})

	var customerKpi2Sum = customerKpis2.reduce(function(pv, cv) { return pv + cv; }, 0);

	$('#customerSummaryValue1').text('$ ' + customerKpi1Sum); // TODO make dynamic
	$('#customerSummaryValue2').text('$ ' + customerKpi2Sum); // TODO make dynamic


	updateSpiderChart();
}

function onSelectCustomer(element) {

	var rowElement = $(element).closest('tr');
	var customerId = rowElement.find('input[name=\'selectedCustomerId\']').val();
	updateCustomerStatistics(customerId);
	console.log('Customer selected: ' + customerId);
	dataStore.activeCustomerId = customerId;

	var activeCustomer = getCustomerById(customerId);
	var relatedCustomers = getCustomerListByIds(dataStore.selectedCustomersIds);
	getBundles(activeCustomer, relatedCustomers);
	getTarifs(activeCustomer, relatedCustomers);
	getHandhelds(activeCustomer, relatedCustomers);
	getAccessoirs(activeCustomer, relatedCustomers);
}


function onBundlesChanged() {

}

function onRemoveCustomer(element) {
	var rowElement = $(element).closest('tr');
	var customerId = rowElement.find('input[name=\'selectedCustomerId\']').val();
	removeCustomerFromNegotiation(customerId);
	rowElement.remove();

}

function addCustomerToNegotiation(customerId) {
	console.log('Adding customer ' + customerId + ' to negotiation');
	var customerIndex = findIndexByKey(dataStore.customerList, 'id', customerId);
	
	if(customerIndex >= 0) {
		dataStore.selectedCustomersIds.push(customerId);

		var customerObj = dataStore.customerList[customerIndex];
		var customerData = {};
		customerData.name = customerObj.name;
		customerData.id = customerObj.id;
		customerData.msisdn = customerObj.msisdn;
		jQuery('#customerTable > tbody').append(htmlTemplates['customerTableRow'](customerData));
	}

	updateCustomersSummary();

}

function removeCustomerFromNegotiation(customerId) {
	console.log('Adding customer ' + customerId + ' to negotiation');


	var customerIndex = findIndexByKey(dataStore.customerList, 'id', customerId);
	
	if(customerIndex >= 0) {
		var listIndex = dataStore.selectedCustomersIds.indexOf(customerId);
		dataStore.selectedCustomersIds.splice(listIndex,1);
	}

	updateCustomersSummary();
}



function updateCustomerStatistics(customerId) {

}


function renderBundlesTable() {
	jQuery('#bundlesTable > tbody > tr').remove();

	for(var bundle of dataStore.bundleList) {
		jQuery('#bundlesTable > tbody').append(htmlTemplates['bundlesTableRow'](bundle));
	}
}


function renderTarifTable() {
	jQuery('#tarifTable > tbody > tr').remove();

	for(var option of dataStore.tarifList) {
		jQuery('#tarifTable > tbody').append(htmlTemplates['optionFilterTableRow'](option));
	}

	initRatingStars('#tarifTable > tbody > tr > td > div.starrr', optionRatingHasChanged);
}


function renderHandheldsTable() {
	jQuery('#handheldsTable > tbody > tr').remove();

	for(var option of dataStore.handheldList) {
		jQuery('#handheldsTable > tbody').append(htmlTemplates['optionFilterTableRow'](option));
	}

	initRatingStars('#handheldsTable > tbody > tr > td > div.starrr', optionRatingHasChanged);
}

function renderAccessoirTable() {
	jQuery('#accessoiresTable > tbody > tr').remove();

	for(var option of dataStore.accessoirList) {
		jQuery('#accessoiresTable > tbody').append(htmlTemplates['optionFilterTableRow'](option));
	}

	initRatingStars('#accessoiresTable > tbody > tr > td > div.starrr', optionRatingHasChanged);
}



function optionRatingHasChanged(option, value) {
	var activeCustomer;
	var relatedCustomers;

}