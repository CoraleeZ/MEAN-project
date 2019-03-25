import { Component, OnInit, OnDestroy} from '@angular/core';
import { HttpService } from '../http.service'
import { generate } from 'rxjs';
declare const $: any;

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
      2: "pokemon",
      3: "onigiri"
    }

  worldnew=[];

  pokemon = {
    x: 0,
    y: 11
  }
    

  constructor(private _gamepage: HttpService) { }

  ngOnInit() {
    this.drawPokemon();
    this.drawworld();
    
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
     this.world[this.pokemon.y][this.pokemon.x]=2;
    };


    onKeydown(e) {
      console.log('onkey down:',e);
      // if (e.keyCode == 37) {
      //     if (world[ninjaman.y][ninjaman.x - 1] != 1) {
      //         ninjaman.x--
      //     }
      // }
      // if (e.keyCode == 39) {
      //     if (world[ninjaman.y][ninjaman.x + 1] != 1) {
      //         ninjaman.x++
      //     }
      // }
      // if (e.keyCode == 38) {
      //     if (world[ninjaman.y - 1][ninjaman.x] != 1) {
      //         ninjaman.y--
      //     }
      // }
      // if (e.keyCode == 40) {
      //     if (world[ninjaman.y + 1][ninjaman.x] != 1) {
      //         ninjaman.y++
      //     }
      // }
    }

}
