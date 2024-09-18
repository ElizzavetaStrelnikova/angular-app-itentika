import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  template: `<div>
                <router-outlet></router-outlet>
            </div>`,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-app-itentika';
}
