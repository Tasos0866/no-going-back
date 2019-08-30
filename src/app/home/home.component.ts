import { Component, OnInit, HostListener } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  // Window
  initialWidth: number;
  currentWidth: number;
  windowWidthRatio: number;

  // Character
  positionX: number;
  positionY: number;
  charWidth: number;
  charHeight: number;
  charSpeed: number;

  // Timer
  minutes: number;
  seconds: number;
  miliseconds: number;
  displayMinutes: string;
  displaySeconds: string;
  displayMiliseconds: string;
  subscription: Subscription;

  // ** One car for each lane ** \\
  // Car at first lane
  carPositionXat1920: number;
  carWidthAt1920: number;
  carHeightAt1920: number;
  carWidth: number;
  carHeight: number;
  carPositionX: number;
  carPositionY: number;

  // Car at second lane
  car2PositionXat1920: number;
  car2WidthAt1920: number;
  car2HeightAt1920: number;
  car2Width: number;
  car2Height: number;
  car2PositionX: number;
  car2PositionY: number;

  // Car at third lane
  car3PositionXat1920: number;
  car3WidthAt1920: number;
  car3HeightAt1920: number;
  car3Width: number;
  car3Height: number;
  car3PositionX: number;
  car3PositionY: number;

  constructor() {
    // Window
    this.initialWidth = 1920;
    this.currentWidth = window.innerWidth;
    this.windowWidthRatio = this.currentWidth / this.initialWidth;

    // Character
    this.charWidth = 49;
    this.charHeight = 80;
    this.charSpeed = 20;
    this.positionX = 10;
    this.positionY = (window.innerHeight - this.charHeight) / 2;

    // Timer
    this.minutes = 0;
    this.seconds = 0;
    this.miliseconds = 0;
    this.displayMinutes = '00';
    this.displaySeconds = '00';
    this.displayMiliseconds = '00';

    // One car for each lane
    // Car at first lane
    this.carPositionXat1920 = 600;
    this.carWidthAt1920 = 95;
    this.carHeightAt1920 = 191;
    this.carWidth = this.carWidthAt1920 * this.windowWidthRatio;
    this.carHeight = this.carHeightAt1920 * this.windowWidthRatio;
    this.carPositionX = this.carPositionXat1920 * this.windowWidthRatio - (this.carWidth / 2);
    this.carPositionY = 400;

    // Car at second lane
    this.car2PositionXat1920 = 800;
    this.car2WidthAt1920 = 95;
    this.car2HeightAt1920 = 191;
    this.car2Width = this.car2WidthAt1920 * this.windowWidthRatio;
    this.car2Height = this.car2HeightAt1920 * this.windowWidthRatio;
    this.car2PositionX = this.car2PositionXat1920 * this.windowWidthRatio - (this.car2Width / 2);
    this.car2PositionY = 400;

    // Car at third lane
    this.car3PositionXat1920 = 1000;
    this.car3WidthAt1920 = 95;
    this.car3HeightAt1920 = 191;
    this.car3Width = this.car3WidthAt1920 * this.windowWidthRatio;
    this.car3Height = this.car3HeightAt1920 * this.windowWidthRatio;
    this.car3PositionX = this.car3PositionXat1920 * this.windowWidthRatio - (this.car3Width / 2);
    this.car3PositionY = 400;
  }

  ngOnInit() {
    // If the window is smaller than ~1350px display the small chracter
    if (this.windowWidthRatio < 0.703) {
      this.charWidth = 20;
      this.charHeight = 32;
      this.setClass('character-big', 'character-small');
    }

    // Create an Observable that will publish a value on an interval
    const secondsCounter = interval(10);
    // Subscribe to begin publishing values
    this.subscription = secondsCounter.subscribe(n => {
        this.miliseconds = (n);
        this.displayMiliseconds = this.addZero(this.miliseconds % 100);
        if (this.miliseconds % 100 === 0) {
          this.seconds = (this.seconds + 1);
          this.displaySeconds = this.addZero(this.seconds  % 60);
        }
        if (this.seconds % 60 === 0 && this.seconds !== 0 && (this.miliseconds + 100) % 6000 === 0) {
          this.minutes = this.minutes + 1;
          this.displayMinutes = this.addZero(this.minutes);
        }
      });
    this.subscription.unsubscribe();
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'ArrowUp') {
      if (this.positionY < (window.innerHeight - this.charHeight) - 20) {
        this.positionY = this.positionY + 20;
        this.setClass('character-big', 'character-big-move');
        this.setClass('character-small', 'character-small-move');
      }
    }

    if (event.key === 'ArrowDown') {
      if (this.positionY > 20) {
        this.positionY = this.positionY - 20;
        this.setClass('character-big', 'character-big-move');
        this.setClass('character-small', 'character-small-move');
      }
    }

    // if (event.key === 'ArrowLeft') {
    //   if (this.positionX - this.charWidth > 0) {
    //     this.positionX = this.positionX - 20;
    //     this.setClass('character-big', 'character-big-move');
    //     this.setClass('character-small', 'character-small-move');
    //   }
    // }

    if (event.key === 'ArrowRight') {
      if (this.positionX < (window.innerWidth - this.charWidth) - 20) {
        this.positionX = this.positionX + 20;
        this.setClass('character-big', 'character-big-move');
        this.setClass('character-small', 'character-small-move');
      }
    }
  }

  @HostListener('document:keyup', ['$event'])
  handleKeyboardEvent2(event: KeyboardEvent) {
    if (event.key === 'ArrowUp') {
      this.setClass('character-big-move', 'character-big');
      this.setClass('character-small-move', 'character-small');
    }

    if (event.key === 'ArrowDown') {
      this.setClass('character-big-move', 'character-big');
      this.setClass('character-small-move', 'character-small');
    }

    // if (event.key === 'ArrowLeft') {
    //   this.setClass('character-big-move', 'character-big');
    //   this.setClass('character-small', 'character-small');
    // }

    if (event.key === 'ArrowRight') {
      this.setClass('character-big-move', 'character-big');
      this.setClass('character-small-move', 'character-small');
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    // Get the screen width ratio
    this.currentWidth = window.innerWidth;
    this.windowWidthRatio = this.currentWidth / this.initialWidth;

    // Move character to initial position if the window is resized [anticheat]
    this.positionX = 10;
    this.positionY = (window.innerHeight - this.charHeight) / 2;

    // If the window is smaller than ~1350px display the small chracter
    if (this.windowWidthRatio < 0.703) {
      this.charWidth = 20;
      this.charHeight = 32;
      this.setClass('character-big', 'character-small');
    } else {
      this.charWidth = 49;
      this.charHeight = 80;
      this.setClass('character-small', 'character-big');
    }

    // ** Keep the cars inside the road  ** \\
    // The car in the first lane
    this.carWidth = this.carWidthAt1920 * this.windowWidthRatio;
    this.carHeight = this.carHeightAt1920 * this.windowWidthRatio;
    this.carPositionX = (this.carPositionXat1920 * this.windowWidthRatio) - (this.carWidth / 2);

    // The car in the second lane
    this.car2Width = this.car2WidthAt1920 * this.windowWidthRatio;
    this.car2Height = this.car2HeightAt1920 * this.windowWidthRatio;
    this.car2PositionX = (this.car2PositionXat1920 * this.windowWidthRatio) - (this.car2Width / 2);

    // The car in the third lane
    this.car3Width = this.car3WidthAt1920 * this.windowWidthRatio;
    this.car3Height = this.car3HeightAt1920 * this.windowWidthRatio;
    this.car3PositionX = (this.car3PositionXat1920 * this.windowWidthRatio) - (this.car3Width / 2);
  }

  setClass(currentClass: string, futureClass: string) {
    const element = document.getElementsByClassName(currentClass);
    if (element.length !== 0) {
      document.getElementsByClassName(currentClass)[0].className = futureClass;
    }
  }

  addZero(myNumber: number) {
    return (myNumber < 10 ? '0' : '') + myNumber;
  }
}
