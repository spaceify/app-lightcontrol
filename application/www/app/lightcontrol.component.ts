import { Component, ViewChild, AfterViewInit, AfterViewChecked,  Input, OnInit, 
        OnChanges, SimpleChange, DoCheck, KeyValueDiffers, KeyValueChangeRecord, ChangeDetectorRef} from '@angular/core';
import {Light} from './light'
import { LightControlService } from './lightcontrol.service';

import {MdSlider} from '@angular/material';

//import { LightControlService } from './lightcontrol.service';


@Component({
    selector: 'light-control',
    templateUrl: 'app/lightcontrol.component.html',
    styles: [],

})
export class LightControlComponent implements OnInit, OnChanges, DoCheck  {
    @Input() selectedLight : Light;
    @ViewChild('sliderHue') sliderHue : MdSlider; 


    differ: any;

    RGB = {name: "rgb", red : 0, green : 0, blue : 0}
      
    constructor(private lightService: LightControlService, private differs: KeyValueDiffers, private cdRef:ChangeDetectorRef){
        

    }

    ngOnInit() {
        this.differ = this.differs.find({}).create(null);
    }

    ngOnChanges(changes :  { [propName: string]: SimpleChange }){

        //this.sliderHue.value = this.selectedLight.hue;
        
        
        console.log(changes);
       //this.hueValue = this.selectedLight.hue;
    }

    ngAfterViewChecked()
    {
        this.cdRef.detectChanges();
    }

    ngDoCheck(){
        var changes = this.differ.diff(this.selectedLight);

		if(changes) {
			console.log('Selected Light changes detected');
			changes.forEachChangedItem((r : KeyValueChangeRecord) => {
                
                    this.lightService.setLight(this.selectedLight);

                    console.log(r)
                    //console.log('changed ', r.currentValue)
                
                //console.log('changed ', r.currentValue)
            });
			//changes.forEachAddedItem(r => console.log('added ' + r.currentValue));
			//changes.forEachRemovedItem(r => console.log('removed ' + r.currentValue));
		} else {
			//console.log('nothing changed');
		}


        changes = this.differ.diff(this.RGB);
        if(changes) {
			console.log('RGB changes detected');
			changes.forEachChangedItem((r : KeyValueChangeRecord) => {
                
                console.log(this.RGB.red);

                let hsv =  this.RGBtoHSV(this.RGB.red, this.RGB.green, this.RGB.blue);
                this.selectedLight.hue = Math.floor(65535 * hsv[0]);
                this.selectedLight.sat = Math.floor(254 * hsv[1]);
                this.selectedLight.bri = Math.floor(253 * hsv[2] +1);
                //this.lightService.setLight(this.selectedLight);

                //console.log(r)
                //console.log('changed ', r.currentValue)
                
               
                

                //console.log('changed ', r.currentValue)
            });
			//changes.forEachAddedItem(r => console.log('added ' + r.currentValue));
			//changes.forEachRemovedItem(r => console.log('removed ' + r.currentValue));
		} else {
			//console.log('nothing changed');
		}


        

        

        //console.log(hsv);

    }

    RGBtoHSV(r : number, g : number, b : number) : number[]{

        //console.log("red value: "+r);

        var R : number = r/255;
        var G : number = g/255;
        var B : number = b/255;

        //let rgbToRange =[R, G, B]

        let cMax = Math.max(R, G, B);
        let cMin = Math.min(R, G, B);
        let delta = cMax - cMin;

        var hue : number;

        if(R ===cMax)
            hue = 60*(((G-B)/delta) %6);
        if(G ===cMax)
            hue = 60*((B-R)/delta + 2);
        if(B ===cMax)
            hue = 60*((R-G)/delta +4);

        var sat : number = 0;

        if(cMax != 0)
            sat = delta/cMax;

        var bri = cMax;


        return [hue/360, sat, bri];
    }

}


