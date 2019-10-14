import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import {
  CmsConfig,
  ConfigModule,
  I18nModule,
  UrlModule,
  UserService,
} from '@spartacus/core';
import { IconModule } from '../../../cms-components/misc/icon/index';
import { CmsPageGuard } from '../../../cms-structure/guards/cms-page.guard';
import { PageLayoutComponent } from '../../../cms-structure/page/index';
import { ConfigAttributeFooterComponent } from '../commons/config-attribute-footer/config-attribute-footer.component';
import { ConfigAttributeHeaderComponent } from '../commons/config-attribute-header/config-attribute-header.component';
import { ConfigAttributeDropDownComponent } from '../commons/config-attribute-types/config-attribute-drop-down/config-attribute-drop-down.component';
import { ConfigAttributeRadioButtonComponent } from '../commons/config-attribute-types/config-attribute-radio-button/config-attribute-radio-button.component';
import { ConfigFormComponent } from '../commons/config-form/config-form.component';
import { ConfigImageComponent } from '../commons/config-image/config-image.component';
import { ConfigTitleComponent } from '../commons/config-title/config-title.component';
import { ConfigureProductModule } from '../commons/configure-product/configure-product.module';

@NgModule({
  imports: [
    CommonModule,
    ConfigureProductModule,
    RouterModule.forChild([
      {
        path: 'configureCPQCONFIGURATOR/:rootProduct',
        data: { pageLabel: '/configureCPQCONFIGURATOR' },
        component: PageLayoutComponent,
        canActivate: [CmsPageGuard],
      },
    ]),
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        VariantConfigurationForm: {
          component: ConfigFormComponent,
          guards: [],
        },
        VariantConfigurationTitleSummary: {
          component: ConfigTitleComponent,
          guards: [],
        },
        VariantConfigurationImage: {
          component: ConfigImageComponent,
          guards: [],
        },
      },
      layoutSlots: {
        VariantConfigurationTemplate: {
          slots: [
            'VariantConfigTitle',
            'VariantConfigHeader',
            'VariantConfigContent',
          ],
        },
      },
    }),

    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    UrlModule,
    I18nModule,
    IconModule,
  ],

  declarations: [
    ConfigFormComponent,
    ConfigTitleComponent,
    ConfigImageComponent,
    ConfigAttributeRadioButtonComponent,
    ConfigAttributeDropDownComponent,
    ConfigAttributeHeaderComponent,
    ConfigAttributeFooterComponent,
  ],
  exports: [
    ConfigFormComponent,
    ConfigTitleComponent,
    ConfigImageComponent,
    ConfigAttributeRadioButtonComponent,
    ConfigAttributeDropDownComponent,
    ConfigAttributeHeaderComponent,
    ConfigAttributeFooterComponent,
  ],
  providers: [UserService],
  entryComponents: [
    ConfigFormComponent,
    ConfigTitleComponent,
    ConfigImageComponent,
    ConfigAttributeRadioButtonComponent,
    ConfigAttributeDropDownComponent,
    ConfigAttributeHeaderComponent,
    ConfigAttributeFooterComponent,
  ],
})
export class VariantConfiguratorModule {}