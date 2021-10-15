/**
 * @jest-environment jsdom
 */

import counter from '../src/homepage/counter';

describe('counter function', () => {
  document.body.innerHTML = `<div class="row row-cols-1 row-cols-md-3 g-4 cards-container m-4">
                                  <<div class='card card-drink h-100' id =>
                                  <img class='card-img-top p-3' alt='...'>
                                  <div class='card-body'>
                                    <h5 class='card-title'></h5>
                                    <div class='card-text container'>
                                      <button type='button' class='btn comments btn-outline-dark float-start'>Comments</button>
                                        <div class='heart-container container'>                         
                                        <div class='heart-like-button float-end'></div>  
                                        </div>
                                    </div>   
                                  
                                  </div>
                              </div>
                                  </div>
                             </div>`;

  const result = counter();

  test('Retrieve the correct number', () => {
    expect(result).toBe(1);
  });

  test('Result to be definied', () => {
    expect(result).toBeDefined();
  });

  test('Not to be the wrong number', () => {
    expect(result).not.toBe(5);
  });

  test('Counter function not to be False', () => {
    expect(result).not.toBeFalsy();
  });
});
