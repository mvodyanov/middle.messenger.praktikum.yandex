/* eslint-disable max-classes-per-file */
import { set } from '.';
import {
  Block, MessageResponse, PlainObject, Props, UserResponse,
} from '../types/types';
import EventBus from './EventBus';

export enum StoreEvents {
  UPDATED = 'updated',
}

type TInitialState = {
  auth: {
    user: null | UserResponse
  },
  chat: {
    list?: []
    current?: {
      id?: number
      userList: UserResponse[]
      token?: string,
      messageList?: MessageResponse[]
    }
  }
  error: string
};

const initialState: TInitialState = {
  auth: {
    user: null,
  },
  chat: {
  },
  error: '',
};

class Store extends EventBus {
  constructor() {
    super();
    // register event before connect init
    this.on(StoreEvents.UPDATED, () => {});
  }

  private _state = initialState;

  public getState() {
    return this._state;
  }

  public set(path: string, value: unknown) {
    set(this._state, path, value);
    // eslint-disable-next-line no-console
    console.info(this._state);
    this.emit(StoreEvents.UPDATED);
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

      store.on(StoreEvents.UPDATED, () => {
        this.setProps({ ...mapStateToProps(store.getState()) });
      });
    }
  };
}

export default store;
