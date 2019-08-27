import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import {
  Address,
  CheckoutDeliveryService,
  CheckoutDetails,
  CheckoutPaymentService,
  DeliveryMode,
  PaymentDetails,
  UserAddressService,
  UserPaymentService,
} from '@spartacus/core';

import { ExpressCheckoutService } from './express-checkout.service';

import {
  CheckoutConfigService,
  CheckoutDetailsService,
} from '@spartacus/storefront';

const mockDetails: CheckoutDetails = {
  deliveryAddress: {
    firstName: 'firstName',
  },
  deliveryMode: { code: 'testMode' },
  paymentInfo: { accountHolderName: 'name' },
};

const mockAddresses = new BehaviorSubject([mockDetails.deliveryAddress]);
const mockGetAddressesLoadedSuccess = new BehaviorSubject(true);

class MockUserAddressService implements Partial<UserAddressService> {
  getAddresses(): Observable<Address[]> {
    return mockAddresses.asObservable();
  }
  loadAddresses() {}
  getAddressesLoadedSuccess(): Observable<boolean> {
    return mockGetAddressesLoadedSuccess.asObservable();
  }
}

const mockPaymentMethods = new BehaviorSubject([mockDetails.paymentInfo]);
const mockGetPaymentMethodsLoadedSuccess = new BehaviorSubject(true);

class MockUserPaymentService implements Partial<UserPaymentService> {
  getPaymentMethods(): Observable<PaymentDetails[]> {
    return mockPaymentMethods.asObservable();
  }
  getPaymentMethodsLoadedSuccess(): Observable<boolean> {
    return mockGetPaymentMethodsLoadedSuccess.asObservable();
  }
  loadPaymentMethods() {}
}

const mockDeliveryAddress = new BehaviorSubject(mockDetails.deliveryAddress);
const mockSelectedDeliveryModeCode = new BehaviorSubject(
  mockDetails.deliveryMode.code
);
const mockPaymentDetails = new BehaviorSubject(mockDetails.paymentInfo);

class MockCheckoutDetailsService implements Partial<CheckoutDetailsService> {
  getDeliveryAddress(): Observable<Address> {
    return mockDeliveryAddress.asObservable();
  }
  getSelectedDeliveryModeCode(): Observable<string> {
    return mockSelectedDeliveryModeCode.asObservable();
  }
  getPaymentDetails(): Observable<PaymentDetails> {
    return mockPaymentDetails.asObservable();
  }
}

const mockSupportedDeliveryModes = new BehaviorSubject([
  mockDetails.deliveryMode,
]);
const mockSetDeliveryAddressResultSuccess = new BehaviorSubject(true);
const mockSetDeliveryAddressResultError = new BehaviorSubject(false);
const mockSetDeliveryAddressResultLoading = new BehaviorSubject(false);
const mockSetDeliveryModeResultSuccess = new BehaviorSubject(true);
const mockSetDeliveryModeResultError = new BehaviorSubject(false);
const mockSetDeliveryModeResultLoading = new BehaviorSubject(false);

class MockCheckoutDeliveryService implements Partial<CheckoutDeliveryService> {
  setDeliveryAddress() {}
  resetSetDeliveryAddressProcess() {}
  resetSetDeliveryModeProcess() {}
  getSupportedDeliveryModes(): Observable<DeliveryMode[]> {
    return mockSupportedDeliveryModes.asObservable();
  }

  getSetDeliveryAddressResultSuccess(): Observable<boolean> {
    return mockSetDeliveryAddressResultSuccess.asObservable();
  }
  getSetDeliveryAddressResultError(): Observable<boolean> {
    return mockSetDeliveryAddressResultError.asObservable();
  }
  getSetDeliveryAddressResultLoading(): Observable<boolean> {
    return mockSetDeliveryAddressResultLoading.asObservable();
  }

  getSetDeliveryModeResultSuccess(): Observable<boolean> {
    return mockSetDeliveryModeResultSuccess.asObservable();
  }
  getSetDeliveryModeResultError(): Observable<boolean> {
    return mockSetDeliveryModeResultError.asObservable();
  }
  getSetDeliveryModeResultLoading(): Observable<boolean> {
    return mockSetDeliveryModeResultLoading.asObservable();
  }
}

const mockSetPaymentDetailsResultSuccess = new BehaviorSubject(true);
const mockSetPaymentDetailsResultError = new BehaviorSubject(false);
const mockSetPaymentDetailsResultLoading = new BehaviorSubject(false);
class MockCheckoutPaymentService implements Partial<CheckoutPaymentService> {
  resetSetPaymentDetailsProcess() {}
  getSetPaymentDetailsResultSuccess(): Observable<boolean> {
    return mockSetPaymentDetailsResultSuccess.asObservable();
  }
  getSetPaymentDetailsResultError(): Observable<boolean> {
    return mockSetPaymentDetailsResultError.asObservable();
  }
  getSetPaymentDetailsResultLoading(): Observable<boolean> {
    return mockSetPaymentDetailsResultLoading.asObservable();
  }
  setPaymentDetails() {}
}

class MockCheckoutConfigService implements Partial<CheckoutConfigService> {
  getPreferredDeliveryMode(): string {
    return mockDetails.deliveryMode.code;
  }
}

describe('ExpressCheckoutService', () => {
  let subscription: Subscription;
  let service: ExpressCheckoutService;
  let userAddressService;
  let userPaymentService;
  let checkoutDeliveryService;
  let checkoutPaymentService;
  // let checkoutDetailsService;
  // let checkoutConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ExpressCheckoutService,
        {
          provide: UserAddressService,
          useClass: MockUserAddressService,
        },
        {
          provide: UserPaymentService,
          useClass: MockUserPaymentService,
        },
        {
          provide: CheckoutDeliveryService,
          useClass: MockCheckoutDeliveryService,
        },
        {
          provide: CheckoutPaymentService,
          useClass: MockCheckoutPaymentService,
        },
        {
          provide: CheckoutDetailsService,
          useClass: MockCheckoutDetailsService,
        },
        {
          provide: CheckoutConfigService,
          useClass: MockCheckoutConfigService,
        },
      ],
    });
    if (subscription) {
      subscription.unsubscribe();
    }

    mockAddresses.next([mockDetails.deliveryAddress]);
    mockGetAddressesLoadedSuccess.next(true);
    mockPaymentMethods.next([mockDetails.paymentInfo]);
    mockGetPaymentMethodsLoadedSuccess.next(true);
    mockDeliveryAddress.next(mockDetails.deliveryAddress);
    mockSelectedDeliveryModeCode.next(mockDetails.deliveryMode.code);
    mockPaymentDetails.next(mockDetails.paymentInfo);
    mockSupportedDeliveryModes.next([mockDetails.deliveryMode]);
    mockSetDeliveryAddressResultSuccess.next(true);
    mockSetDeliveryAddressResultError.next(false);
    mockSetDeliveryAddressResultLoading.next(false);
    mockSetDeliveryModeResultSuccess.next(true);
    mockSetDeliveryModeResultError.next(false);
    mockSetDeliveryModeResultLoading.next(false);
    mockSetPaymentDetailsResultSuccess.next(true);
    mockSetPaymentDetailsResultError.next(false);
    mockSetPaymentDetailsResultLoading.next(false);

    service = TestBed.get(ExpressCheckoutService as Type<
      ExpressCheckoutService
    >);
    userAddressService = TestBed.get(UserAddressService as Type<
      UserAddressService
    >);
    userPaymentService = TestBed.get(UserPaymentService as Type<
      UserPaymentService
    >);
    checkoutDeliveryService = TestBed.get(CheckoutDeliveryService as Type<
      CheckoutDeliveryService
    >);
    checkoutPaymentService = TestBed.get(CheckoutPaymentService as Type<
      CheckoutPaymentService
    >);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('trySetDefaultCheckoutDetails', () => {
    it('should return true if express checkout is possible', done => {
      subscription = service.trySetDefaultCheckoutDetails().subscribe(data => {
        expect(data).toBeTruthy();
        done();
      });
    });

    describe('shippingAddressSet$', () => {
      it('should load addresses if they are not loaded', done => {
        mockGetAddressesLoadedSuccess.next(false);
        spyOn(userAddressService, 'loadAddresses').and.callFake(() =>
          mockGetAddressesLoadedSuccess.next(true)
        );
        subscription = service
          .trySetDefaultCheckoutDetails()
          .subscribe(data => {
            expect(userAddressService.loadAddresses).toHaveBeenCalled();
            expect(data).toBeTruthy();
            done();
          });
      });

      it('should set delivery address if it has been not loaded yet', done => {
        mockSetDeliveryAddressResultSuccess.next(false);
        spyOn(checkoutDeliveryService, 'setDeliveryAddress').and.callFake(() =>
          mockSetDeliveryAddressResultSuccess.next(true)
        );
        subscription = service
          .trySetDefaultCheckoutDetails()
          .subscribe(data => {
            expect(
              checkoutDeliveryService.setDeliveryAddress
            ).toHaveBeenCalled();
            expect(data).toBeTruthy();
            done();
          });
      });

      it('should return false if set delivery address error', done => {
        mockSetDeliveryAddressResultSuccess.next(false);
        spyOn(checkoutDeliveryService, 'setDeliveryAddress').and.callFake(() =>
          mockSetDeliveryAddressResultError.next(true)
        );
        subscription = service
          .trySetDefaultCheckoutDetails()
          .subscribe(data => {
            expect(data).toBeFalsy();
            done();
          });
      });

      it('should return false if there are no addresses', done => {
        mockAddresses.next([]);
        subscription = service
          .trySetDefaultCheckoutDetails()
          .subscribe(data => {
            expect(data).toBeFalsy();
            done();
          });
      });
    });

    describe('paymentMethodSet$', () => {
      it('should load payment methods if they are not loaded', done => {
        mockGetPaymentMethodsLoadedSuccess.next(false);
        spyOn(userPaymentService, 'loadPaymentMethods').and.callFake(() =>
          mockGetPaymentMethodsLoadedSuccess.next(true)
        );
        subscription = service
          .trySetDefaultCheckoutDetails()
          .subscribe(data => {
            expect(userPaymentService.loadPaymentMethods).toHaveBeenCalled();
            expect(data).toBeTruthy();
            done();
          });
      });

      it('should set payment method if it has been not loaded yet', done => {
        mockSetPaymentDetailsResultSuccess.next(false);
        spyOn(checkoutPaymentService, 'setPaymentDetails').and.callFake(() =>
          mockSetPaymentDetailsResultSuccess.next(true)
        );
        subscription = service
          .trySetDefaultCheckoutDetails()
          .subscribe(data => {
            expect(checkoutPaymentService.setPaymentDetails).toHaveBeenCalled();
            expect(data).toBeTruthy();
            done();
          });
      });

      it('should return false if set payment method error', done => {
        mockSetPaymentDetailsResultSuccess.next(false);
        spyOn(checkoutPaymentService, 'setPaymentDetails').and.callFake(() =>
          mockSetPaymentDetailsResultError.next(true)
        );
        subscription = service
          .trySetDefaultCheckoutDetails()
          .subscribe(data => {
            expect(data).toBeFalsy();
            done();
          });
      });

      it('should return false if there are no payment methods', done => {
        mockPaymentMethods.next([]);
        subscription = service
          .trySetDefaultCheckoutDetails()
          .subscribe(data => {
            expect(data).toBeFalsy();
            done();
          });
      });
    });
  });
});
