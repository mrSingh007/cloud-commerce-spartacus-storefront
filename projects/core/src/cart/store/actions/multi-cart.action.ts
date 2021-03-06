import { Action } from '@ngrx/store';
import { Cart } from '../../../model/cart.model';
import {
  EntityFailAction,
  EntityLoadAction,
  EntitySuccessAction,
} from '../../../state/utils/entity-loader/entity-loader.action';
import {
  EntityProcessesDecrementAction,
  EntityProcessesIncrementAction,
  EntityProcessesLoaderResetAction,
} from '../../../state/utils/entity-processes-loader/entity-processes-loader.action';
import { EntityRemoveAction } from '../../../state/utils/entity/entity.action';
import { getCartIdByUserId } from '../../utils/utils';
import { MULTI_CART_FEATURE } from '../multi-cart-state';

export const RESET_FRESH_CART = '[Multi Cart] Reset Fresh Cart';

export const CREATE_MULTI_CART = '[Multi Cart] Create Cart';
export const CREATE_MULTI_CART_FAIL = '[Multi Cart] Create Cart Fail';
export const CREATE_MULTI_CART_SUCCESS = '[Multi Cart] Create Cart Success';

export const LOAD_MULTI_CART = '[Multi Cart] Load Cart';
export const LOAD_MULTI_CART_FAIL = '[Multi Cart] Load Cart Fail';
export const LOAD_MULTI_CART_SUCCESS = '[Multi Cart] Load Cart Success';

export const MERGE_MULTI_CART = '[Multi Cart] Merge Cart';
export const MERGE_MULTI_CART_SUCCESS = '[Multi Cart] Merge Cart Success';

export const RESET_MULTI_CART_DETAILS = '[Multi Cart] Reset Cart Details';

export const SET_FRESH_CART = '[Multi Cart] Set Fresh Cart';

export const REMOVE_CART = '[Multi Cart] Remove Cart';

export const ADD_EMAIL_TO_MULTI_CART = '[Multi Cart] Add Email';
export const ADD_EMAIL_TO_MULTI_CART_FAIL = '[Multi Cart] Add Email Fail';
export const ADD_EMAIL_TO_MULTI_CART_SUCCESS = '[Multi Cart] Add Email Success';

export const SET_ACTIVE_CART_ID = '[Multi Cart] Set Active Cart Id';

export const CART_PROCESSES_INCREMENT = '[Multi Cart] Cart Processes Increment';
export const CART_PROCESSES_DECREMENT = '[Multi Cart] Cart Processes Decrement';

/**
 * To keep track of cart creation process we use cart with `fresh` id.
 * After creating cart we switch to entity with `code` or `guid`.
 * We need `fresh` cart entity for loading/error state.
 */
export const FRESH_CART_ID = 'fresh';

export class ResetFreshCart extends EntityProcessesLoaderResetAction {
  readonly type = RESET_FRESH_CART;
  constructor() {
    super(MULTI_CART_FEATURE, FRESH_CART_ID);
  }
}

export class SetFreshCart extends EntitySuccessAction {
  readonly type = SET_FRESH_CART;
  constructor(public payload: Cart) {
    super(MULTI_CART_FEATURE, FRESH_CART_ID, payload);
  }
}

export class CreateMultiCart extends EntityLoadAction {
  readonly type = CREATE_MULTI_CART;
  constructor(public payload: any) {
    super(MULTI_CART_FEATURE, FRESH_CART_ID);
  }
}

export class CreateMultiCartFail extends EntityFailAction {
  readonly type = CREATE_MULTI_CART_FAIL;
  constructor(public payload: any) {
    super(MULTI_CART_FEATURE, FRESH_CART_ID);
  }
}

export class SetActiveCartId implements Action {
  readonly type = SET_ACTIVE_CART_ID;
  constructor(public payload: string) {}
}

export class CreateMultiCartSuccess extends EntitySuccessAction {
  readonly type = CREATE_MULTI_CART_SUCCESS;
  constructor(public payload: { cart: Cart; userId: string; extraData?: any }) {
    super(MULTI_CART_FEATURE, getCartIdByUserId(payload.cart, payload.userId));
  }
}

export class LoadMultiCart extends EntityLoadAction {
  readonly type = LOAD_MULTI_CART;
  constructor(public payload: { userId: string; cartId: string }) {
    super(MULTI_CART_FEATURE, payload.cartId);
  }
}

export class LoadMultiCartFail extends EntityFailAction {
  readonly type = LOAD_MULTI_CART_FAIL;
  constructor(public payload: { cartId: string; error?: any }) {
    super(MULTI_CART_FEATURE, payload.cartId, payload.error);
  }
}

export class LoadMultiCartSuccess extends EntitySuccessAction {
  readonly type = LOAD_MULTI_CART_SUCCESS;
  constructor(public payload: { cart: Cart; userId: string; extraData?: any }) {
    super(MULTI_CART_FEATURE, getCartIdByUserId(payload.cart, payload.userId));
  }
}

export class MergeMultiCart implements Action {
  readonly type = MERGE_MULTI_CART;
  constructor(public payload: any) {}
}

export class MergeMultiCartSuccess extends EntityRemoveAction {
  readonly type = MERGE_MULTI_CART_SUCCESS;
  constructor(
    public payload: { oldCartId: string; cartId: string; userId: string }
  ) {
    super(MULTI_CART_FEATURE, payload.oldCartId);
  }
}

export class ResetMultiCartDetails extends EntityProcessesLoaderResetAction {
  readonly type = RESET_MULTI_CART_DETAILS;
  constructor() {
    super(MULTI_CART_FEATURE, undefined);
  }
}

export class RemoveCart extends EntityRemoveAction {
  readonly type = REMOVE_CART;
  constructor(public payload: string) {
    super(MULTI_CART_FEATURE, payload);
  }
}

export class AddEmailToMultiCart extends EntityLoadAction {
  readonly type = ADD_EMAIL_TO_MULTI_CART;
  constructor(
    public payload: { userId: string; cartId: string; email: string }
  ) {
    super(MULTI_CART_FEATURE, payload.cartId);
  }
}

export class AddEmailToMultiCartFail extends EntityFailAction {
  readonly type = ADD_EMAIL_TO_MULTI_CART_FAIL;
  constructor(public payload: { userId: string; cartId: string; error: any }) {
    super(MULTI_CART_FEATURE, payload.cartId, payload.error);
  }
}

export class AddEmailToMultiCartSuccess extends EntitySuccessAction {
  readonly type = ADD_EMAIL_TO_MULTI_CART_SUCCESS;
  constructor(public payload: { userId: string; cartId: string }) {
    super(MULTI_CART_FEATURE, payload.cartId);
  }
}

export class CartProcessesIncrement extends EntityProcessesIncrementAction {
  readonly type = CART_PROCESSES_INCREMENT;
  constructor(public payload: string) {
    super(MULTI_CART_FEATURE, payload);
  }
}

export class CartProcessesDecrement extends EntityProcessesDecrementAction {
  readonly type = CART_PROCESSES_DECREMENT;
  constructor(public payload: string) {
    super(MULTI_CART_FEATURE, payload);
  }
}

export type MultiCartActions =
  | ResetFreshCart
  | SetFreshCart
  | SetActiveCartId
  | CreateMultiCart
  | CreateMultiCartFail
  | CreateMultiCartSuccess
  | LoadMultiCart
  | LoadMultiCartFail
  | LoadMultiCartSuccess
  | MergeMultiCart
  | MergeMultiCartSuccess
  | ResetMultiCartDetails
  | RemoveCart
  | AddEmailToMultiCart
  | AddEmailToMultiCartFail
  | AddEmailToMultiCartSuccess
  | CartProcessesIncrement
  | CartProcessesDecrement;
