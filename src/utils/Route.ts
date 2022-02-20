import { Block } from '../types/types';

function isEqual(lhs: string, rhs:string) {
  return lhs === rhs;
}

function render(query: string, block: Block) {
  const root = document.querySelector(query);
  if (root) {
    root.innerHTML = '';
    root.append(block.getContent());
  }
}

type IProps = {
  rootQuery: string,
  access?: () => boolean
};
export default class Route {
  private _pathname: string;

  private _blockClass: Block;

  private _block: null | Block;

  private _props: IProps;

  access: IProps['access'];

  constructor(pathname: string, view: Block, props: IProps) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
    this.access = props.access;
  }

  navigate(pathname: string) {
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
