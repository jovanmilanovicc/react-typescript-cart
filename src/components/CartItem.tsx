import { Stack, Button } from "react-bootstrap";
import { useShoppingCart } from "../context/cart-context";
import storeItems from "../data/items.json";
import { formatPrice } from "../utilities/format-price";

type CartItemProps = {
  id: number;
  quantity: number;
};

function CartItem({ id, quantity }: CartItemProps) {
  const { removeFromCart } = useShoppingCart();
  const item = storeItems.find((i) => i.id === id);
  if (item == null) return null;

  return (
    <Stack gap={2} direction="horizontal" className="d-flex align-items-center">
      <img
        src={item.imgUrl}
        style={{ width: "125px", height: "75px", objectFit: "cover" }}
      />
      <div className="me-auto">
        <div>
          {item.name}{" "}
          {quantity > 1 && (
            <span className="text-muted" style={{ fontSize: "0.65rem" }}>
              x{quantity}
            </span>
          )}
        </div>
      </div>
      <div className="text-muted" style={{ fontSize: ".75rem" }}>
        {formatPrice(item.price)}
      </div>

      <div>{formatPrice(item.price * quantity)}</div>
      <Button variant="outline-danger" size="sm" onClick={() => removeFromCart(item.id)}>&times;</Button>
    </Stack>
  );
}

export default CartItem;
