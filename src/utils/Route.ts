import { Block } from '../types/types';

function isEqual(lhs: string, rhs:string) {
  return lhs === rhs;
}

function render(query: string, block: Block) {
  const root = document.querySelector(query);
  if (root) {
    root.innerHTML = '';
    root.appendChild(block.render());
  }
}

export default class Route {
  private _pathname: string;

  private _blockClass: Block;

  private _block: null | Block;

  private _props: any;

  constructor(pathname: string, view: Block, props: any) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  navigate(pathname: any) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this._block) {
      this._block = null;
    }
  }

  match(pathname: string) {
    return isEqual(pathname, this._pathname);
  }

  render() {
    if (!this._block) {
      this._block = this._blockClass;
      render(this._props.rootQuery, this._block);
    }
  }
}
