import { Component, DestroyRef, OnInit, effect, inject, signal } from '@angular/core';
import { interval, map, Observable } from 'rxjs';
import { toObservable, toSignal} from '@angular/core/rxjs-interop'
@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  clickCount = signal(0);
  clickCount$ = toObservable(this.clickCount); // signals to observables
  
  interval$ = interval(1000); // observables have necessarily no initial value
  intervalSignal = toSignal(this.interval$, { initialValue: 0 }); // observables to signal, auto cleans subscription
  
  customInterval$ = new Observable((subscriber) =>{
    let timeExecuted = 0;
    const interval = setInterval(() => {
      // subscriber.error();
      if(timeExecuted > 3){
        clearInterval(interval);
        subscriber.complete();
        return;
      }
      console.log("Emitting new value...")
      subscriber.next({message: 'New Value'});
      timeExecuted++;
    },2000);
  });
  private destroyRef = inject(DestroyRef);

  constructor(){
    // effect(() =>{
    //   console.log(`clicked button ${this.clickCount()} times.`)
    // });
    // toObservable(this.clickCount) //unexecuted signal
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
      this.customInterval$.subscribe({
        next: (val) => console.log(val), // observer
        complete: () => console.log("COMPLETED!"), // observer
        error: (err) => console.log(err) // observe 
      })

      const subscription = this.clickCount$.subscribe({
        next: (val) => console.log(`clicked button ${this.clickCount()} times.`)
      })
        this.destroyRef.onDestroy(() =>{
        subscription.unsubscribe();
      })
    }

    //signal
  OnClick(){
      this.clickCount.update(prevCount => prevCount + 1);
    }
}
