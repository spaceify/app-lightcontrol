import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LightControlComponent }  from './lightcontrol.component';



@Component({
    selector: 'my-app',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: 'app/app.component.html',
})
export class AppComponent { 
    
    public tabs:Array<any> = [
        {title: 'Light 1', content: '1'},
        {title: 'Light 2', content: '2', disabled: false},
        {title: 'Light 3', content: '3', removable: false}
    ];

    public activeTab : number;

    public lights : LightControlComponent[] = [];
    //public selectedLight : Light = null;

    constructor(){

        //this.lights.push( new LightControlComponent());

    }

    public setActiveTab(index:number):void {
        this.tabs[index].active = true;
    };


}

