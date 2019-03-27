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
      2: "box"
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

  actionCode=[];
 
    

  constructor(private _gamepage: HttpService,private _route: ActivatedRoute) { }

  ngOnInit() {
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
    setInterval(this.gravity, 100);   
    
  }

  // resetWorld(){
  //   this.world = [
  //     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //     [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  //     ]
  //   this.worldnew=[];
  // }

  gravity = () => {
    let ark = 0;
    if (this.pokemon.y < 11 && this.pokemon.jumping == false){
      if (this.pokemon.actionCode.length > 1){
        console.log(this.pokemon.actionCode);
        if(this.pokemon.actionCode.includes(37)){
          --ark;
        }
        if (this.pokemon.actionCode.includes(39)){
          ++ark;
        }
      }
      if (this.pokemon.x + ark < this.world[0].length && this.pokemon.x + ark > 0){
        this.pokemon.x += ark;
      }
      this.pokemon.y += 1;
      this.drawPokemon();
    }
    if (this.pokemon.y == 11){
      for(let i = 0; i < this.pokemon.actionCode.length; i++){
        this.pokemon.actionCode.pop();
      }
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

  

    // cleanOldPosition(){
    //   let j=this.pokemon.x;
    //   let i=this.pokemon.y;
    //   this.world[i][j]=0;
    //   this.worldnew[i][j]=this.dict[this.world[i][j]];
    // };


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
      }

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
      }
      
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
          
          if (this.pokemon.y!=0 && this.pokemon.x<30 && this.pokemon.x>=0 ){

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
                console.log( this.pokemon.frame)
                setTimeout(jump, 75);
              }
              else{
                this.pokemon.jumping = false;
              }
           }
           else{
            this.pokemon.jumping = false;
           }
        }
        jump();
        console.log(this.pokemon)
      }
      
    }

}
