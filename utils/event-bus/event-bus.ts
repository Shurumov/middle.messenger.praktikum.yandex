export class EventBus {
  listeners: Record<string, Function[]>;
  constructor() {
    this.listeners = {};
  }

  on(event: string, callback: Function): void {
    if(!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }

  off(event: string, callback: Function): void {
    this.listeners[event] = this.listeners[event].filter(item => item != callback);
  }

  emit<T>(event: string, args?: T[]): void {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event].forEach(listener => {
      if(args) {
        listener(...args);
      }
    });
  }
}