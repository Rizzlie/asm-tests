import { AlertComponent } from '@/ui';
import { Meta, StoryObj } from '@storybook/angular';

type StoryType = AlertComponent & { label: string };

const meta: Meta<StoryType> = {
  title: 'UI/Alert',
  component: AlertComponent,
  render: (args: StoryType) => {
    const { label, ...props } = args;

    return {
      props,
      template: `
        <asm-alert [type]="type">${label}</asm-alert>
      `,
    };
  },
  argTypes: {
    label: {
      control: 'text',
    },
  },
  args: {
    label: '',
  },
};

export default meta;

type Story = StoryObj<StoryType>;

export const Success: Story = {
  args: {
    label: 'Success',
    type: 'success',
  },
  argTypes: {
    type: {
      table: {
        disable: true,
      },
    },
  },
};

export const Error: Story = {
  args: {
    label: 'Error',
    type: 'error',
  },
  argTypes: {
    type: {
      table: {
        disable: true,
      },
    },
  },
};
