import { Injectable } from '@angular/core';
import {Light} from './light'
import {Http} from '@angular/http';

import {Observable} from 'rxjs/Observable';



declare class SpaceifyApplication{
	start(a: any, b : string) : void;
	getRequiredService(str : string) : any;
}

@Injectable()
export class LightControlService {

	private spaceify : SpaceifyApplication;
	private privateService : any;

	private lights : Light[] = [];;

	//private lights : Observable<Array<Light>>;

	constructor(private http:Http){
		var self = this;

		//this.lights = new Observable(observer => {});

		if (typeof SpaceifyApplication === 'function'){
			this.spaceify = new SpaceifyApplication();

			//driverPhilipsHue = new PhilipsHueDriver();
			this.spaceify.start(this, "spaceify/lightcontrol");
		}
		else{

			var data : any;
        	this.http.get('app/mock-data.json')
                .subscribe(res => 
				{
					data = res.json();
					//console.log(data);
					for(var id in data){
						self.lights.push(new Light(id, data[id]));
						//console.log(data);
					}
					console.log(self.lights);
			});	
    

		}

	}


	start(){
		var self = this;
		this.privateService = this.spaceify.getRequiredService("spaceify.org/services/lightcontrol");

		this.privateService.callRpc("getLightStates",[], self, function(err : string, data : any)
					{
					console.log("getReachableLights Rpc call returned "+err+data);

					for(var id in data){
						//console.log(data);
						self.lights.push(new Light(id, data[id]));
					}

					console.log(self.lights)

					});
	}

	fail(){}

	getLights(){
		return this.lights;
	}

	setLight(light : Light){

	}

}
