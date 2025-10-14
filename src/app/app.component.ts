import { Component, DestroyRef, OnInit, effect, inject, signal } from '@angular/core';
import { interval, map } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  clickCount = signal(0);
  private destroyRef = inject(DestroyRef);
  constructor(){
    effect(() =>{
      console.log(`clicked button ${this.clickCount()} times.`)
    });
  }

  //Observables are great for managing events and streamed data
  //Signals are great for managing application state

  ngOnInit(): void {

      //Observable
      // const subscription = interval(1000).pipe( // pipe are inserted into streamline to manipulate data
      //   map((val) => val * 2), // operator
      // ).subscribe({
      //   next: (val) => console.log(val),
      // }); //every second, observable
      // this.destroyRef.onDestroy(() =>{
      //   subscription.unsubscribe();
      // })
    }

    //signal
  OnClick(){
      this.clickCount.update(prevCount => prevCount + 1);
    }
}
