import { Injectable } from '@angular/core';
import {Light} from './light'

declare class SpaceifyApplication{
	start(a: any, b : string) : void;
	getRequiredService(str : string) : any;
}

@Injectable()
export class LightControlService {

	spaceify : SpaceifyApplication;
	privateService : any;

	lights : Light[] = [];;


	start(){
		this.privateService = this.spaceify.getRequiredService("spaceify.org/services/lightcontrol");

		this.privateService.callRpc("getLightStates",[], self, function(err : string, data : Object)
					{
					console.log("getReachableLights Rpc call returned "+err+data);

					for(var lightObject in data){
						this.lights.add(new Light(lightObject));
					}

					});
	}



	fail(){}

	constructor(){

		this.spaceify = new SpaceifyApplication();

		//driverPhilipsHue = new PhilipsHueDriver();
		this.spaceify.start(this, "spaceify/lightcontrol");

	}

}
