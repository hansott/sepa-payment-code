# SEPA Payment Code

[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Travis](https://img.shields.io/travis/hansott/sepa-payment-code.svg)](https://travis-ci.org/hansott/sepa-payment-code)
[![Coveralls](https://img.shields.io/coveralls/hansott/sepa-payment-code.svg)](https://coveralls.io/github/hansott/sepa-payment-code)
[![Dev Dependencies](https://david-dm.org/hansott/sepa-payment-code/dev-status.svg)](https://david-dm.org/hansott/sepa-payment-code?type=dev)
[![Donate](https://img.shields.io/badge/donate-paypal-blue.svg)](https://paypal.me/hansott/5)

Do you want to make it easier for your clients to pay your invoices? This library generates a payment code for embedding in a QR code. The QR code will be scannable by many mobile banking apps (SEPA/Europe). It's based on the [European Payments Council's standard](http://www.europeanpaymentscouncil.eu/index.cfm/knowledge-bank/epc-documents/quick-response-code-guidelines-to-enable-data-capture-for-the-initiation-of-a-sepa-credit-transfer/epc069-12-quick-response-code-guidelines-to-enable-data-capture-for-the-initiation-of-a-sepa-credit-transfer1/).

What are the advantages of using this package over [sepa-qr](https://github.com/smhg/sepa-qr-js)?

* Written in TypeScript
* 100% test coverage
* Allows you to pick your own QR library! [Do you use React?](https://github.com/zpao/qrcode.react) [Do you prefer artistic QR codes?](https://github.com/kciter/qart.js) 
* Extensive documentation

### Usage

```bash
npm install sepa-payment-code --save
# or
yarn add sepa-payment-code --save
```

## Using [qrcode.react](https://github.com/zpao/qrcode.react) (`npm install qrcode.react --save`)

```jsx harmony
import { PaymentCode } from "sepa-payment-code";

const YourComponent = () => {
  const paymentCode = new PaymentCode("Your name", "BE71096123456769", 10.1);
  
  return <QRCode value={paymentCode.getPayload()} />;
};
```

## Using [qrcode](https://github.com/soldair/node-qrcode) (`npm install qrcode --save`)

```js
import { PaymentCode } from "sepa-payment-code";

const paymentCode = new PaymentCode("Your name", "BE71096123456769", 10.1);
QRCode.toCanvas(canvas, paymentCode.getPayload());
```

## Add structured text (reference)

```js
new PaymentCode("Your name", "BE71096123456769", 10.1, "123456789");
```

## Add unstructured text

```js
new PaymentCode("Your name", "BE71096123456769", 10.1, undefined, "Invoice 2018001");
```

### What does a payload look like?

```js
const paymentCode = new PaymentCode("Name", "BE71096123456769", 10.1, undefined, "Invoice 2018001");
console.log(paymentCode.getPayload());
```

```
BCD
002
1
SCT

Name
BE71096123456769
EUR10.1


Invoice 2018001

```

You can copy this into an QR code generator then try scanning it with your banking app.
