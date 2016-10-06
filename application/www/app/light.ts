export class Light {
  id : string;
  on : boolean;
  hue : number;
  //selected : boolean = false;

  constructor(_id : string, lightObject : any){
    //console.log(lightObject);

    //this.id = Object.keys(lightObject)[0];
    this.id = _id;

    this.on = lightObject.state.on;
    this.hue =  lightObject.state.hue;


  }



}
