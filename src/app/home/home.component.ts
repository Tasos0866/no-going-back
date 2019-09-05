import { Component, OnInit, HostListener } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { Router, NavigationExtras } from '@angular/router';

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
  normalWidthToHeightRatio: number;
  currentWidthToHeightRatio: number;

  // Character
  positionX: number;
  positionY: number;
  charWidth: number;
  charHeight: number;
  charSpeedAt1920: number;
  charSpeed: number;
  speedAdjustment: number;

  // Timer
  minutes: number;
  seconds: number;
  milliseconds: number;
  displayMinutes: string;
  displaySeconds: string;
  displayMilliseconds: string;
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
  carSpeed: number;
  carStartDelay: number;

  // Car at second lane
  car2PositionXat1920: number;
  car2WidthAt1920: number;
  car2HeightAt1920: number;
  car2Width: number;
  car2Height: number;
  car2PositionX: number;
  car2PositionY: number;
  car2Speed: number;
  car2StartDelay: number;

  // Car at third lane
  car3PositionXat1920: number;
  car3WidthAt1920: number;
  car3HeightAt1920: number;
  car3Width: number;
  car3Height: number;
  car3PositionX: number;
  car3PositionY: number;
  car3Speed: number;
  car3StartDelay: number;

  // Character Respawned text
  hasRespawnedVisibility: string;

  // Score
  timesPassed: number;
  timesPassedLimit: number;

  // Routing
  navExtras: NavigationExtras;

  constructor(private router: Router) {
    // If the user nagivated to the game page by himself go to start menu
    if (this.router.getCurrentNavigation().extras.replaceUrl) {
      this.router.navigate(['/startmenu']);
    }

    // Window
    this.initialWidth = 1920;
    this.currentWidth = window.innerWidth;
    this.windowWidthRatio = this.currentWidth / this.initialWidth;
    this.roadPositionLeft = 0;
    this.normalWidthToHeightRatio = 1920 / 1080;
    this.currentWidthToHeightRatio = window.innerWidth / window.innerHeight;

    // Character
    this.charWidth = 49;
    this.charHeight = 80;
    this.charSpeedAt1920 = 20;
    this.positionX = 10;
    this.positionY = (window.innerHeight - this.charHeight) / 2;
    this.speedAdjustment = this.currentWidthToHeightRatio / this.normalWidthToHeightRatio;
    this.charSpeed =  this.charSpeedAt1920 * this.speedAdjustment;

    // Timer
    this.minutes = 0;
    this.seconds = 0;
    this.milliseconds = 0;
    this.displayMinutes = '00';
    this.displaySeconds = '00';
    this.displayMilliseconds = '00';

    // One car for each lane
    // Car at first lane
    this.carPositionXat1920 = 600;
    this.carWidthAt1920 = 95;
    this.carHeightAt1920 = 191;
    this.carWidth = this.carWidthAt1920 * this.windowWidthRatio;
    this.carHeight = this.carHeightAt1920 * this.windowWidthRatio;
    this.carPositionX = this.carPositionXat1920 * this.windowWidthRatio - (this.carWidth / 2);
    this.carPositionY = window.innerHeight + this.carHeight;
    this.carSpeed = 1.4;
    this.carStartDelay = 1;

    // Car at second lane
    this.car2PositionXat1920 = 800;
    this.car2WidthAt1920 = 95;
    this.car2HeightAt1920 = 191;
    this.car2Width = this.car2WidthAt1920 * this.windowWidthRatio;
    this.car2Height = this.car2HeightAt1920 * this.windowWidthRatio;
    this.car2PositionX = this.car2PositionXat1920 * this.windowWidthRatio - (this.car2Width / 2);
    this.car2PositionY = window.innerHeight + this.car2Height * 3;
    this.car2Speed = 2.6;
    this.car2StartDelay = 3;

    // Car at third lane
    this.car3PositionXat1920 = 1000;
    this.car3WidthAt1920 = 95;
    this.car3HeightAt1920 = 191;
    this.car3Width = this.car3WidthAt1920 * this.windowWidthRatio;
    this.car3Height = this.car3HeightAt1920 * this.windowWidthRatio;
    this.car3PositionX = this.car3PositionXat1920 * this.windowWidthRatio - (this.car3Width / 2);
    this.car3PositionY = window.innerHeight + this.car3Height * 4;
    this.car3Speed = 2;
    this.car3StartDelay = 4;

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
      this.milliseconds = (n);
      this.displayMilliseconds = this.addZero(this.milliseconds % 100);
      if (this.milliseconds % 100 === 0) {
        this.seconds = (this.seconds + 1);
        this.displaySeconds = this.addZero(this.seconds  % 60);
      }
      if (this.seconds % 60 === 0 && this.seconds !== 0 && (this.milliseconds + 100) % 6000 === 0) {
        this.minutes = this.minutes + 1;
        this.displayMinutes = this.addZero(this.minutes);
      }
    });

    // Create an observable that will publish any value that is relevant to gameplay
    const gameInterval = interval(5);

    // Subscribe to begin publishing values
    this.gameSubscription = gameInterval.subscribe(n => {
      // Check for collisions
      this.checkForCollisions();

      // Update the positions of the cars
      this.updateCarsPosition();

      // Check if the cars have reached the bottom of the screen
      if (this.carPositionY < -(this.carHeight)) {
        this.generateNewCar('car1');
      }
      if (this.car2PositionY < -(this.car2Height)) {
        this.generateNewCar('car2');
      }
      if (this.car3PositionY < -(this.car3Height)) {
        this.generateNewCar('car3');
      }
    });
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.currentWidthToHeightRatio = window.innerWidth / window.innerHeight;
    this.speedAdjustment = this.currentWidthToHeightRatio / this.normalWidthToHeightRatio;
    console.log(this.speedAdjustment);
    if (event.key === 'ArrowUp') {
      if (this.positionY < (window.innerHeight - this.charHeight) - this.charSpeed) {
        this.positionY = this.positionY + this.charSpeed;
        this.setClass('character-big', 'character-big-move');
        this.setClass('character-small', 'character-small-move');
      }
    }

    if (event.key === 'ArrowDown') {
      if (this.positionY > this.charSpeed) {
        this.positionY = this.positionY - this.charSpeed;
        this.setClass('character-big', 'character-big-move');
        this.setClass('character-small', 'character-small-move');
      }
    }

    if (event.key === 'ArrowRight') {
      if (this.positionX < (window.innerWidth - this.charWidth) - this.charSpeed) {
        this.positionX = this.positionX + this.charSpeed;
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
    // Get the screen width ratio and width to height ratio
    this.currentWidth = window.innerWidth;
    this.windowWidthRatio = this.currentWidth / this.initialWidth;
    this.currentWidthToHeightRatio = this.currentWidth / window.innerHeight;

    // Get the distance from the start of the screen to the road div
    this.roadPositionLeft = this.getRoadOffsetLeft();

    // Move character to initial position if the window is resized [anticheat]
    this.positionX = 10;
    this.positionY = (window.innerHeight - this.charHeight) / 2;

    // Adjust the character 's speed depending on the screen width to height ratio
    this.speedAdjustment = this.currentWidthToHeightRatio / this.normalWidthToHeightRatio;
    this.charSpeed = this.charSpeedAt1920 * this.speedAdjustment;

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

  checkForCollisions() {
    // If the character and car1 are in the same y position
    if (this.positionY + this.charHeight > this.carPositionY &&
      this.positionY < this.carPositionY + this.carHeight) {
      // Check for collision in the x axes
      if (this.checkCollisionX('car1')) {
        this.collisionConsequences();
      }
    }

    // If the character and car2 are in the same y position
    if (this.positionY + this.charHeight > this.car2PositionY &&
        this.positionY < this.car2PositionY + this.car2Height) {
      // Check for collision in the x axes
      if (this.checkCollisionX('car2')) {
        this.collisionConsequences();
      }
    }

    // If the character and car3 are in the same y position
    if (this.positionY + this.charHeight > this.car3PositionY &&
        this.positionY < this.car3PositionY + this.car3Height) {
      // Check for collision in the x axes
      if (this.checkCollisionX('car3')) {
        this.collisionConsequences();
      }
    }
  }

  checkCollisionX(vehicle: string) {
    if (this.positionX + this.charWidth - 10 > this.carPositionX + this.roadPositionLeft &&
      this.positionX < this.carPositionX + this.roadPositionLeft + this.carWidth &&
      vehicle === 'car1') {
        return true;
    }

    if (this.positionX + this.charWidth - 10 > this.car2PositionX + this.roadPositionLeft &&
      this.positionX < this.car2PositionX + this.roadPositionLeft + this.car2Width &&
      vehicle === 'car2') {
      return true;
    }

    if (this.positionX + this.charWidth - 10 > this.car3PositionX + this.roadPositionLeft &&
      this.positionX < this.car3PositionX + this.roadPositionLeft + this.car3Width &&
      vehicle === 'car3') {
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
    if (this.timesPassed + 1 < this.timesPassedLimit) {
      // Update score
      this.timesPassed = this.timesPassed + 1;

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
      this.timesPassed = this.timesPassedLimit;
      this.timerSubscription.unsubscribe();
      this.endGameConsequences();
    }
  }

  getRoadOffsetLeft() {
    const center = document.getElementsByClassName('center')[0] as HTMLElement;
    return center.offsetLeft;
  }

  randomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  updateCarsPosition() {
      this.carPositionY = this.carPositionY - this.carSpeed;
      this.car2PositionY = this.car2PositionY - this.car2Speed;
      this.car3PositionY = this.car3PositionY - this.car3Speed;
  }

  generateNewCar(car: string) {
    // Generate a random number between 1 and 3 with 2 decimal places
    let randomSpeed = Math.random() * 3;
    if (randomSpeed < 1) {
      randomSpeed = 1 + Math.random();
    }
    randomSpeed = Math.round(randomSpeed * 100) / 100;

    if (car === 'car1') {
      // Set random speed and delay for car1
      this.carStartDelay = this.randomInt(1, 3);
      this.carSpeed = randomSpeed;

      // Reposition car1 at the top and add a 'positional delay'
      this.carPositionY = window.innerHeight + this.carHeight * this.carStartDelay;
    }

    if (car === 'car2') {
      // Set random speed and delay for car2
      this.car2StartDelay = this.randomInt(1, 3);
      this.car2Speed = randomSpeed;

      // Reposition car2 at the top and add a 'positional delay'
      this.car2PositionY = window.innerHeight + this.car2Height * this.car2StartDelay;
    }

    if (car === 'car3')  {
      // Set random speed and delay for car3
      this.car3StartDelay = this.randomInt(1, 3);
      this.car3Speed = randomSpeed;

      // Reposition car3 at the top and add a 'positional delay'
      this.car3PositionY = window.innerHeight + this.car3Height * this.car3StartDelay;
    }
  }

  endGameConsequences() {
    this.gameSubscription.unsubscribe();
    this.navExtras = {
      state: {
        minutes: this.displayMinutes,
        seconds: this.displaySeconds,
        milliseconds: this.displayMilliseconds
      }
    };
    this.router.navigate(['./endgame'], this.navExtras);
  }
}
