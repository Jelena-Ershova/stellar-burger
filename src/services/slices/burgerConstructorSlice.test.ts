import {
  initialState,
  addIngredient,
  removeIngredient,
  clearConstructor,
  burgerConstructorReducer
} from './burgerConstructorSlice';

describe('testing burgerConstructorSlice', () => {
  const mockState = {
    ...initialState,
    bun: {
      id: '1',
      _id: '1',
      name: 'example1',
      type: 'bun',
      proteins: 100,
      fat: 100,
      carbohydrates: 100,
      calories: 100,
      price: 100,
      image: 'image',
      image_mobile: 'image_mobile',
      image_large: 'image_large',
      __v: 0
    },
    ingredients: [
      {
        id: '2',
        _id: '2',
        name: 'example2',
        type: 'main',
        proteins: 100,
        fat: 100,
        carbohydrates: 100,
        calories: 100,
        price: 100,
        image: 'image',
        image_mobile: 'image_mobile',
        image_large: 'image_large',
        __v: 0
      },
      {
        id: '3',
        _id: '3',
        name: 'example3',
        type: 'sauce',
        proteins: 100,
        fat: 100,
        carbohydrates: 100,
        calories: 100,
        price: 100,
        image: 'image',
        image_mobile: 'image_mobile',
        image_large: 'image_large',
        __v: 0
      }
    ]
  };

  it('testing the addition of an ingredient to the constructor', () => {
    const newIngredient = {
      id: '4',
      _id: '4',
      name: 'example4',
      type: 'sause',
      proteins: 100,
      fat: 100,
      carbohydrates: 100,
      calories: 100,
      price: 100,
      image: 'image',
      image_mobile: 'image_mobile',
      image_large: 'image_large',
      __v: 0
    };

    const oldLength = mockState.ingredients.length;
    const newState = burgerConstructorReducer(
      mockState,
      addIngredient(newIngredient)
    );
    const addedIngredient =
      newState.ingredients[newState.ingredients.length - 1];

    expect(newState.ingredients.length).toBe(oldLength + 1);
    expect(addedIngredient._id).toEqual(newIngredient._id);
  });

  it('testing the removal of an ingredient from the constructor', () => {
    const oldLength = mockState.ingredients.length;
    const removedIngredient = mockState.ingredients[0];
    const expectedState = {
      ...mockState,
      ingredients: [
        ...mockState.ingredients.filter(
          (ingredient) => ingredient._id !== removedIngredient._id
        )
      ]
    };
    const newState = burgerConstructorReducer(
      mockState,
      removeIngredient(removedIngredient)
    );
    expect(newState.ingredients.length).toBe(oldLength - 1);
    expect(newState).toEqual(expectedState);
  });

  it('testing the cleaning of the constructor', () => {
    const newState = burgerConstructorReducer(mockState, clearConstructor());
    expect(newState).toEqual({ ...initialState });
  });
});
