import { EntityState } from '../entity/entity-state';
import { LoaderState } from '../loader/loader-state';

export interface ScopedLoaderState<T> {
  [scope: string]: LoaderState<T>;
}

export type EntityScopedLoaderState<T> = EntityState<
  | ScopedLoaderState<T>
  /** TODO: deprecated since 1.4, remove, issue #5445 */
  | LoaderState<T>
>;
