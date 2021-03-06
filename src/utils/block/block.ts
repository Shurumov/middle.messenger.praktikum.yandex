import { EventBus } from '/src/utils/event-bus';
import { Props } from '/src/utils/block/props.model';
import { CustomElementEvents } from './props.model';
import { helpers } from '/src/utils/helpers';

interface Meta<T> {
  classNames: string[];
  tagName: string;
  props: T;
}

export default abstract class Block<BlockProps extends Props = Props> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_RENDER: 'flow:render',
    FLOW_CDU: 'flow:component-did-update',
  };

  readonly eventBus: EventBus = new EventBus();
  props: BlockProps;

  _element: HTMLElement;
  _meta: Meta<BlockProps>;

  listeners: CustomElementEvents | Record<string, CustomElementEvents> = {};

  get element(): HTMLElement {
    return this._element;
  }

  childrenListeners: Record<string, CustomElementEvents> = {};

  constructor(props: BlockProps, tagName = 'div', classNames: string[] = []) {
    this._meta = {
      tagName,
      props,
      classNames,
    };

    this.registerBlockEvents(this.eventBus);
    this.eventBus.emit(Block.EVENTS.INIT);
  }

  render(): string {
    return '';
  }

  getBlock(): HTMLElement {
    return this.element;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  componentDidMount(_props: BlockProps): void {
    return;
  }


  componentDidUpdate(oldProps: BlockProps, newProps: BlockProps): boolean {
    return !helpers.isEqual(oldProps, newProps);
  }

  setProps(nextProps: BlockProps): void {
    if (!nextProps) {
      return;
    }

    const oldState = Object.assign({}, this.props);

    Object.assign(this.props, nextProps);

    this.eventBus.emit(Block.EVENTS.FLOW_CDU, oldState, this.props);
  }

  show(): void {
    if (this._element) {
      this._element.style.display = 'block';
    }
  }

  hide(): void {
    if (this._element) {
      this._element.style.display = 'none';
    }
  }

  private init() {
    const { tagName, classNames, props } = this._meta;

    this.props = this.makePropsProxy(props);

    const elem = document.createElement(tagName);
    classNames.forEach((className) => {
      elem.classList.add(className);
    });

    this._element = elem;
    this.eventBus.emit(Block.EVENTS.FLOW_CDM);
  }

  private _render(): void {
    const block = this.render();

    this.removeEvents();

    this._element.innerHTML = block;
    this.addElementEvents();

    this.addChildrenComponents();
    this.addChildrenEvents();
  }

  private addElementEvents(): void {
    const { events = {} } = this.props;

    Object.keys(events).forEach((key: string) => {
      if (typeof events[key] === "function") {
        const eventName = key;
        const eventCallback = events[key] as Function;

        this._element.addEventListener(eventName, eventCallback.bind(this));
        this.listeners[eventName] = events[key];
      }
    });
  }

  private addChildrenComponents() {
    if (this.props.children) {
      Object.entries(this.props.children).forEach(([childTag, childBlock]: [string, Block]) => {
        const childrenAnchors = this._element.getElementsByTagName(childTag);
        if (childrenAnchors.length > 0) {
          Array.from(childrenAnchors).forEach((anchor) => {
            const block = childBlock.getBlock();
            block.classList.add(childTag);
            anchor.replaceWith(block);
          });
        }
      });
    }
  }

  private addChildrenEvents(): void {
    const { events = {} } = this.props;
    Object.keys(events).forEach((tagName) => {
      if (typeof events[tagName] !== 'function') {
        const specificElementEvents: any = events[tagName];
        const specificTagCollection = this._element.querySelectorAll(tagName);

        if (specificTagCollection.length > 0) {
          const specificElement = specificTagCollection[0];

          Object.keys(specificElementEvents).forEach((eventName: string) => {
            if (typeof specificElementEvents[eventName] === 'function') {
              specificElement.addEventListener(
                eventName,
                specificElementEvents[eventName].bind(this)
              );
              if (typeof this.childrenListeners[tagName] === 'undefined') {
                this.childrenListeners[tagName] = {};
              }
              this.childrenListeners[tagName][eventName] = specificElementEvents[eventName];
            }
          });
        }
      }
    });
  }

  private removeEvents() {
    Object.entries(this.listeners).forEach(([eventName, eventCallback]) => {
      this._element.removeEventListener(eventName, eventCallback);
    });

    if(this.childrenListeners?.length) {
      Object.keys(this.childrenListeners).forEach((tagName) => {
        console.log(this);
        const specificTagCollection = this._element.getElementsByTagName(tagName);
        const specificElement = specificTagCollection[0];

        Object.entries(this.childrenListeners[tagName]).forEach(([eventName, eventCallback]) => {
          specificElement.removeEventListener(eventName, eventCallback);
        });
      });
    }
    this.listeners = {};
    this.childrenListeners = {};
  }

  private makePropsProxy(props: BlockProps) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return new Proxy(props as unknown as any, {
      get: (target, prop: string) => {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(this) : value;
      },
      set: (target, prop: string, value) => {
        if (prop.indexOf('_') === 0) {
          throw new Error('?????? ????????');
        }
        target[prop] = value;

        return true;
      },
      deleteProperty: () => {
        throw new Error('?????? ??????????????');
      },
    });
  }

  private registerBlockEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private _componentDidMount() {
    this.componentDidMount(this.props);
    this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
  }

  private _componentDidUpdate(oldProps: BlockProps, newProps: BlockProps): void {
    const shouldBeUpdated = this.componentDidUpdate(oldProps, newProps);
    if (shouldBeUpdated) {
      this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
    }
  }
}
