import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  template:`<app-reservation></app-reservation>`,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Hotel-Management-System-Frontend';
}
