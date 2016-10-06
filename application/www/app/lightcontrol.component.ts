import { Component, Input, OnInit, OnChanges, SimpleChange } from '@angular/core';
import {Light} from './light'

//import { LightControlService } from './lightcontrol.service';


@Component({
    selector: 'light-control',
    templateUrl: 'app/lightcontrol.component.html',

})
export class LightControlComponent implements OnInit, OnChanges  {
    @Input() selectedLight : Light;
    public active : boolean;

    public hueValue : number;
    public lightColor : number;
    public brightness : number;
    public saturation : number;

    public singleModel:string = 'On';
    public radioModel:string = 'On';
    public checkModel:any = {left: false, middle: true, right: false};

    lightNumber :number;

    public hstep:number = 1;
    public mstep:number = 15;
    public ismeridian:boolean = true;
    public isEnabled:boolean = true;

    public mytime:Date = new Date();
    public options:any = {
        hstep: [1, 2, 3],
        mstep: [1, 5, 10, 15, 25, 30]
    };

    constructor(){

        this.lightNumber = runninglightNumber++;
    }

    ngOnInit() {

    }

    ngOnChanges(changes :  { [propName: string]: SimpleChange }){
       console.log(changes);
       //this.hueValue = this.selectedLight.hue;
    }

}

var runninglightNumber =0;
