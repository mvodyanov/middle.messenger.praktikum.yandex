import { v4 as makeUUID } from 'uuid';
import { isArray, isEqual } from '.';
import { Props, Children } from '../types/types';
import EventBus from './EventBus';
import templateWithProps from './templateWithProps';

export default abstract class Block {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_RENDER: 'flow:render',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_CWU: 'flow:component-will-unmount',
  };

  private _registerEvents() {
    this.eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
    this.eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    this.eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    this.eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    this.eventBus.on(Block.EVENTS.FLOW_CWU, this._unmountComponent.bind(this));
  }

  private _element: Element;

  protected eventBus: EventBus;

  protected props: Props;

  protected children: Children;

  protected id: string;

  protected eventTarget: string | null = null;

  constructor(propsAndChildren: Props = {}) {
    this.id = makeUUID();

    const { children, props } = this._getChildren(propsAndChildren);
    this.children = this._makePropsProxy(children);
    this.props = this._makePropsProxy({ ...props, id: this.id });

    this.eventBus = new EventBus();
    this._registerEvents();
    this.eventBus.emit(Block.EVENTS.INIT);
  }

  render(): Element {
    return this._element;
  }

  getContent() {
    return this._element;
  }

  componentDidMount(): void {}

  componentDidUpdate(): void {}

  componentWillUnmount(): void { }

  dispatchComponentDidMount() {
    this.eventBus.emit(Block.EVENTS.FLOW_CDM);
  }

  private _getChildren(propsAndChildren: Record<string, {}>): {
    children: Record<string, Block | Block[]>;
    props: {};
  } {
    const children: Record<string, Block | Block[]> = {};
    const props: Record<string, {}> = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block || isArray(value)) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { children, props };
  }

  private _init() {
    this.dispatchComponentDidMount();
  }

  private _unmountComponent(): void {
    this.componentWillUnmount();
    this._removeEvents();
    this._element.remove();
  }

  private _componentDidMount() {
    this.componentDidMount();
    Object.values(this.children).forEach((child) => {
      if (Array.isArray(child)) {
        child.forEach((innerChild: Children) => {
          if (innerChild.dispatchComponentDidMount) innerChild.dispatchComponentDidMount();
        });
      } else {
        child.dispatchComponentDidMount();
      }
    });
    this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
  }

  componentWillUpdate(oldProps: Props, newProps: Props) {
    return !isEqual(newProps, oldProps);
  }

  private _componentDidUpdate(oldProps: Props, newProps: Props) {
    if (this.componentWillUpdate(oldProps, newProps)) {
      this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
      this.componentDidUpdate();
    }
  }

  private _handleEvents = (type: 'add' | 'remove') => () => {
    const { events = {} } = this.props;
    const target = this.eventTarget
      ? this.getContent().querySelector(this.eventTarget)
      : this._element;
    Object.keys(events).forEach((eventName) => {
      if (type === 'add') {
        target?.addEventListener(eventName, events[eventName]);
      } else {
        target?.addEventListener(eventName, events[eventName]);
      }
    });
  };

  private _removeEvents = this._handleEvents('remove');

  private _addEvents = this._handleEvents('add');

  private _render() {
    const element = this.render();

    if (!this._element) {
      this._element = this._createDocumentElement('div');
    }
    this._removeEvents();
    this._element.replaceWith(element);
    this._element = element;
    this._addEvents();
  }

  private _makePropsProxy = (props: any) => new Proxy(props, {
    get(target: any, prop: string) {
      const value = target[prop];
      return typeof value === 'function' ? value.bind(target) : value;
    },
    set: (target: any, prop: string, value: unknown) => {
      const oldTarget = { ...target };
      // eslint-disable-next-line no-param-reassign
      target[prop] = value;
      this.eventBus.emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
      return true;
    },
    deleteProperty() {
      throw new Error('Нет доступа');
    },
  });

  private _createDocumentElement(tagName: string) {
    return document.createElement(tagName);
  }

  protected compile(template: string, props?: any) {
    const propsAndStubs = { ...props };
    Object.entries(this.children).forEach(([key, child]) => {
      if (Array.isArray(child)) {
        child.forEach((innerChild: Children) => {
          if (!propsAndStubs[key]) {
            propsAndStubs[key] = [];
          }
          propsAndStubs[key].push(
            `<div data-id="${innerChild.id}"></div>`,
          );
        });
      } else {
        propsAndStubs[key] = `<div data-id="${child.id}"></div>`;
      }
    });

    const fragment = this._createDocumentElement('template') as HTMLTemplateElement;
    fragment.innerHTML = templateWithProps(template, propsAndStubs);

    Object.values(this.children).forEach((child) => {
      if (Array.isArray(child)) {
        child.forEach((innerChild: Children) => {
          const stub = fragment.content.querySelector(`[data-id="${innerChild.id}"]`);
          (stub as HTMLElement).replaceWith(
            innerChild.getContent ? innerChild.getContent() : innerChild,
          );
        });
      } else {
        const stub = fragment.content.querySelector(`[data-id="${child.id}"]`);
        stub?.replaceWith(child._element);
      }
    });
    return fragment.content.children[0];
  }

  protected setProps = (nextProps: {}) => {
    if (!nextProps) {
      return;
    }
    const { children, props } = this._getChildren(nextProps);

    if (Object.values(children).length) {
      Object.assign(this.children, children);
    }

    if (Object.values(props).length) {
      Object.assign(this.props, props);
    }
  };
}
