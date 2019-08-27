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

  constructor() {
    this.charWidth = 50;
    this.charHeight = 50;
    this.charSpeed = 20;
    this.positionX = 0;
    this.positionY = (window.innerHeight - this.charHeight) / 2;
  }

  ngOnInit() {
  }


  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'ArrowUp') {
      if (this.positionY < (window.innerHeight - this.charHeight) - 20) {
        this.positionY = this.positionY + 20;
      }
    }

    if (event.key === 'ArrowDown') {
      if (this.positionY > 20) {
        this.positionY = this.positionY - 20;
      }
    }

    if (event.key === 'ArrowLeft') {
      if (this.positionX > 0) {
        this.positionX = this.positionX - 20;
      }
    }

    if (event.key === 'ArrowRight') {
      if (this.positionX < (window.innerWidth - this.charWidth) - 20) {
        this.positionX = this.positionX + 20;
      }
    } 
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    event.target.innerWidth;
    if (this.positionX + this.charWidth > window.innerWidth) {
      this.positionX = window.innerWidth - this.charWidth;
    }
    if (this.positionY + this.charHeight > window.innerHeight) {
      this.positionY = window.innerHeight - this.charHeight;
    }
  }
}
