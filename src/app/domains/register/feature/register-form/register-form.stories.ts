import { RegisterFormComponent } from '@/domains/register';
import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { applicationConfig, Meta, StoryObj } from '@storybook/angular';
import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<RegisterFormComponent> = {
  title: 'Domains/Register',
  component: RegisterFormComponent,
  decorators: [
    applicationConfig({
      providers: [importProvidersFrom(HttpClientModule)],
    }),
  ],
};

export default meta;

type Story = StoryObj<RegisterFormComponent>;

export const EmptyForm: Story = {
  parameters: {
    controls: {
      include: [],
    },
  },
};

export const FilledForm: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.type(canvas.getByTestId('firstName'), 'John');

    await userEvent.type(canvas.getByTestId('lastName'), 'Doe');

    await userEvent.type(canvas.getByTestId('login'), 'admin');

    await userEvent.type(canvas.getByTestId('email'), 'john.doe@example.com');

    await userEvent.type(canvas.getByTestId('password'), 'PaS$w0rd!');

    await userEvent.type(canvas.getByTestId('repeatPassword'), 'PaS$w0rd!');

    await userEvent.click(canvas.getByTestId('tos'));

    await expect(canvas.getByTestId('submit')).toBeEnabled();
  },
  parameters: {
    controls: {
      include: [],
    },
  },
};

export const InvalidForm: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.type(canvas.getByTestId('firstName'), 'John');

    await userEvent.type(canvas.getByTestId('lastName'), 'Doe');

    await userEvent.type(canvas.getByTestId('login'), 'admin');

    await userEvent.type(canvas.getByTestId('email'), 'john.doe@example.com');

    await userEvent.type(canvas.getByTestId('password'), 'PaS$w0rd!');

    await userEvent.type(canvas.getByTestId('repeatPassword'), 'PaS$w0rd!');

    await expect(canvas.getByTestId('submit')).toBeDisabled();
  },
};
