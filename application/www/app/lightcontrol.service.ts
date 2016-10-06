import { Injectable } from '@angular/core';
import {Light} from './light'

declare class SpaceifyApplication{
	start(a: any, b : string) : void;
	getRequiredService(str : string) : any;
}

@Injectable()
export class LightControlService {

	private spaceify : SpaceifyApplication;
	private privateService : any;

	private lights : Light[] = [];;

	constructor(){

		this.spaceify = new SpaceifyApplication();

		//driverPhilipsHue = new PhilipsHueDriver();
		this.spaceify.start(this, "spaceify/lightcontrol");

	}


	start(){
		var self = this;
		this.privateService = this.spaceify.getRequiredService("spaceify.org/services/lightcontrol");

		this.privateService.callRpc("getLightStates",[], self, function(err : string, data : any)
					{
					console.log("getReachableLights Rpc call returned "+err+data);

					for(var lightObject in data){
						self.lights.push(new Light(data));
					}

					console.log(self.lights)

					});
	}

	fail(){}

	getLights(){
		return this.lights;
	}

}
