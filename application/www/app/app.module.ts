import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { LightControlComponent }  from './lightcontrol.component';

import { Ng2BootstrapModule } from 'ng2-bootstrap/ng2-bootstrap';


import { ButtonsModule } from 'ng2-bootstrap/ng2-bootstrap';

import { TabsModule } from 'ng2-bootstrap/ng2-bootstrap';
import { TimepickerModule } from 'ng2-bootstrap/ng2-bootstrap';

//import {Ng2SliderComponent} from "ng2-slider-component/ng2-slider.component";

@NgModule({
  imports: [ BrowserModule, Ng2BootstrapModule, ButtonsModule, TabsModule, TimepickerModule ],
  declarations: [ AppComponent, LightControlComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
