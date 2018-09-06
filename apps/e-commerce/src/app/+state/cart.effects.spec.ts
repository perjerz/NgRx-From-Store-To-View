
import { ErrorAPI, ExampleAction, ItemsListed, ListItems } from './cart.actions';
import { CartEffects } from './cart.effects';
import { of, throwError, zip } from 'rxjs';
import { Actions } from '@ngrx/effects';
import { cold } from 'jasmine-marbles';
import { concat } from 'rxjs/operators';

describe('CartEffects', () => {
  describe('ExampleActions$', () => {
    it('should dispatch ItemListed', () => {
      const source = cold('a|', { a: new ExampleAction()});
      const httpClientMock = jasmine.createSpyObj('', ['get']);
      const effects = new CartEffects(httpClientMock, null,  new Actions(source), null);
      const expected = cold('a|', {a: new ItemsListed({})});
      expect(effects.exampleAction$).toBeObservable(expected)
    })
  });
  describe('listItem$', () => {
    it('should switchMap to ItemsListed if success', () => {
      const source = cold('a', { a: new ListItems()});
      const http = jasmine.createSpyObj('http', ['get']);
      const response = of({});
      http.get.and.returnValue(response);
      const effects = new CartEffects(http, null,  new Actions(source), null);
      const expected = cold('a', {a: new ItemsListed({})});
      expect(effects.listItems$).toBeObservable(expected)
    })
  });
  describe('listItem$', () => {
    it('should return error if fail', () => {
      const source = cold('a', { a: new ListItems()});
      const http = jasmine.createSpyObj('http', ['get']);
      const response = throwError('error');
      http.get.and.returnValue(response);
      const effects = new CartEffects(http, null,  new Actions(source), null);
      const expected = cold('a', {a: new ErrorAPI('error')});
      expect(effects.listItems$).toBeObservable(expected)
    })
  });

  describe('marble diagram', () => {
    it('zip', () => {
      const one$ = cold('a');
      const two$ = cold('b');
      const result$ = cold('a', {a: ['a','b']});
      expect(zip(one$, two$)).toBeObservable(result$);
    });
    it('concat', () => {
      const one$ = cold('x-x|');
      const two$ = cold('-y|');

      expect(one$.pipe(concat(two$))).toBeObservable(cold('x-x-y|'));
    });
  });
});
