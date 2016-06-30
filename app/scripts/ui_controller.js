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

	var data = {
		labels: ['SMS', 'DATA', 'NATIONAL', 'CLV', 'NPS', 'INTERNATIONAL', 'ROAMING'],
		datasets: [
		{
			label: 'Khaled',
			backgroundColor: 'rgba(179,181,198,0.2)',
			borderColor: 'rgba(179,181,198,1)',
			pointBackgroundColor: 'rgba(179,181,198,1)',
			pointBorderColor: '#fff',
			pointHoverBackgroundColor: '#fff',
			pointHoverBorderColor: 'rgba(179,181,198,1)',
			data: [65, 59, 90, 81, 56, 55, 40]
		},
		{
			label: 'Adrian',
			backgroundColor: 'rgba(255,99,132,0.2)',
			borderColor: 'rgba(255,99,132,1)',
			pointBackgroundColor: 'rgba(255,99,132,1)',
			pointBorderColor: '#fff',
			pointHoverBackgroundColor: '#fff',
			pointHoverBorderColor: 'rgba(255,99,132,1)',
			data: [28, 48, 40, 19, 96, 27, 100]
		}
		]
	};

	var ctx = $('canvas#myChart');

	var myRadarChart = new Chart(ctx, {
		type: 'radar',
		data: data
	});
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

	getBundles();
	getTarifs();
	getHandhelds();
	getAccessoirs();
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