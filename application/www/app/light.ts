export class Light {
  id : string;
  on : boolean;
  hue : number;
  //selected : boolean = false;

  constructor(lightObject : any){
    this.id = Object.keys(lightObject)[0];
    this.on = lightObject[this.id].state.on;
    this.hue =  lightObject[this.id].state.hue;


  }



}
