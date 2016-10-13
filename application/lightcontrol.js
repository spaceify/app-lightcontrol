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

var lightsService = null;

// EXPOSED JSON-RPC METHODS -- -- -- -- -- -- -- -- -- -- //

var lights =  {0:  {state: {on: true, hue: 123456} }, 1: {state: {on: false, hue: 654} } };

self.getLightStates = function(callobj, callback)
	{
	//callback(null,"hajotkaa!!!!");		
	
	lightsService.callRpc("getLights", [], self, function(err,data)
		{
		callback(err, data);		
		});
		
	};

self.setLightState =  function(gatewayId, lightId, state)
	{
	lightsService.callRpc("setLightState", [gatewayId, lightId, state]);
	};

	// IMPLEMENT start AND fail METHODS IN YOUR APPLICATION!!! -- -- -- -- -- -- -- -- -- -- //
self.start = function()
	{
	// PROVIDED - CONNECTIONS FROM CLIENTS TO US
	var service = spaceify.getProvidedService("spaceify.org/services/lightcontrol");

	service.exposeRpcMethod("getLightStates", self, self.getLightStates);
	service.exposeRpcMethod("setLightState", self, self.setLightState);


	// REQUIRED - OUR CONNECTION TO THE LIGHTS SERVICE
	lightsService = spaceify.getRequiredService("spaceify.org/services/lights");
	};

self.fail = function()
	{
	};

}

var appLightcontrol = new AppLightcontrol();
spaceify.start(appLightcontrol, {webservers: {http: true, https: true}});
