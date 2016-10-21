export class LightState {
  on : boolean;
  hue : number;
  bri: number;
  sat: number;
  transitiontime: number;
}

export class Light {
  id : string;
  gatewayid : string
  name : string;

  state : LightState;

  /*
  on : boolean;
  hue : number;
  bri: number;
  sat: number;
  */


  //changing : boolean = false;
  changeTime : number;
  changegByEvent : boolean = true;
  //selected : boolean = false;

  /*
  constructor(_id : string, lightObject : any){
    //console.log(lightObject);

    //this.id = Object.keys(lightObject)[0];
    this.id = _id;

    this.on = lightObject.state.on;
    this.hue =  lightObject.state.hue;


  }
  */



}
