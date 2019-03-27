import { Component, OnInit, OnDestroy,HostBinding, HostListener} from '@angular/core';
import { HttpService } from '../http.service'
import { generate } from 'rxjs';
import {ActivatedRoute, Params} from '@angular/router'

@Component({
  selector: 'app-gamepage',
  templateUrl: './gamepage.component.html',
  styleUrls: ['./gamepage.component.css']
})
export class GamepageComponent implements OnInit {
  // 13
  // 31
  world = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ]

  dict = {
      0: "board",
      1: "land",
      2: "box",
      3:'checked',
    }

  worldnew=[];

  pokemon = {
    char:'',
    x: 0,
    y: 11,
    img: '',
    lastDir: "right",
    frame: 1,
    jumping: false,
    actionCode : [],
    style:{
      left:null,
      top:null,
    },
    walkCycle: 0,
    jumpCycle: 0,
  }

  boxinfo={
    name:'pikapika',
    img:'',
    position:[],
  }

  display={
    name:[],
    imgAndTitle:[],
    count:0,
    score:0
  }
    
  constructor(private _gamepage: HttpService,private _route: ActivatedRoute) { }

  ngOnInit() {
    this.generateBox();
    this.drawworld();
    this._route.params.subscribe((params: Params) => { this.pokemon.char = params['pokemon']});
    if (this.pokemon.char == "pikachu"){
      this.pokemon.walkCycle = 6;
      this.pokemon.jumpCycle = 3;
    }
    else if (this.pokemon.char == "squirtle"){
      this.pokemon.walkCycle = 6;
      this.pokemon.jumpCycle = 4;
    }
    else if (this.pokemon.char == "teddiursa"){
      this.pokemon.walkCycle = 8;
      this.pokemon.jumpCycle = 3;
    }
    else if (this.pokemon.char == "meowth") {
      this.pokemon.walkCycle = 8;
      this.pokemon.jumpCycle = 4;
    }
    this.pokemon.img = './assets/images/'+this.pokemon.char+'/walk-mirror/1.png';

    this.drawPokemon();
    setInterval(this.gravity, 75);    
  }

  generateBox(){
    this.boxinfo.position=[];
    this.boxinfo.img='./assets/images/win.gif';
    let letter=this.boxinfo.name.split('');

    for(let k=0;k<letter.length;k++){
      let point={x:null,y:null,value:''}; 
      point.x=Math.floor(Math.random()*30+1);
      point.y=Math.floor(Math.random()*8+1);
      if(this.world[point.y][point.x]!=0 || this.world[point.y+1][point.x]!=0 || this.world[point.y-1][point.x]!=0){
        k-=1;
      }else{
        point.value=letter[k];
        this.world[point.y][point.x]=2;
        this.boxinfo.position.push(point);
        this.display.name.push(' ')
      };
    };
    console.log('this.boxinfo.position',this.boxinfo.position)
  }

  gravity = () => {
    let ark = 0;
    if (this.pokemon.y < 11 && this.pokemon.jumping == false && this.world[this.pokemon.y+1][this.pokemon.x]==0){
      if (this.pokemon.actionCode.length > 1){
        // console.log(this.pokemon.actionCode);
        if(this.pokemon.actionCode.includes(37)){
          --ark;
        }
        if (this.pokemon.actionCode.includes(39)){
          ++ark;
        }
      }
      if (this.pokemon.x + ark < this.world[0].length && this.pokemon.x + ark > 0 && this.world[this.pokemon.y+1][this.pokemon.x+ark]==0){
        this.pokemon.x += ark;
      }
      this.pokemon.y += 1;
      this.drawPokemon();
    }
    if (this.pokemon.y == 11 || this.world[this.pokemon.y+1][this.pokemon.x] !=0){
      this.pokemon.actionCode=[];
    }
  }


    drawworld() {
      for (let y = 0; y < this.world.length; y++) {
        let row=[];
          for (let x = 0; x < this.world[y].length; x++) {
            row.push(this.dict[this.world[y][x]])
          }
        this.worldnew.push(row)
      }
    };

    drawPokemon() {
      this.pokemon.style.left=this.pokemon.x*30+'px';
      this.pokemon.style.top=this.pokemon.y*30+'px';
    };

    cleanOldPosition(){
      this.world = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ]
    };


    @HostListener('document:keydown',['$event'])
    onKeydown(e:KeyboardEvent) {
      // console.log('trigger a key event');
 
      this.pokemon.actionCode.push(e.keyCode);

      if (e.keyCode == 37) {
        if (this.world[this.pokemon.y][this.pokemon.x - 1] != null) {
          this.pokemon.lastDir = "left";
          if (this.pokemon.frame < this.pokemon.walkCycle) {
            this.pokemon.frame += 1;
          }
          else {
            this.pokemon.frame = 1;
          }
          this.pokemon.x--
          this.pokemon.img = './assets/images/'+this.pokemon.char+'/walk-cycle/' + this.pokemon.frame + '.png';
        }
        this.drawPokemon();
      };

      if (e.keyCode == 39) {
        if (this.world[this.pokemon.y][this.pokemon.x + 1] != null) {
            this.pokemon.lastDir = "right";
            if (this.pokemon.frame < this.pokemon.walkCycle) {
              this.pokemon.frame += 1;
            }
            else {
              this.pokemon.frame = 1;
            }
            this.pokemon.x++
            this.pokemon.img = './assets/images/'+this.pokemon.char+'/walk-mirror/' + this.pokemon.frame + '.png';
        }
        this.drawPokemon();
      };
      
      if (e.keyCode == 38) {
        this.pokemon.frame = 1;
        let count = 0;
        if (this.pokemon.lastDir == "left") {
          var spriteDir = './assets/images/'+this.pokemon.char+'/jump-cycle/';
        }
        else {
          var spriteDir = './assets/images/'+this.pokemon.char+'/jump-mirror/';
        }
        let jump = () => {
          
          if (this.pokemon.y>0 && this.pokemon.x<31 && this.pokemon.x>=0 && this.world[this.pokemon.y-1][this.pokemon.x]==0){
            
              this.pokemon.jumping = true;

              if (this.pokemon.frame > this.pokemon.jumpCycle){
                this.pokemon.frame = this.pokemon.jumpCycle;
              }
              else if (this.pokemon.frame < this.pokemon.jumpCycle){
                this.pokemon.frame += 1;
              }

              this.pokemon.img = spriteDir + this.pokemon.frame + '.png';

              this.pokemon.y-= 1;
              this.drawPokemon();

              if (count < 3){
                ++count;
                setTimeout(jump, 75);
              }
              else{
                this.pokemon.jumping = false;
              }
          }
          else{
             //show info in the unchecked box
            if(this.pokemon.y>0 && this.world[this.pokemon.y-1][this.pokemon.x]==2){
              this.display.score++;
              for(let g=0;g<this.boxinfo.position.length;g++){    
                if(this.boxinfo.position[g]['x']==this.pokemon.x && this.boxinfo.position[g]['y']==(this.pokemon.y-1)){
                  this.display.name.splice(g, 1, this.boxinfo.position[g].value);
                  console.log('get a box^^^',this.display)  
                  this.world[this.pokemon.y-1][this.pokemon.x]=3;
                  this.display.count++;
                     //reset the world
                     if(this.display.count==this.boxinfo.position.length){
                      this.display.name=[];
                      this.display.count=0; 
                      setTimeout(()=>{
                        this.display.imgAndTitle=[{title:this.boxinfo.name,url:this.boxinfo.img}];
                        this.cleanOldPosition();                  
                        this.generateBox();
                        this.worldnew=[];
                        this.drawworld(); 
                      },0)                                         
                    };
                  setTimeout(()=>{
                    this.worldnew=[];
                    this.drawworld();
                  },0)
                  break;
                };
              };      
            };

            this.pokemon.jumping = false;
          };
        };
        jump();
      };
      console.log('actioncode:', this.pokemon.actionCode)
    };


}
