import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResizedEvent } from 'angular-resize-event';
import domtoimage from 'dom-to-image';

@Component({
  selector: 'app-endgame',
  templateUrl: './endgame.component.html',
  styleUrls: ['./endgame.component.css']
})
export class EndgameComponent implements OnInit {
  minutes: string;
  seconds: string;
  milliseconds: string;
  textFontSizeAt1920: number;
  timerFontSizeAt1920: number;
  textFontSize: number;
  timerFontSize: number;

  constructor(private router: Router) {
    // If the user nagivated to the endgame page by himself go to start menu
    if (this.router.getCurrentNavigation().extras.replaceUrl) {
      this.router.navigate(['/startmenu']);
    }

    // Get the relevant game data
    const navigation = this.router.getCurrentNavigation();
    const state = navigation.extras.state as {
      minutes: string,
      seconds: string,
      milliseconds: string
    };

    this.minutes = state.minutes;
    this.seconds = state.seconds;
    this.milliseconds = state.milliseconds;
    this.textFontSizeAt1920 = 80;
    this.timerFontSizeAt1920 = 70;
  }

  ngOnInit() {
    this.resizeText();
  }

  resizeText() {
    // Resize the score text
    const widthRatio = window.innerWidth / 1920;
    const heightRatio = window.innerHeight / 1080;
    this.textFontSize = this.textFontSizeAt1920 * widthRatio;
    this.timerFontSize = this.timerFontSizeAt1920 * widthRatio;

    if (widthRatio > heightRatio) {
      this.textFontSize = this.textFontSizeAt1920 * heightRatio;
      this.timerFontSize = this.timerFontSizeAt1920 * heightRatio;
    }
  }

  onResized(event: ResizedEvent) {
    this.resizeText();
  }

  downloadImage() {
    const node = document.getElementsByClassName('endgame-container')[0];

    domtoimage.toJpeg(node, { quality: 1 })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = 'score.jpeg';
        link.href = dataUrl;
        link.click();
      });
  }
}
