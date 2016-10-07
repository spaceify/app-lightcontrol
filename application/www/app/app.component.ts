import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { LightControlComponent }  from './lightcontrol.component';
import { LightControlService } from './lightcontrol.service';

import {Light} from './light'

import { TreeModule } from 'angular2-tree-component';


@Component({
    selector: 'my-app',
    //changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: 'app/app.component.html',
    //providers: [LightControlService]
})
export class AppComponent implements OnInit{

    //lights : Lig
    selectedLight : Light;

    lights : Light[] = null;

    public tabs:Array<any> = [
        {title: 'Light 1', content: '1'},
        {title: 'Light 2', content: '2', disabled: false},
        {title: 'Light 3', content: '3', removable: false}
    ];

    /*
    
    nodes = [
    {
      id: 1,
      name: 'root1',
      children: [
        { id: 2, name: 'child1' },
        { id: 3, name: 'child2' }
      ]
    },
    {
      id: 4,
      name: 'root2',
      children: [
        { id: 5, name: 'child2.1' },
        {
          id: 6,
          name: 'child2.2',
          children: [
            { id: 7, name: 'subsub' }
          ]
        }
      ]
    }
  ];

    */

    //public activeTab : number;

    //public selectedLight : Light = null;

    constructor(private lightService: LightControlService){

      
        //this.lights.push( new LightControlComponent());

    }

    public selectLight(light : Light){
      this.selectedLight = light;
    }

    public setActiveTab(index:number):void {
        this.tabs[index].active = true;
    };

    public ngOnInit(){
        this.lights = this.lightService.getLights();
        //console.log(this.lights);

       // this.selectedLight = this.lights[1];
    }


}
