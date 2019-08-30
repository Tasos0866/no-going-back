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
  gameSubscription: Subscription;
  roadPositionLeft: number;

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
  timerSubscription: Subscription;

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

  // Character Respawned text
  hasRespawnedVisibility: string;

  // Score
  timesPassed: number;
  timesPassedLimit: number

  constructor() {
    // Window
    this.initialWidth = 1920;
    this.currentWidth = window.innerWidth;
    this.windowWidthRatio = this.currentWidth / this.initialWidth;
    this.roadPositionLeft = 0;

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

    // Character Respawned text
    this.hasRespawnedVisibility = 'hidden';

    // Score
    this.timesPassed = 0;
    this.timesPassedLimit = 10;
  }

  ngOnInit() {
    // If the window is smaller than ~1350px display the small chracter
    if (this.windowWidthRatio < 0.703) {
      this.charWidth = 20;
      this.charHeight = 32;
      this.setClass('character-big', 'character-small');
    }
    this.roadPositionLeft = this.getRoadOffsetLeft();

    // Create an Observable that will publish a value on an interval
    const secondsCounter = interval(10);

    // Subscribe to begin publishing values
    this.timerSubscription = secondsCounter.subscribe(n => {
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
    this.timerSubscription.unsubscribe();

    // Create an observable that will publish any value that is relevant to gameplay
    const gameInterval = interval(33);  // 30fps

    // Subscribe to begin publishing values
    this.timerSubscription = gameInterval.subscribe(n => {
      
      // If the character and car1 are in the same y position
      if (this.positionY + this.charHeight > this.carPositionY &&
          this.positionY < this.carPositionY + this.carHeight) {
        // Check for collision in the x axes
        if (this.checkCollisionX()) {
          this.collisionConsequences();
        }
      }

      // If the character and car2 are in the same y position
      if (this.positionY + this.charHeight > this.car2PositionY &&
          this.positionY < this.car2PositionY + this.car2Height) {
        // Check for collision in the x axes
        if (this.checkCollisionX()) {
          this.collisionConsequences();
        }
      }

      // If the character and car3 are in the same y position
      if (this.positionY + this.charHeight > this.car3PositionY &&
          this.positionY < this.car3PositionY + this.car3Height) {
        // Check for collision in the x axes
        if (this.checkCollisionX()) {
          this.collisionConsequences();
        }
      }
    });
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

    if (event.key === 'ArrowRight') {
      if (this.positionX < (window.innerWidth - this.charWidth) - 20) {
        this.positionX = this.positionX + 20;
        this.setClass('character-big', 'character-big-move');
        this.setClass('character-small', 'character-small-move');
      } else {
        this.reachTheEndConsequences();
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

    // Get the distance from the start of the screen to the road div
    this.roadPositionLeft = this.getRoadOffsetLeft();

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

  checkCollisionX() {
    if(this.positionX + this.charWidth - 10 > this.carPositionX + this.roadPositionLeft &&
      this.positionX < this.carPositionX + this.roadPositionLeft + this.carWidth) {
      return true;
    }

    if(this.positionX + this.charWidth - 10 > this.car2PositionX + this.roadPositionLeft &&
      this.positionX < this.car2PositionX + this.roadPositionLeft + this.car2Width) {
      return true;
    }

    if(this.positionX + this.charWidth - 10 > this.car3PositionX + this.roadPositionLeft &&
      this.positionX < this.car3PositionX + this.roadPositionLeft + this.car3Width) {
      return true;
    }
    return false;
  }

  collisionConsequences() {
    // Send character to initial position
    this.positionX = 10;
    this.positionY = this.positionY = (window.innerHeight - this.charHeight) / 2;

    // Display respawn message
    this.hasRespawnedVisibility = 'visible';

    // Hide respawn message after 3 seconds
    setTimeout(() => {
      this.hasRespawnedVisibility = 'hidden';
    }, 3000);
  }

  reachTheEndConsequences() {
    // Update score
    this.timesPassed = this.timesPassed + 1;

    if (this.timesPassed < this.timesPassedLimit) {
      // Send character to initial position
      this.positionX = 10;
      this.positionY = this.positionY = (window.innerHeight - this.charHeight) / 2;

      // Display respawn message
      this.hasRespawnedVisibility = 'visible';

      // Hide respawn message after 3 seconds
      setTimeout(() => {
        this.hasRespawnedVisibility = 'hidden';
      }, 3000);
    } else {
      console.log('you won');
      //this.timerSubscription.unsubscribe();
    }
  }

  getRoadOffsetLeft() {
    let center = document.getElementsByClassName('center')[0];
    return center.offsetLeft;
  }
}
