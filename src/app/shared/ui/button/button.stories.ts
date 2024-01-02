import { ButtonComponent } from '@/ui';
import { Meta, StoryObj } from '@storybook/angular';

type StoryType = ButtonComponent & { label: string };

const meta: Meta<StoryType> = {
  title: 'UI/Button',
  component: ButtonComponent,
  render: (args: StoryType) => {
    const { label, ...props } = args;

    return {
      props,
      template: `
        <asm-button [disabled]="disabled" [type]="type">${label}</asm-button>
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

export const Default: Story = {
  args: {
    disabled: false,
    label: 'Button',
    type: 'button',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'Button',
    type: 'button',
  },
};
