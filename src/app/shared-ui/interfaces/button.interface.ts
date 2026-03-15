export interface IButtonConfig {
  condition: boolean;
  icon: string;
  title: string;
  handler: (event: any) => void;
  type?: 'default' | 'primary' | 'danger';
  class?: string;
}
