import { Component, OnInit, HostListener } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  positionX: number;
  positionY: number;
  charWidth: number;
  charHeight: number;
  charSpeed: number;
  scale: number;
  minutes: number;
  seconds: number;
  miliseconds: number;
  displayMinutes: string;
  displaySeconds: string;
  displayMiliseconds: string;

  constructor() {
    this.charWidth = 20;
    this.charHeight = 32;
    this.charSpeed = 20;
    this.positionX = this.charWidth;
    this.positionY = (window.innerHeight - this.charHeight) / 2;
    this.scale = 2;
    this.minutes = 0;
    this.seconds = 0;
    this.miliseconds = 0;
    this.displayMinutes = '00';
    this.displaySeconds = '00';
    this.displayMiliseconds = '00';
  }

  ngOnInit() {
    // Create an Observable that will publish a value on an interval
    const secondsCounter = interval(10);
    // Subscribe to begin publishing values
    secondsCounter.subscribe(n => {
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
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'ArrowUp') {
      if (this.positionY < (window.innerHeight - this.charHeight * this.scale) - 20) {
        this.positionY = this.positionY + 20;
        this.setClass('character', 'characterMove');
      }
    }

    if (event.key === 'ArrowDown') {
      if (this.positionY > 20 + this.charHeight) {
        this.positionY = this.positionY - 20;
        this.setClass('character', 'characterMove');
      }
    }

    // if (event.key === 'ArrowLeft') {
    //   if (this.positionX - this.charWidth > 0) {
    //     this.positionX = this.positionX - 20;
    //     this.setClass('character', 'characterMove');
    //   }
    // }

    if (event.key === 'ArrowRight') {
      if (this.positionX < (window.innerWidth - this.charWidth * this.scale) - 20) {
        this.positionX = this.positionX + 20;
        this.setClass('character', 'characterMove');
      }
    }
  }

  @HostListener('document:keyup', ['$event'])
  handleKeyboardEvent2(event: KeyboardEvent) {
    if (event.key === 'ArrowUp') {
      this.setClass('characterMove', 'character');
    }

    if (event.key === 'ArrowDown') {
      this.setClass('characterMove', 'character');
    }

    // if (event.key === 'ArrowLeft') {
    //   this.setClass('characterMove', 'character');
    // }

    if (event.key === 'ArrowRight') {
      this.setClass('characterMove', 'character');
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (this.positionX + this.charWidth * this.scale > window.innerWidth) {
      this.positionX = window.innerWidth - this.charWidth * this.scale;
    }
    if (this.positionY + this.charHeight * this.scale > window.innerHeight) {
      this.positionY = window.innerHeight - this.charHeight * this.scale;
    }
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
