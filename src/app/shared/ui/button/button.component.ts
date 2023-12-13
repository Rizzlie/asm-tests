import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'asm-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  @Input() type: 'button' | 'submit' = 'button';
  @Input() disabled = false;
  @Output() clicked = new EventEmitter<void>();

  handleClick() {
    this.clicked.emit();
  }
}
