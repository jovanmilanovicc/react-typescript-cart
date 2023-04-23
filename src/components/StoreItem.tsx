import { Card, Button } from "react-bootstrap";
import { formatPrice } from "../utilities/format-price";
import { useShoppingCart } from "../context/cart-context";

type StoreItemProps = {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
};

function StoreItem({ id, name, price, imgUrl }: StoreItemProps) {
    const { quantity, increaseQuantity, decreaseQuantity, removeFromCart } = useShoppingCart();
  const itemQuantity = quantity(id);
  return (
    <Card className="h-100">
      <Card.Img
        variant="top"
        src={imgUrl}
        height="200px"
        style={{ objectFit: "cover" }}
      />

      <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
          <span className="fs-3">{name}</span>
          <span className="ms-2 text-muted">{formatPrice(price)}</span>
        </Card.Title>
        <div className="mt-auto">
          {itemQuantity === 0 ? (
            <Button onClick={() => increaseQuantity(id)} className="w-100">Add To Cart</Button>
          ) : (
            <div
              className="d-flex align-items-center flex-column"
              style={{ gap: "0.5rem" }}
            >
              <div
                className="d-flex align-items-center justify-content-center"
                style={{ gap: "0.5rem" }}
              >
                <Button onClick={() => decreaseQuantity(id)}>-</Button>
                <div>
                  <span className="fs-3">{itemQuantity}</span> in cart
                </div>
                <Button onClick={() => increaseQuantity(id)}>+</Button>
              </div>
              <Button size="sm" variant="danger" onClick={() => removeFromCart(id)}>Remove</Button>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}

export default StoreItem;
