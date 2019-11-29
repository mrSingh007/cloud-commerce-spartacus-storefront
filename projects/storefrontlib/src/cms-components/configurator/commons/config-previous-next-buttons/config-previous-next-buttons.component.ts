import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import {
  Configurator,
  ConfiguratorCommonsService,
  ConfiguratorGroupsService,
  RoutingService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { ConfigRouterExtractorService } from '../service/config-router-extractor.service';

@Component({
  selector: 'cx-config-previous-next-buttons',
  templateUrl: './config-previous-next-buttons.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigPreviousNextButtonsComponent implements OnInit {
  configuration$: Observable<Configurator.Configuration>;

  constructor(
    private routingService: RoutingService,
    private configuratorGroupsService: ConfiguratorGroupsService,
    private configuratorCommonsService: ConfiguratorCommonsService,
    private configRouterExtractorService: ConfigRouterExtractorService
  ) {}

  @Output() nextGroup = new EventEmitter();
  @Output() previousGroup = new EventEmitter();

  ngOnInit(): void {
    this.configuration$ = this.configRouterExtractorService
      .extractConfigurationOwner(this.routingService)
      .pipe(
        switchMap(owner =>
          this.configuratorCommonsService.getConfiguration(owner.key)
        )
      );
  }

  onPrevious(configId: string, ownerKey: string) {
    this.navigateToPreviousGroup(configId, ownerKey);
  }
  onNext(configId: string, ownerKey: string) {
    this.navigateToNextGroup(configId, ownerKey);
  }

  navigateToNextGroup(configId: string, ownerKey: string) {
    this.configuratorGroupsService
      .getNextGroup(ownerKey)
      .pipe(take(1))
      .subscribe(groupId =>
        this.configuratorGroupsService.navigateToGroup(
          configId,
          ownerKey,
          groupId
        )
      );
  }

  navigateToPreviousGroup(configId: string, ownerKey: string) {
    this.configuratorGroupsService
      .getPreviousGroup(ownerKey)
      .pipe(take(1))
      .subscribe(groupId =>
        this.configuratorGroupsService.navigateToGroup(
          configId,
          ownerKey,
          groupId
        )
      );
  }

  isFirstGroup(ownerKey: string): Observable<Boolean> {
    return this.configuratorGroupsService
      .getPreviousGroup(ownerKey)
      .pipe(map(group => !group));
  }

  isLastGroup(ownerKey: string): Observable<Boolean> {
    return this.configuratorGroupsService
      .getNextGroup(ownerKey)
      .pipe(map(group => !group));
  }
}
