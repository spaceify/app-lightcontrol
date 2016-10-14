import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { LightControlComponent }  from './lightcontrol.component';
import {LightControlService} from './lightcontrol.service'


import { Ng2BootstrapModule } from 'ng2-bootstrap/ng2-bootstrap';


import { ButtonsModule } from 'ng2-bootstrap/ng2-bootstrap';

import { TabsModule } from 'ng2-bootstrap/ng2-bootstrap';
import { TimepickerModule } from 'ng2-bootstrap/ng2-bootstrap';

import { HttpModule }      from '@angular/http';

//import { TreeModule } from 'angular2-tree-component';

import { MaterialModule} from  '@angular/material';
import {APP_BASE_HREF} from '@angular/common';
//import {Ng2SliderComponent} from "ng2-slider-component/ng2-slider.component";

@NgModule({
  imports: [ 
    BrowserModule, 
    HttpModule, 
    Ng2BootstrapModule, 
    ButtonsModule, 
    TabsModule, 
    TimepickerModule, 
    //TreeModule, 
    MaterialModule.forRoot(),
     ],
  declarations: [ AppComponent, LightControlComponent ],
  providers: [LightControlService],
 // ,{ provide: APP_BASE_HREF, useValue: "/app" }],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
