export class Light {
  id : string;
  on : boolean;
  hue : number;

  constructor(lightObject : any){
    this.id = lightObject[0];

    /*
    var firstProp;
    for(var key in lightObject) {
        if(lightObject.hasOwnProperty(key)) {
            firstProp = jsonObj[key];
            break;
        }
    }
    */
  }



}
