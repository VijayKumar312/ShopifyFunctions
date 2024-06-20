import {
  Banner,
  useApi,
  useTranslate,
  reactExtension,
  useShippingAddress,
  useAttributeValues,
  useApplyAttributeChange,
} from '@shopify/ui-extensions-react/checkout';
import { useEffect } from 'react';

export default reactExtension('purchase.checkout.block.render', () => <Extension />);

function Extension() {
  const pincode = 'user_pincode';
  const translate = useTranslate();
  const { extension } = useApi();
  const address = useShippingAddress();
  const current_attribute = useAttributeValues([pincode]);
  const updateAttribute = useApplyAttributeChange();
  console.log(current_attribute[0], 'attribiute');
  console.log(address.zip, 'zipcode');

  useEffect(() => {
    if (address.zip && address.zip.length >= 5) {
      function updateAttributeFn(attribute, value) {
        updateAttribute({
          key: attribute,
          type: 'updateAttribute',
          value: value,
        });
      }
      updateAttributeFn(pincode, address.zip);
    }
  }, [updateAttribute, address.zip]);
  console.log('current attribute', current_attribute[0]);

  return (
    <Banner title="attribute-change">{translate('welcome', { target: extension.target })}</Banner>
  );
}
