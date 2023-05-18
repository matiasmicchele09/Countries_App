import { Component, EventEmitter, Input, OnInit, Output, OnDestroy } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [
  ]
})

export class SearchBoxComponent implements OnInit, OnDestroy {

  private debouncer:Subject<string> = new Subject<string>;
  private debouncerSuscription?: Subscription;

  @Input()
  public placeholder: string = '';

  @Input()
  public initialValue: string = '';

  // @Output() //forma corta
  // public onValue = new EventEmitter<string>(); AHORA VAMOS A USAR EL DEBOUNCE, PERO DE TODOS MODOS SE PODIA USAR ESTE ONVALUE, FUNCIONABA IGUAL

  @Output() //forma corta
  public onDebounce = new EventEmitter<string>();

  ngOnInit(): void {
    this.debouncerSuscription = this.debouncer
    .pipe(
      debounceTime(1000)
    )
    .subscribe(value=>{
      //console.log('Debouncer value', value);
      this.onDebounce.emit(value);
    });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    console.log('Destruido');
    this.debouncerSuscription?.unsubscribe()

  }

  // emitValue(value: string):void {
  //   this.onValue.emit(value)
  // }

  onKeyPress(searchTerm: string){
    this.debouncer.next(searchTerm);
  }

}
