// @ts-check
import { DiscountApplicationStrategy } from '../generated/api';

/**
 * @typedef {import("../generated/api").RunInput} RunInput
 * @typedef {import("../generated/api").FunctionRunResult} FunctionRunResult
 */

/**
 * @type {FunctionRunResult}
 */
const EMPTY_DISCOUNT = {
  discountApplicationStrategy: DiscountApplicationStrategy.First,
  discounts: [],
};

/**
 * @param {RunInput} input
 * @returns {FunctionRunResult}
 */
var discount;

export function run(input) {
  // fetch the data from the input on the cart
  const check_attribute = input.cart.attribute?.value;
  // fetch data from the query of the graphQL
  const pincodes = JSON.parse(input.shop.metafield.value).pincodes;
  // serach for the key
  const findPincodeByKey = (key) => {
    return pincodes.find((pincode) => pincode.key === key);
  };

  if (check_attribute) {
    // function call to find the pin entered into cart input
    const pincodeObject = findPincodeByKey(check_attribute);

    if (pincodeObject) {
      discount = pincodeObject.value;
      return {
        discountApplicationStrategy: DiscountApplicationStrategy.First,
        discounts: [
          {
            message: `${discount}% off on selecting your pincode`,
            value: {
              percentage: {
                value: discount,
              },
            },
            targets: [
              {
                orderSubtotal: {
                  excludedVariantIds: [],
                },
              },
            ],
          },
        ],
      };
    }
  } else {
    return EMPTY_DISCOUNT;
  }
}
