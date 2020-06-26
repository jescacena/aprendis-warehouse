import { Component, OnInit,EventEmitter,Output } from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css']
})
export class GameControlComponent implements OnInit {
  intervalRef;
  count:number = 0;
  @Output() startGameEvent = new EventEmitter<{count: number}>();

  constructor() { }

  ngOnInit() {
  }

  onStartGame() {
    this.intervalRef = setInterval(() => {
      this.startGameEvent.emit({
        count: this.count++
      });
    },1000);
  }

  onStopGame() {
    clearInterval(this.intervalRef);
  }

}
