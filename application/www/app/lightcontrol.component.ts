import { Component, ViewChild, AfterViewInit, AfterViewChecked,  Input, OnInit, 
        OnChanges, SimpleChange, DoCheck, KeyValueDiffers, KeyValueChangeRecord, ChangeDetectorRef} from '@angular/core';
import {Light} from './light'
import { LightControlService } from './lightcontrol.service';

import {MdSlider} from '@angular/material';

//import { LightControlService } from './lightcontrol.service';


@Component({
    selector: 'light-control',
    templateUrl: 'app/lightcontrol.component.html',

})
export class LightControlComponent implements OnInit, OnChanges, DoCheck  {
    @Input() selectedLight : Light;
    @ViewChild('sliderHue') sliderHue : MdSlider; 


    differ: any;

    /*
    //----------

    public active : boolean;

    public hueValue : number;
    //public lightColor : number;
    public brightness : number;
    public saturation : number;

    public singleModel:string = 'On';
    public radioModel:string = 'On';
    public checkModel:any = {left: false, middle: true, right: false};


//----------
    public hstep:number = 1;
    public mstep:number = 15;
    public ismeridian:boolean = true;
    public isEnabled:boolean = true;

    public mytime:Date = new Date();
    public options:any = {
        hstep: [1, 2, 3],
        mstep: [1, 5, 10, 15, 25, 30]
    };

    */

    constructor(private lightService: LightControlService, private differs: KeyValueDiffers, private cdRef:ChangeDetectorRef){
        

    }

    ngOnInit() {
        this.differ = this.differs.find({}).create(null);
    }

    ngOnChanges(changes :  { [propName: string]: SimpleChange }){

        //this.sliderHue.value = this.selectedLight.hue;
        
        
        //console.log(changes);
       //this.hueValue = this.selectedLight.hue;
    }

    ngAfterViewChecked()
    {
    //console.log( "! changement de la date du composant !" );
    //this.dateNow = new Date();
        this.cdRef.detectChanges();
    }

    ngDoCheck(){
        var changes = this.differ.diff(this.selectedLight);

		if(changes) {
			console.log('changes detected');
			changes.forEachChangedItem((r : KeyValueChangeRecord) => {
                this.lightService.setLight(this.selectedLight);
                console.log('changed ', r.currentValue)});
			//changes.forEachAddedItem(r => console.log('added ' + r.currentValue));
			//changes.forEachRemovedItem(r => console.log('removed ' + r.currentValue));
		} else {
			//console.log('nothing changed');
		}
    }

}

var runninglightNumber =0;
