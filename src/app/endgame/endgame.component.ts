import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-endgame',
  templateUrl: './endgame.component.html',
  styleUrls: ['./endgame.component.css']
})
export class EndgameComponent implements OnInit {
  minutes: string;
  seconds: string;
  milliseconds: string;

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
  }

  ngOnInit() {
    console.log('Your time is: ' + this.minutes + ':' + this.seconds + ':' + this.milliseconds);
  }
}
