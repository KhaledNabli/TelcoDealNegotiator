function startUi() {

	initRatingStars("div.starrr", optionRatingHasChanged);
	getCustomerList();



}


function initRatingStars(selector, onChangeHandler) {
	jQuery(selector).each(function (i,e) {
		// init element e with default rating;
		var rating = jQuery(e).attr("data-rating");
		if(rating != "") {
			jQuery(e).starrr({rating: rating});
		} else {
			jQuery(e).starrr();
		}
	});

	jQuery(selector).on('starrr:change', function(e, value){
  		jQuery(e.target).attr("data-rating", value);
  		if(onChangeHandler) {
  			onChangeHandler(e, value);
  		}
	});
}








function onFindCustomer(element) {
	var customerKey = $("#searchMsisdnInput").val();
	if(customerKey) {
		var customerIndex = findIndexByKey(dataStore.customerList, "id", customerKey);
		if(customerIndex >= 0) {
			if(dataStore.selectedCustomersIds.includes(dataStore.customerList[customerIndex].id)) {
				alert("Customer is already included in negotiation.");
			} else {
				dataStore.selectedCustomersIds.push(customerIndex);
				addCustomerToNegotiation(customerIndex);
			}
			
		} else {
			alert("Invalid Customer ID");
		}
	}
}

function onSelectCustomer(element) {
	updateCustomerStatistics();
	
}

function onRemoveCustomer(element) {
	var rowElement = $(element).closest("tr");
	var customerId = rowElement.find("input[name='selectedCustomerId']").val();
	var customerIndex = findIndexByKey(dataStore.customerList, "id", customerId);
	if(customerIndex >= 0) {
		//dataStore.customerList
	} 


	rowElement.remove();

}

function addCustomerToNegotiation(customerIndex) {
	console.log("Adding customer " + customerIndex + " to negotiation");

	var customerData = {};
	customerData.name = dataStore.customerList[customerIndex].name;
	customerData.id = dataStore.customerList[customerIndex].id;
	customerData.msisdn = dataStore.customerList[customerIndex].msisdn;

	jQuery("#customerTable > tbody").append(htmlTemplates["customerTableRow"](customerData));

}

function removeCustomerFromNegotiation(customerIndex) {

}



function updateCustomerStatistics() {

}


function renderBundlesTable() {
	jQuery("#bundlesTable > tbody > tr").remove();

	for(var bundle of dataStore.bundleList) {
		jQuery("#bundlesTable > tbody").append(htmlTemplates["bundlesTableRow"](bundle));
	}
}


function renderTarifTable() {
	jQuery("#tarifTable > tbody > tr").remove();

	for(var option of dataStore.bundleList) {
		jQuery("#tarifTable > tbody").append(htmlTemplates["optionFilterTableRow"](option));
	}
}


function renderHandheldsTable() {
	jQuery("#handheldsTable > tbody > tr").remove();

	for(var bundle of dataStore.bundleList) {
		jQuery("#handheldsTable > tbody").append(htmlTemplates["optionFilterTableRow"](option));
	}
}

function renderAccessoirTable() {
	jQuery("#accessoiresTable > tbody > tr").remove();

	for(var bundle of dataStore.bundleList) {
		jQuery("#accessoiresTable > tbody").append(htmlTemplates["optionFilterTableRow"](option));
	}
}



function optionRatingHasChanged(option, value) {
	var activeCustomer;
	var relatedCustomers;

}