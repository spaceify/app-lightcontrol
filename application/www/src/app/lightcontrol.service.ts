import { Injectable} from '@angular/core';
import {Light} from './light'
import {Gateway} from './gateway'
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

	private lightData : Gateway[] = [];

	spaceifyIsReady : boolean = false;

	spaceifyReady(){
		this.spaceify = new SpaceifyApplication();

			//driverPhilipsHue = new PhilipsHueDriver();
		this.spaceify.start(this, "spaceify/lightcontrol");

		console.log("Spaceify ready");
		this.spaceifyIsReady = true;
	}


	//loading$: Observable<String>;
    //private _observer: Observer<String>;

	//private lights : Observable<Array<Light>>;

	constructor(private http:Http){
		var self = this;

		//this.loading$ = new Observable<String>(
         //   observer => this._observer = observer);

		//this.lights = new Observable(observer => {});

		if (typeof SpaceifyApplication === 'function'){

			console.log("Spaceify found");
			/*
			this.spaceify = new SpaceifyApplication();

			//driverPhilipsHue = new PhilipsHueDriver();
			this.spaceify.start(this, "spaceify/lightcontrol");
			*/
		}
		else{
			console.log("Load mockdata");

			var data : any;
        	this.http.get('assets/mock-data2.json')
                .subscribe(res => 
				{
					data = res.json();
					
					this.parseData(data);
			});	
    

		}

	}

	private parseData(data : any){

		this.lights.length = 0;

		for(var id in data){

			//self.lights.push(new Gateway(id, data[id]));

			this.lightData.push(this.toGateway(id, data[id]));

			//console.log(data);
		}
		console.log(this.lightData);
	}

	private toLight(id : string, gatewayid : string, light:any): Light{

		console.log(light);

		let newLight = <Light>({
			id: id,
			gatewayid:gatewayid,
			name : "Light "+id,
			on: light.state.on,
			hue: light.state.hue,
			sat: light.state.sat,
			bri: light.state.bri,
		});

		this.lights.push(newLight);
		//console.log('Parsed person:', person);
		return newLight;
		}

	private toGateway(gwid : string, gw:any): Gateway{

		var lights : Light[] = [];

		//console.log(gw.lights);

		if(gw.lights){

			for(var lightid in gw.lights){

				//self.lights.push(new Gateway(id, data[id]));

				//console.log(gw.lights[id]);
				//console.log(gw.lights.id);

				lights.push(this.toLight(lightid, gwid, gw.lights[lightid]));

				
			}
		}
		

		let newGateway = <Gateway>({
			id: gwid,
			name : "Gateway "+gwid,
			paired: gw.paired,
			ip: gw.ip,
			lights: lights,	
	
		});
		//console.log('Parsed person:', person);
		return newGateway;
		}



	start(){
		var self = this;
		this.privateService = this.spaceify.getRequiredService("spaceify.org/services/lightcontrol");

		this.privateService.callRpc("getLightStates",[], self, function(err : string, data : any)
					{
					console.log("getReachableLights Rpc call returned "+err+data);

					self.parseData(data);

					});
	}

	fail(){}

	isSpaceify() : boolean{
		if (typeof SpaceifyApplication === 'function')
			return true;
		return false;
	}

	getLights(){

		return this.lights;
	}

	getLightTree(){
		return this.lightData;

	}

	setLight(light : Light){
		let state = {on: light.on, bri: light.bri, sat: light.sat, hue: light.hue}
		if(this.privateService)
			this.privateService.callRpc("setLightState",[light.gatewayid, light.id, state],  self, function(err : string, data : any)
					{
					console.log("setLightState Rpc call returned "+JSON.stringify(err)+JSON.stringify(data));
					});

					/*
		console.log("On: "+ state.on +" "+ typeof(state.on) 
		+ " Hue: "+state.hue+" "+typeof(state.hue)
		+ " Sat: "+state.sat+" "+typeof(state.sat)
		+ " Bri: "+state.bri+" "+typeof(state.bri)
		);

		*/

		console.log(lightEventCounter++);
		
	}

}

var lightEventCounter = 0;