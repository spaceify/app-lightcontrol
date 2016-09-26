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
//var viewURL = function(url, lightsServiceId, contentType)
//	{
//	lightsService.callRpc("loadContent", [url, lightsServiceId, contentType]);
//	}

	// IMPLEMENT start AND fail METHODS IN YOUR APPLICATION!!! -- -- -- -- -- -- -- -- -- -- //
self.start = function()
	{
	// PROVIDED - CONNECTIONS FROM CLIENTS TO US
	var service = spaceify.getProvidedService("spaceify.org/services/lightcontrol");

	//service.exposeRpcMethod("viewURL", self, viewURL);

	// REQUIRED - OUR CONNECTION TO THE LIGHTS SERVICE
	lightsService = spaceify.getRequiredService("spaceify.org/services/lights");
	}

self.fail = function()
	{
	}

}

var appLightcontrol = new AppLightcontrol();
spaceify.start(appLightcontrol, {webservers: {http: true, https: true}});
