import { Component, AfterViewChecked,  Input, OnInit, 
        OnChanges, SimpleChange, DoCheck, KeyValueDiffers, 
        KeyValueChangeRecord, ChangeDetectorRef} from '@angular/core';

import {Light} from './light'
import {LightControlService } from './lightcontrol.service';

import {ColorTransformations} from './colortransformations'

//import {MdSlider} from '@angular/material';

@Component({
    selector: 'light-control',
    templateUrl: 'lightcontrol.component.html',
    styles: [` .colorBox {
        width: 128px;
        height: 24px;
        background:#fff;
        }   
    `],

})
export class LightControlComponent implements OnInit, OnChanges, DoCheck  {
    @Input() selectedLight : Light;
    //@ViewChild('sliderHue') sliderHue : MdSlider; 

    changing  = false;

    differ: any;

    RGB = {name: "rgb", red : 0, green : 0, blue : 0}
      
    boxColor : string;

    constructor(private lightService: LightControlService, private differs: KeyValueDiffers, private cdRef:ChangeDetectorRef){
        

    }

    ngOnInit() {
        this.differ = this.differs.find({}).create(null);
    }

    ngOnChanges(changes :  { [propName: string]: SimpleChange }){

        //this.sliderHue.value = this.selectedLight.hue;
        
        
        console.log(changes);

        //selectedLight changed - do not send event
        this.selectedLight.changegByEvent = true;
       //this.hueValue = this.selectedLight.hue;
    }

    ngAfterViewChecked()
    {
        this.cdRef.detectChanges();
    }

    ngDoCheck(){
    
        var changes = this.differ.diff(this.selectedLight.state);

		if(changes) {
			console.log('Selected Light State - changes detected');
            //this.lightService.setLight(this.selectedLight);

            
            var hueNormal = this.selectedLight.state.hue/65535;
            var satNormal = this.selectedLight.state.sat/254;
            var briNormal = this.selectedLight.state.bri/254;

            //let hsl = this.HSVtoHSL(hueNormal, satNormal, briNormal);
            //this.boxColor = "hsl("+Math.floor(hsl[0]*360)+", "+Math.floor(hsl[1]*100)+"%,"+ Math.floor(hsl[2]*100)+ "%)";

            let rgb = ColorTransformations.HSVtoRGB(hueNormal, satNormal, briNormal);

            this.boxColor = "rgb("+Math.floor(rgb[0])+", "+Math.floor(rgb[1])+","+ Math.floor(rgb[2])+ ")";


            this.changing = true;
            this.selectedLight.changeTime = Date.now();

            if(!this.selectedLight.changegByEvent){
                
                
                this.lightService.setLight(this.selectedLight);
                console.log("LightControlComponent::setLight(selectedLight)");
                 
            }else{

                //this.selectedLight.changegByEvent = false;

            }

            this.selectedLight.changegByEvent = false;

            //this.boxColor = "red";

			changes.forEachChangedItem((r : KeyValueChangeRecord) => {
                
                    //console.log(r)
                   
                //console.log('changed ', r.currentValue)
            });
			//changes.forEachAddedItem(r => console.log('added ' + r.currentValue));
			//changes.forEachRemovedItem(r => console.log('removed ' + r.currentValue));
		} else {
			//console.log('nothing changed');


            /*
            if(this.changing && !this.selectedLight.changegByEvent){
                
                
                this.lightService.setLight(this.selectedLight);
                console.log("LightControlComponent::setLight(selectedLight)");
                 
            }

            this.changing = false;
            this.selectedLight.changegByEvent = false;

            */
            
		}

        /*

        var changes = this.differ.diff(this.RGB);
            if(changes) {
                console.log('RGB changes detected');

                this.changing = true;

                this.boxColor = "rgb("+this.RGB.red+", "+this.RGB.green+","+ this.RGB.blue+ ")";
                
                //let hsv =  this.RGBtoHSV(this.RGB.red, this.RGB.green, this.RGB.blue);
                //console.log(hsv);  

                changes.forEachChangedItem((r : KeyValueChangeRecord) => {
                 
                    
                    //console.log(r)
                   
                });
                //changes.forEachAddedItem(r => console.log('added ' + r.currentValue));
                //changes.forEachRemovedItem(r => console.log('removed ' + r.currentValue));
            } else {
                if(this.changing ){

                    let hsv =  this.RGBtoHSV(this.RGB.red, this.RGB.green, this.RGB.blue);
                    //let hsv =  this.RGBtoHSVbroken(this.RGB.red, this.RGB.green, this.RGB.blue);

                    this.selectedLight.hue = Math.floor(65535 * hsv[0]);
                    this.selectedLight.sat = Math.floor(254 * hsv[1]);
                    this.selectedLight.bri = Math.floor(253 * hsv[2] +1);
                    //console.log(hsv);
                    this.lightService.setLight(this.selectedLight);

                     this.changing = false;

                     //this.lightService.setLight(this.selectedLight);
                }
                //console.log('nothing changed');
            }

        //console.log(hsv);

        */

    }

}


