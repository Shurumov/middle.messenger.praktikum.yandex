export interface ChatInputProps {
  name: string;
  placeholder: string;
  label: string;
  errorText?: string;
  value?: string;
  validators?: string | number | null | RegExp;
  class?: string[];
  replaceClassList?: boolean;
}
