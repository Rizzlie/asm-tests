import { Component, Input } from '@angular/core';

@Component({
  selector: 'asm-alert',
  standalone: true,
  imports: [],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss',
})
export class AlertComponent {
  @Input() type: 'success' | 'error' = 'success';
}
