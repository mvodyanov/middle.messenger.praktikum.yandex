/* eslint-disable max-classes-per-file */
import { set } from '.';
import { Block, PlainObject, Props } from '../types/types';
import EventBus from './EventBus';

enum StoreEvents {
  Updated = 'Updated',
}

type TInitialState = {
  auth: {
    user: null | PlainObject
  },
  error: string
};

const initialState: TInitialState = {
  auth: {
    user: null,
  },
  error: '',
};

class Store extends EventBus {
  private _state = initialState;

  public getState() {
    return this._state;
  }

  public set(path: string, value: unknown) {
    set(this._state, path, value);
    this.emit(StoreEvents.Updated);
  }
}

const store = new Store();

export function connect(
  Component: new (props: Props) => Block,
  mapStateToProps: (state: typeof initialState
  ) => PlainObject,
) {
  return class extends Component {
    constructor(props?: Props) {
      super({ ...props, ...mapStateToProps(store.getState()) });

      store.on(StoreEvents.Updated, () => {
        this.setProps({ ...mapStateToProps(store.getState()) });
      });
    }
  };
}

export default store;
