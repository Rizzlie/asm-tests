import { KeyValuePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Component({
  selector: 'asm-form-control-error',
  standalone: true,
  imports: [KeyValuePipe],
  templateUrl: './form-control-error.component.html',
  styleUrl: './form-control-error.component.scss',
})
export class FormControlErrorComponent {
  @Input() errors: ValidationErrors = {};
  @Input() displayName = 'Field';
}
