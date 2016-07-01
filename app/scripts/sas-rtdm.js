

function sendRequestToRTDM(rtdmHost, rtdmEvent, rtdmRequestInputs) {
	var rtdmRequestUrl = 'http://' + rtdmHost + '/SASDecisionServices/rest/runtime/decisions/' + rtdmEvent;
	var contentType = 'application/vnd.sas.decision.request+json';
	var clientTimeZone = jstz != undefined ? jstz().timezone_name : 'America/New_York';

	var rtdmRequest = {version : 1.0, clientTimeZone : clientTimeZone, inputs:rtdmRequestInputs};

	return jQuery.ajax({
		method: 'POST',
		contentType: contentType,
		url: rtdmRequestUrl,
		data: JSON.stringify(rtdmRequest)
	});
}


function transformRtdmDatagrid(datagrid) {
	var result = {};
	result.columns = Array();
	result.values = Array();

	if(datagrid == undefined || datagrid.length != 2 || datagrid[0].metadata == undefined || datagrid[1].data == undefined) {
		// invalid schema!
		console.log('Warning: Provided RTDM Datagrid has an invalid schema.');
		return result;
	} 

	for(var columnIndex in datagrid[0].metadata) {
		var columnMetadata = datagrid[0].metadata[columnIndex];
		for(var columnProp in columnMetadata) {
			result.columns.push({index: columnIndex, name: columnProp, dataType: columnMetadata[columnProp]});
		}
	}

	for(var rowData of datagrid[1].data) {
		var rowObject = {};
		for(var column of result.columns) {
			rowObject[column.name] = rowData[column.index];
		}
		result.values.push(rowObject);
	}

	return result;
}


var rtdmEngine = {host: 'sasbap.demo.sas.com'};


function queryRTDMEventDefinition(rtdmEngine, eventIndex, onDoneHandler ) {
	var eventId = rtdmEngine.events[eventIndex].decisionId;
	var rtdmQueryUrl = 'http://' + rtdmEngine.host + '/RTDM/rest/decisionDefinitions/' + eventId;

	return jQuery.ajax({
		method: 'GET',
		url: rtdmQueryUrl,
		contentType: 'application/vnd.sas.decision.definition.summary',
	}).done(function (response) {
		rtdmEngine.events[eventIndex].inputs = response.inputs ? response.inputs : {};
		rtdmEngine.events[eventIndex].outputs = response.outputs ? response.outputs : {};
		onDoneHandler(rtdmEngine,eventIndex);
	});

}

function queryRTDMEvents(rtdmEngine, onDoneHandler) {
	var rtdmQueryUrl = 'http://' + rtdmEngine.host + '/RTDM/rest/decisionDefinitions';

	return jQuery.ajax({
		method: 'GET',
		url: rtdmQueryUrl,
		contentType: 'application/vnd.sas.decision.request+json',
		data: {limit: 1000}
	}).done(function (response) {
		rtdmEngine.events = response.items ? response.items.map(function (item) {return {decisionId: item.decisionId, decisionId: item.decisionId, version: item.version, timeoutEnabled: item.timeoutEnabled, timeout: item.timeout, lastModifiedBy: item.lastModifiedBy, created: item.created, modified: item.modified}}) : Array();
		rtdmEngine.eventCount = response.count ? response.count : 0;

		// sort events
		rtdmEngine.events.sort(function (a, b) {
			return a.decisionId.localeCompare(b.decisionId);
		});

		onDoneHandler(rtdmEngine);
	});
}