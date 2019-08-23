import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }


  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'ArrowUp') {
      
    }
    if (event.key === 'ArrowDown') {
      
    }
    if (event.key === 'ArrowLeft') {

    }
    if (event.key === 'ArrowRight') {

    }
    
  }
}
