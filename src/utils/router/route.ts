import Block from '/src/utils/block/block';
import { ROOT_QUERY } from '/src/utils/router/router';

function renderBlockInRoot(block: Block): Element {
  const root = document.querySelector(ROOT_QUERY);
  if (root) {
    root.appendChild(block.getContent());
    return root;
  }
  return document.body;
}

export interface RouteParams {
  pathname: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  view: any;
  props?: Record<string, any>;
}

export class Route {
  pathname: string;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  blockClass: any;

  block: Block;

  props: Record<string, any>;

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  constructor(pathname: string, view: any, props?: Record<string, any>) {
    this.pathname = pathname;
    this.blockClass = view;
    this.props = props || {};
  }

  navigate(pathname: string): void {
    if (this.match(pathname)) {
      this.pathname = pathname;
      this.render();
    }
  }

  leave(): void {
    if (this.block) {
      this.block.hide();
    }
  }

  match(pathname: string): boolean {
    return pathname === this.pathname;
  }

  render(): void {
    if (!this.block) {
      this.block = new this.blockClass(this.props);
      renderBlockInRoot(this.block);
      return;
    }

    this.block.show();
  }
}
