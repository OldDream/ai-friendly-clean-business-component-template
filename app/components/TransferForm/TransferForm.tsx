import React, { useEffect } from 'react';
import { Steps, Form, Input, Select, InputNumber, Button } from 'antd';
import type { TransferFormProps, TransferFormData } from './interface';

const { Step } = Steps;

const TransferForm: React.FC<TransferFormProps> = ({
  initialData,
  currentStep = 0,
  onSubmit,
  onStepChange,
  onDataChange
}) => {
  const [form] = Form.useForm<TransferFormData>();

  useEffect(() => {
    if (initialData) {
      form.setFieldsValue(initialData);
    }
  }, [initialData, form]);

  const handleFormChange = () => {
    const values = form.getFieldsValue();
    onDataChange?.(values as TransferFormData);
  };

  const handleNext = async () => {
    try {
      const values = await form.validateFields();
      if (currentStep === 0) {
        onStepChange?.(1);
      } else if (currentStep === 1) {
        onSubmit?.(values);
        onStepChange?.(2);
      }
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const renderStepContent = () => {
    if (currentStep === 0) {
      return (
        <div className="mt-6 max-w-lg mx-auto">
          <Form
            form={form}
            layout="vertical"
            onValuesChange={handleFormChange}
            initialValues={initialData}
          >
            <div className="mb-6">
              <div className="text-sm text-red-500 mb-1">* 付款账户</div>
              <Form.Item
                name="payAccount"
                rules={[{ required: true, message: '请输入付款账户' }]}
                noStyle
              >
                <Input className="w-full" />
              </Form.Item>
            </div>

            <div className="mb-6">
              <div className="text-sm mb-1">收款账户</div>
              <Form.Item name="receivingType" noStyle>
                <Select className="w-28">
                  <Select.Option value="alipay">支付宝</Select.Option>
                  <Select.Option value="bank">银行账户</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="receivingAccount"
                className="inline-block ml-2 w-64"
                rules={[{ required: true, message: '请输入收款账户' }]}
                noStyle
              >
                <Input />
              </Form.Item>
            </div>

            <div className="mb-6">
              <div className="text-sm text-red-500 mb-1">* 收款人姓名</div>
              <Form.Item
                name="receiverName"
                rules={[{ required: true, message: '请输入收款人姓名' }]}
                noStyle
              >
                <Input className="w-full" />
              </Form.Item>
            </div>

            <div className="mb-8">
              <div className="text-sm text-red-500 mb-1">* 转账金额</div>
              <Form.Item
                name="amount"
                rules={[{ required: true, message: '请输入转账金额' }]}
                noStyle
              >
                <InputNumber
                  className="w-full"
                  formatter={(value) => `¥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={(value) => value!.replace(/\¥\s?|(,*)/g, '')}
                  min={0}
                />
              </Form.Item>
            </div>

            <Form.Item>
              <Button type="primary" onClick={handleNext} className="w-24">
                下一步
              </Button>
            </Form.Item>
          </Form>
        </div>
      );
    } else if (currentStep === 1) {
      // 输入转账信息（确认页）
      const formData = form.getFieldsValue();
      return (
        <div className="mt-6 max-w-lg mx-auto">
          <div className="p-6 bg-gray-50 rounded-md">
            <div className="mb-4">
              <div className="text-gray-500 mb-1">付款账户</div>
              <div>{formData.payAccount}</div>
            </div>
            <div className="mb-4">
              <div className="text-gray-500 mb-1">收款账户</div>
              <div>{formData.receivingAccount}</div>
            </div>
            <div className="mb-4">
              <div className="text-gray-500 mb-1">收款人姓名</div>
              <div>{formData.receiverName}</div>
            </div>
            <div className="mb-4">
              <div className="text-gray-500 mb-1">转账金额</div>
              <div className="text-xl font-medium">¥ {formData.amount}</div>
            </div>
          </div>

          <div className="mt-6">
            <Button type="primary" onClick={handleNext} className="w-24">
              提交
            </Button>
            <Button className="ml-4 w-24" onClick={() => onStepChange?.(0)}>
              上一步
            </Button>
          </div>
        </div>
      );
    } else {
      // 完成页
      return (
        <div className="mt-6 max-w-lg mx-auto text-center">
          <div className="text-green-500 text-5xl mb-4">✓</div>
          <h3 className="text-xl font-medium mb-2">操作成功</h3>
          <p className="text-gray-500">预计两小时内到账</p>
          <div className="mt-8">
            <Button type="primary" onClick={() => onStepChange?.(0)}>
              再转一笔
            </Button>
            <Button className="ml-4">查看账单</Button>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <Steps current={currentStep}>
        <Step title="填写转账信息" />
        <Step title="确认转账信息" />
        <Step title="完成" />
      </Steps>

      {renderStepContent()}
    </div>
  );
};

export default TransferForm;
