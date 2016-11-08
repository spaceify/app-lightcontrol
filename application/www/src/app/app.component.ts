import { ChangeDetectionStrategy, Component, OnInit, HostListener } from '@angular/core';
import { LightControlComponent }  from './lightcontrol.component';
import { LightControlService } from './lightcontrol.service';

import {Light} from './light'

import {Gateway} from './gateway'

//import { TreeModule } from 'angular2-tree-component';


@Component({
    selector: 'app-root',
    //changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: 'app.component.html',
    styles: [`
        .center {
            padding: 20px;
            width: 300px;
            margin: 0 auto;
            //background-color: lightgray;
            //background: linear-gradient(to bottom, darkgray, lightgray);
        }
     `],
    //providers: [LightControlService]
})
export class AppComponent implements OnInit{

    //lights : Lig
    selectedLight : Light;

    lights : Light[] = null;

    lightdata : Gateway[] = null;

    public tabs:Array<any> = [
        {title: 'Light 1', content: '1'},
        {title: 'Light 2', content: '2', disabled: false},
        {title: 'Light 3', content: '3', removable: false}
    ];


    @HostListener('window:load', ['$event'])
	spaceifyReady(){
        console.log("spaceifyReady from app.component");
        this.lightService.spaceifyReady();;

    }
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

   nodes : any = [];

    //public activeTab : number;

    //public selectedLight : Light = null;

    constructor(private lightService: LightControlService){

      
        //this.lights.push( new LightControlComponent());

    }

    public buildTree(){

        let unique_id = 0;

        function uuid(){
            return unique_id++;
        };

        for(let gateway of this.lightService.getLightTree()){

            var children : any;

            for(let light of gateway.lights){
                var child = {id : uuid(), name: light.name};
                children.push(child);
            }

            var gw = {id : uuid(), name: gateway.name,  isExpanded: true, children : children};
            this.nodes.push(gw);

        }

       
        /*
        [
            {
                id: 1,
                name: 'root1',
                isExpanded: true,
                children: [
                {
                    id: 2,
                    name: 'child1'
                }, {
                    id: 3,
                    name: 'child2'
                }
                ]
            }
            ]
            */
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

       //this.lightdata = this.lightService.getLightTree();

       this.buildTree();
    
       console.log(this.nodes);
}


}
