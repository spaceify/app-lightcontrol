import { Component, ViewChild, AfterViewInit, AfterViewChecked,  Input, OnInit, 
        OnChanges, SimpleChange, DoCheck, KeyValueDiffers, KeyValueChangeRecord, ChangeDetectorRef} from '@angular/core';
import {Light} from './light'
import { LightControlService } from './lightcontrol.service';

import {MdSlider} from '@angular/material';

//import { LightControlService } from './lightcontrol.service';


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
    @ViewChild('sliderHue') sliderHue : MdSlider; 

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

            let rgb = this.HSVtoRGB(hueNormal, satNormal, briNormal);

            this.boxColor = "rgb("+Math.floor(rgb[0])+", "+Math.floor(rgb[1])+","+ Math.floor(rgb[2])+ ")";


            this.changing = true;
            this.selectedLight.changeTime = Date.now();
            //this.boxColor = "red";

			changes.forEachChangedItem((r : KeyValueChangeRecord) => {
                
                    //console.log(r)
                   
                //console.log('changed ', r.currentValue)
            });
			//changes.forEachAddedItem(r => console.log('added ' + r.currentValue));
			//changes.forEachRemovedItem(r => console.log('removed ' + r.currentValue));
		} else {
			//console.log('nothing changed');
            if(this.changing){
                
                
                this.lightService.setLight(this.selectedLight);
                
                 
            }

            this.changing = false;
            
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



    RGBtoHSV(r : number, g : number, b : number) : number[]{

        //console.log("red value: "+r);

        var hue: number, sat: number, bri: number;

        var R : number = r/255;
        var G : number = g/255;
        var B : number = b/255;

        //let rgbToRange =[R, G, B]

        let cMax = Math.max(R, G, B);
        let cMin = Math.min(R, G, B);
        let delta = cMax - cMin;

        bri = cMax;

        if(delta === 0){
            hue = sat = 0;
        }
        else{

            if(R ===cMax)
                hue = 60*(((G-B)/delta) %6);
            if(G ===cMax)
                hue = 60*((B-R)/delta + 2);
            if(B ===cMax)
                hue = 60*((R-G)/delta +4);

            sat = 0;

            if(cMax != 0)
                sat = delta/cMax;

           
        }


        return [hue/360, sat, bri];
    }

    RGBtoHSVbroken(r : number, g : number, b : number) : number[]{

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

    HSVtoRGB (h : number, s : number, v : number) {
        var r : number, g:number, b:number;

        var i = Math.floor(h * 6);
        var f = h * 6 - i;
        var p = v * (1 - s);
        var q = v * (1 - f * s);
        var t = v * (1 - (1 - f) * s);

        switch (i % 6) {
            case 0: r = v, g = t, b = p; break;
            case 1: r = q, g = v, b = p; break;
            case 2: r = p, g = v, b = t; break;
            case 3: r = p, g = q, b = v; break;
            case 4: r = t, g = p, b = v; break;
            case 5: r = v, g = p, b = q; break;
        }

        return [ r * 255, g * 255, b * 255 ];
    }

    HSVtoHSL(h : number, s : number, v : number) {
    // both hsv and hsl values are in [0, 1]
        var l = (2 - s) * v / 2;

        if (l != 0) {
            if (l == 1) {
                s = 0
            } else if (l < 0.5) {
                s = s * v / (l * 2)
            } else {
                s = s * v / (2 - l * 2)
            }
        }

        return [h, s, l]
    }

}


