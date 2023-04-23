import { Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/cart-context";
import CartItem from "./CartItem";
import { formatPrice } from "../utilities/format-price";
import storeItem from "../data/items.json";

type isOpen = {
  isOpen: boolean;
};

function ShoppingCart({ isOpen }: isOpen) {
  const { closeCart, cartItems } = useShoppingCart();
  return (
    <Offcanvas onHide={closeCart} show={isOpen} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cartItems.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}
        
        <div className="ms-auto fw-bold fs-5">
          Total:{" "}
          {formatPrice(
            cartItems.reduce((total, cartItem) => {
              const item = storeItem.find((i) => i.id === cartItem.id);
              return total + (item?.price || 0) * cartItem.quantity;
            }, 0)
          )}
        </div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default ShoppingCart;
