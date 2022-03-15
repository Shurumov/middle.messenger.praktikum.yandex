import Block from "./block";
export type CustomEvent = (args: any) => void;
export type CustomElementEvents = Record<string, CustomEvent>;

export interface Props extends Record<string, any>{
  children?: Record<string, Block>;
  events?: CustomElementEvents | Record<string, CustomElementEvents>;
  formsFields?: Record<string, string[]>;
  classNames?: string[];
}
