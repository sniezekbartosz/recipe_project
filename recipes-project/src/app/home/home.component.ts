import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('myCanvas') myCanvas: ElementRef;
  subs: Subscription;
  public context: CanvasRenderingContext2D;
  snek: SnekElement[] = [];
  lastOfSnek: SnekElement;
  xs: number[] = [];
  ys: number[] = [];
  dirX = 0;
  dirY = 1;
  apple: Apple;
  stop = false;
  direction: Direction = Direction.Right;
  snekOn = false;
  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {

    // this.context = (<HTMLCanvasElement>this.myCanvas.nativeElement).getContext('2d');
    // this.init();
    // this.sub();
    // for (let i = 0; i < 50; ++i) {
    //   this.xs.push(i*10);
    //   this.ys.push(i*10);
    // }


  }
  init() {
    this.snek.length = 0;
    this.dirX = 0;
    this.dirY = 1;
    this.direction = Direction.Right;
    this.snek.push({ x: 100, y: 100 });
    this.snek.push({ x: 110, y: 100 });
    this.snek.push({ x: 120, y: 100 });
    this.snek.push({ x: 130, y: 100 });
    this.snek.push({ x: 140, y: 100 });
    this.snek.push({ x: 150, y: 100 });
    this.snek.push({ x: 160, y: 100 });
    this.lastOfSnek = this.snek[0];
    this.apple = null;
    this.context.fillStyle = "rgba(255,255,255,1)";
    console.log("INIT COMPLETE: ");
    console.log(this.snek);

  }
  ngOnDestroy() {
   //this.unsub();
  }

  unsub() {
    this.subs.unsubscribe();
    this.stop = true;
  }

  sub() {
    const subs = Observable.interval(100);
    this.subs = subs.subscribe(
      (number: number) => {
        if (!this.stop) {
          this.lastOfSnek = this.snek.shift();
          let index = this.snek.length - 1;
          let x: number = this.snek[index].x;
          let y: number = this.snek[index].y;
          let copy = { x: x, y: y };
          if (this.direction === Direction.Right) {
            copy.x += this.dirY * 10;
          } else {
            copy.y += this.dirY * 10;
          }
          if (this.apple == null) {
            this.getApple();
            this.context.fillStyle = "rgb(240, 0, 0)";
            this.context.fillRect(this.apple.x, this.apple.y, 10, 10);
            console.log("aple");
          }
          this.checkCollision(copy);
          
          console.log(copy);
          // copy.x= 43;
          // copy.y = 34;
          this.snek.push(copy);
          console.log(this.snek);
          this.context.fillStyle = "rgb(48, 48, 48)";
          this.context.fillRect(this.lastOfSnek.x, this.lastOfSnek.y, 10, 10);
          this.context.fillStyle = "rgba(255,255,255,1)";
          for (let snek of this.snek) {
            this.context.fillRect(snek.x, snek.y, 10, 10);
          }
          if (this.stop) {
            this.snek.pop();
            this.context.fillStyle = "rgb(48, 48, 48)";
            this.context.fillRect(0, 0, 500, 500);
            this.context.fillStyle = "rgba(255,255,255,1)";
            this.stop = false;
          }
        }
      });
  }

  getApple() {
    let x, y;
    let copy = this.xs.slice();
    let copyy = this.ys.slice();
    for (let snek of this.snek) {
      copy.splice(snek.x, 1);
      copyy.splice(snek.y, 1);
    }
    this.apple = { x: copy[Math.floor(Math.random() * copy.length)], y: copyy[Math.floor(Math.random() * copyy.length)] }
  }

  checkCollision(element: SnekElement) {
    if(this.snek[this.snek.length-1].x === this.apple.x && this.snek[this.snek.length-1].y === this.apple.y) {
      console.log("bede go zjadl");
      this.snek.unshift(this.lastOfSnek);
      this.apple = null;
    }
    for (let snek of this.snek) {
      if (snek.x === element.x && snek.y === element.y) {
        this.stop = true;
        this.init();
        return;
      }
    }
    if (element.x > 490) {
      element.x = 0;
    } else if (element.x < 0) {
      element.x = 490;
    }
    if (element.y > 490) {
      element.y = 0;
    } else if (element.y < 0) {
      element.y = 490;
    }
  }

  catchKey(event) {
    console.log(event['key']);
    if (event['key'] == 'w' && this.direction != Direction.Down) {
      this.dirY = -1;
      this.direction = Direction.Up;
    }
    else if (event['key'] == 's' && this.direction != Direction.Up) {
      this.dirY = 1;
      this.direction = Direction.Down;
    }
    else if (event['key'] == 'a' && this.direction != Direction.Right) {
      this.dirY = -1;
      this.direction = Direction.Left;
    }
    else if (event['key'] == 'd' && this.direction != Direction.Left) {
      this.dirY = 1;
      this.direction = Direction.Right;
    }
  }
}

enum Direction {
  Up = 1,
  Down = 1,
  Left = 0,
  Right = 0,
}

export interface SnekElement {
  x: number,
  y: number
}

export interface Apple {
  x: number,
  y: number
}