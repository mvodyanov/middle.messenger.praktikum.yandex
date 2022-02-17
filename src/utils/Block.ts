import { isEqual } from '.';
import { Props, Children } from '../types/types';
import EventBus from './EventBus';
import templateWithProps from './templateWithProps';

// weird git test error: @parcel/packager-js:
// External modules are not supported when building for browser
// when import { v4 as makeUUID } from 'uuid';
const makeUUID = () => Math.random().toString();
export default abstract class Block {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_RENDER: 'flow:render',
    FLOW_CDU: 'flow:component-did-update',
  };

  private _registerEvents() {
    this.eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
    this.eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    this.eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    this.eventBus.on(
      Block.EVENTS.FLOW_CDU,
      this._componentDidUpdate.bind(this),
    );
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
    this.children = children;
    this.props = this._makePropsProxy({ ...props, id: this.id });

    this.eventBus = new EventBus();
    this._registerEvents();
    this.eventBus.emit(Block.EVENTS.INIT);
  }

  render(): Element {
    return this._element;
  }

  componentDidMount(): void {}

  componentDidUpdate(): void {}

  dispatchComponentDidMount() {
    this.eventBus.emit(Block.EVENTS.FLOW_CDM);
  }

  private _getChildren(propsAndChildren: Record<string, {}>): {
    children: Record<string, Block>;
    props: {};
  } {
    const children: Record<string, Block> = {};
    const props: Record<string, {}> = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
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

  private _componentDidMount() {
    this.componentDidMount();
    Object.values(this.children).forEach((child) => {
      child.dispatchComponentDidMount();
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
      propsAndStubs[key] = `<div data-id="${(child as Block).id}"></div>`;
    });

    const fragment = this._createDocumentElement('template') as HTMLTemplateElement;
    fragment.innerHTML = templateWithProps(template, propsAndStubs);

    Object.values(this.children).forEach((child) => {
      const stub = fragment.content.querySelector(`[data-id="${child.id}"]`);
      stub?.replaceWith(child._element);
    });
    return fragment.content.children[0];
  }

  protected getContent() {
    return this._element;
  }

  protected setProps = (nextProps: {}) => {
    if (!nextProps) {
      return;
    }
    Object.assign(this.props, nextProps);
  };
}
