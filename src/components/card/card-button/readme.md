The `sbb-card-button` is the component used to turn a `sbb-card` into a button.

```html
<sbb-card-button type="submit" form="buy" value="trip">Buy this trip!</sbb-card-button>
```

## Button properties

The component is internally rendered as a button,
accepting its associated properties (`type`, `name`, `value` and `form`).

## Accessibility

It's **important** that a descriptive message is being slotted into the unnamed slot of `sbb-card-button`
as it is used for search engines and screen-reader users.

```html
<sbb-card-button>Buy a half-fare ticket now</sbb-card-button>
```

<!-- Auto Generated Below -->

## Properties

| Name     | Attribute | Privacy | Type                      | Default | Description                                      |
| -------- | --------- | ------- | ------------------------- | ------- | ------------------------------------------------ |
| `active` | `active`  | public  | `boolean`                 | `false` | Whether the card is active.                      |
| `type`   | `type`    | public  | `ButtonType \| undefined` |         | The type attribute to use for the button.        |
| `name`   | `name`    | public  | `string \| undefined`     |         | The name attribute to use for the button.        |
| `value`  | `value`   | public  | `string \| undefined`     |         | The value attribute to use for the button.       |
| `form`   | `form`    | public  | `string \| undefined`     |         | The <form> element to associate the button with. |

## Slots

| Name | Description                                                                                                                      |
| ---- | -------------------------------------------------------------------------------------------------------------------------------- |
|      | Use the unnamed slot to add a descriptive label / title of the button (important!). This is relevant for SEO and screen readers. |