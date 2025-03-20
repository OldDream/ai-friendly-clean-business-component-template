import type { Meta, StoryObj } from '@storybook/react';
import { TransferForm } from './index';
import type { TransferFormProps } from './interface';

const meta: Meta<TransferFormProps> = {
  title: 'Business/TransferForm',
  component: TransferForm,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<TransferFormProps>;

export const Default: Story = {
  args: {
    currentStep: 0,
    initialData: {
      payAccount: 'ant-design@alipay.com',
      receivingType: 'alipay',
      receivingAccount: 'test@example.com',
      receiverName: 'Alex',
      amount: 500
    },
    onSubmit: (values) => console.log('Form submitted:', values),
    onStepChange: (step) => console.log('Step changed to:', step),
    onDataChange: (values) => console.log('Data changed:', values)
  }
};

export const EmptyForm: Story = {
  args: {
    currentStep: 0,
    onSubmit: (values) => console.log('Form submitted:', values),
    onStepChange: (step) => console.log('Step changed to:', step),
    onDataChange: (values) => console.log('Data changed:', values)
  }
};

export const SecondStep: Story = {
  args: {
    currentStep: 1,
    initialData: {
      payAccount: 'ant-design@alipay.com',
      receivingType: 'alipay',
      receivingAccount: 'test@example.com',
      receiverName: 'Alex',
      amount: 500
    },
    onSubmit: (values) => console.log('Form submitted:', values),
    onStepChange: (step) => console.log('Step changed to:', step),
    onDataChange: (values) => console.log('Data changed:', values)
  }
};

export const FinalStep: Story = {
  args: {
    currentStep: 2,
    initialData: {
      payAccount: 'ant-design@alipay.com',
      receivingType: 'alipay',
      receivingAccount: 'test@example.com',
      receiverName: 'Alex',
      amount: 500
    },
    onSubmit: (values) => console.log('Form submitted:', values),
    onStepChange: (step) => console.log('Step changed to:', step),
    onDataChange: (values) => console.log('Data changed:', values)
  }
};
