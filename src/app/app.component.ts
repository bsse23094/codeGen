import { Component } from '@angular/core';
import { BuilderComponent } from './builder/builder.component';

@Component({
  selector: 'app-root',
  imports: [BuilderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Visual Landing Page Builder';
}
