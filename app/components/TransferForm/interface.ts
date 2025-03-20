export interface TransferFormData {
  payAccount: string;
  receivingType: string;
  receivingAccount: string;
  receiverName: string;
  amount: number;
}

export interface TransferFormProps {
  /** 初始表单数据 */
  initialData?: Partial<TransferFormData>;
  /** 当前步骤 */
  currentStep?: number;
  /** 表单提交回调 */
  onSubmit?: (values: TransferFormData) => void;
  /** 步骤变更回调 */
  onStepChange?: (step: number) => void;
  /** 表单数据变更回调 */
  onDataChange?: (values: TransferFormData) => void;
} 