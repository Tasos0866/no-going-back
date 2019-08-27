import { Component, OnInit, HostListener } from '@angular/core';

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

  constructor() {
    this.charWidth = 20;
    this.charHeight = 32;
    this.charSpeed = 20;
    this.positionX = this.charWidth;
    this.positionY = (window.innerHeight - this.charHeight) / 2;
    this.scale = 2;
  }

  ngOnInit() {
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
    event.target.innerWidth;
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
}
