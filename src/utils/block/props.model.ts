import Block from "./block";
export type CustomElementEvents = Record<string, (args: any) => void>;

export interface Props extends Record<string, any>{
  children?: Record<string, Block>;
  events?: CustomElementEvents | Record<string, CustomElementEvents>;
  formsFields?: Record<string, string[]>;
  classNames?: string[];
}
