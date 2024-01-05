import { FormControlComponent } from '@/ui';
import { Component, Input, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Meta, StoryObj } from '@storybook/angular';
import { fireEvent, userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

@Component({
  selector: 'asm-form-control-wrapper',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, FormControlComponent],
  template: `
    <form [formGroup]="form">
      <asm-form-control
        [type]="type"
        [displayName]="displayName"
        [controlName]="controlName"
        [control]="control" />
    </form>
  `,
})
class FormControlWrapperComponent implements OnInit {
  control = new FormControl('', [Validators.required]);
  @Input() set displayName(value: string) {
    this._displayName = value;
  }
  get displayName() {
    return this._displayName;
  }
  private _displayName = 'First name';

  @Input() set type(value: 'text' | 'email' | 'password' | 'checkbox') {
    this._type = value;
    this.createForm();
  }
  get type() {
    return this._type;
  }
  private _type: 'text' | 'email' | 'password' | 'checkbox' = 'text';

  controlName = 'firstName';

  form: FormGroup | null = null;

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.control = this.createControl();

    this.form = new FormGroup({
      [this.controlName]: this.control,
    });
  }

  createControl() {
    console.log(this.displayName, this.type);
    switch (this.type) {
      case 'text':
        return new FormControl('', [Validators.required]);
      case 'email':
        return new FormControl('', [Validators.required, Validators.email]);
      case 'password':
        return new FormControl('', [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(25),
        ]);
      case 'checkbox':
        return new FormControl(false, [Validators.requiredTrue]);
      default:
        return new FormControl();
    }
  }
}

const meta: Meta<FormControlWrapperComponent> = {
  title: 'UI/FormControl',
  component: FormControlWrapperComponent,
};

export default meta;

type Story = StoryObj<FormControlWrapperComponent>;

export const Default: Story = {
  argTypes: {
    type: {
      control: {
        type: 'select',
      },
      options: ['text', 'email', 'password', 'checkbox'],
    },
    displayName: {
      control: {
        type: 'text',
      },
    },
  },
  args: {
    type: 'text',
    displayName: 'First name',
  },
};

export const Text: Story = {
  args: {
    displayName: 'First name',
  },
  parameters: {
    controls: {
      include: ['displayName'],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await canvas.getByTestId('firstName').focus();

    await fireEvent.blur(document.activeElement!);

    await expect(canvas.getByTestId('firstName-error')).toBeInTheDocument();
  },
};

export const Email: Story = {
  args: {
    type: 'email',
    displayName: 'Email',
  },
  parameters: {
    controls: {
      include: ['displayName', 'type'],
    },
  },
  argTypes: {
    type: {
      table: {
        disable: true,
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.type(canvas.getByTestId('firstName'), 'invalid-email');

    await fireEvent.blur(document.activeElement!);

    await expect(
      canvas.getByText('Email is not a valid email')
    ).toBeInTheDocument();
  },
};

export const Password: Story = {
  args: {
    type: 'password',
    displayName: 'Password',
  },
  parameters: {
    controls: {
      include: ['displayName', 'type'],
    },
  },
  argTypes: {
    type: {
      table: {
        disable: true,
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.type(canvas.getByTestId('firstName'), 'inv');

    await fireEvent.blur(document.activeElement!);

    await expect(
      canvas.getByText('Password must be at least 6 characters long')
    ).toBeInTheDocument();
  },
};

export const Checkbox: Story = {
  args: {
    type: 'checkbox',
    displayName: 'I agree to the terms of service',
  },
  parameters: {
    controls: {
      include: ['displayName', 'type'],
    },
  },
  argTypes: {
    type: {
      table: {
        disable: true,
      },
    },
  },
};
