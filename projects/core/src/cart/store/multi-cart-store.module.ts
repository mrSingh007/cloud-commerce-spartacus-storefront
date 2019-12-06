import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { StateModule } from '../../state/state.module';
import { MULTI_CART_FEATURE } from './multi-cart-state';
import {
  multiCartMetaReducers,
  multiCartReducerProvider,
  multiCartReducerToken,
} from './reducers/index';
import { ConfigModule } from '../../config/config.module';
import { StateConfig, StorageSyncType } from '../../state/config/state-config';
import { MultiCartEffects } from './effects/multi-cart.effect';

export function multiCartStoreConfigFactory(): StateConfig {
  const config: StateConfig = {
    state: {
      storageSync: {
        keys: {
          [`${MULTI_CART_FEATURE}.active`]: StorageSyncType.LOCAL_STORAGE,
        },
      },
    },
  };
  return config;
}

@NgModule({
  imports: [
    CommonModule,
    StateModule,
    StoreModule.forFeature(MULTI_CART_FEATURE, multiCartReducerToken, {
      metaReducers: multiCartMetaReducers,
    }),
    EffectsModule.forFeature([MultiCartEffects]),
    ConfigModule.withConfigFactory(multiCartStoreConfigFactory),
  ],
  providers: [multiCartReducerProvider],
})
export class MultiCartStoreModule {}
