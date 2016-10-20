#!/usr/bin/env node
/**
 * app-lightcontrol, 26.09.2016 Spaceify Oy
 *
 * @class AppLightcontrol
 */

var spaceify = require("/api/spaceifyapplication.js");

function AppLightcontrol()
{
var self = this;

var lightStateListeners = new Object();
var lightsService = null;	//service towards the driver
var eventChannel = null;
var service = null;		//service towards we clients


self.onClientDisconnected = function(connectionId)
	{
	console.log("AppLightControl::onClientDisconnected()");		
	delete lightStateListeners[connectionId];	
	};

// EXPOSED JSON-RPC METHODS -- -- -- -- -- -- -- -- -- -- //

var lights =  {0:  {state: {on: true, hue: 123456} }, 1: {state: {on: false, hue: 654} } };





self.addLightStateListener = function(callbackName, callObj, callback)
	{
	console.log("AppLightControl::addLightStateListener()");	
	
	var listener = {connectionId: callObj.connectionId, callbackName: callbackName};

	lightStateListeners[listener.connectionId] = listener;
	
	
	callback(null,"Ok");
	};


self.getLightStates = function(callobj, callback)
	{
	//callback(null,"hajotkaa!!!!");		
	
	lightsService.callRpc("getLights", [], self, function(err,data)
		{
		callback(err, data);		
		});
		
	};

self.setLightState =  function(gatewayId, lightId, state, callObj, callback)
	{
	lightsService.callRpc("setLightState", [gatewayId, lightId, state], self, function(err, data)
		{
		callback(err, data);		
		});
	};
	
self.onLightStateChanged = function(event, callObj, callback)
	{
	console.log("Received event from eventChannel: "+ JSON.stringify(event) );
	for (var i in lightStateListeners)
		{
		service.callRpc(lightStateListeners[i].callbackName, [event], null, null, lightStateListeners[i].connectionId);	
		}
	};

	// IMPLEMENT start AND fail METHODS IN YOUR APPLICATION!!! -- -- -- -- -- -- -- -- -- -- //
self.start = function()
	{
	// PROVIDED - CONNECTIONS FROM CLIENTS TO US
	service = spaceify.getProvidedService("spaceify.org/services/lightcontrol");
	

	service.exposeRpcMethod("getLightStates", self, self.getLightStates);
	service.exposeRpcMethod("setLightState", self, self.setLightState);
	service.exposeRpcMethod("addLightStateListener", self, self.addLightStateListener);

	service.setDisconnectionListener(self.onClientDisconnected);	

	// REQUIRED - OUR CONNECTION TO THE LIGHTS SERVICE
	lightsService = spaceify.getRequiredService("spaceify.org/services/lights");
	
	eventChannel = spaceify.getRequiredService("spaceify.org/services/eventchannel");
	
	eventChannel.exposeRpcMethod("onLightStateChanged", self, self.onLightStateChanged);
	
	
	eventChannel.callRpc("addEventListener", [{name: "spaceify.org/events/lights/statechanged"}, "onLightStateChanged"], self, function(err,data)
		{
		console.log("EventChannel::addEventListener() replied, error: "+err+" data: "+data);
		});
	
	};

self.fail = function()
	{
	};

}

var appLightcontrol = new AppLightcontrol();
spaceify.start(appLightcontrol, {webservers: {http: true, https: true}});
