import Image from "next/future/image";
import { Product } from "../../models/product";
import { styled } from "../../styles";
import { useCart } from "../../hooks/useCart";

const Wrapper = styled("div", {
  display: "flex",

  img: {
    background: "linear-gradient(180deg, #1EA483 0%, #7465D4 100%)",
    borderRadius: "8px",
  },
});

const InfosWrapper = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  padding: "4px 8px",
  fontSize: "18px",
  h3: {
    color: "$gray300",
  },

  p: {
    color: "$gray100",
    span: {
      marginLeft: "8px",
      color: "$gray500",
    },
  },

  button: {
    width: "fit-content",
    border: "none",
    background: "transparent",
    fontSize: "16px",
    fontWeight: "bold",
    color: "$green500",
    cursor: "pointer",
  },
});

interface ProductListedProps {
  product: Product;
  quantity: number;
}

export function ProductListed({ product, quantity }: ProductListedProps) {
  const { removeProductFromCart } = useCart();

  return (
    <Wrapper>
      <Image src={product.imageUrl} alt="bag icon" width={100} height={100} />
      <InfosWrapper>
        <p>{product.name}</p>
        <p>
          {product.price} <span>{quantity} und</span>
        </p>
        <button onClick={() => removeProductFromCart(product.id)}>
          Remover
        </button>
      </InfosWrapper>
    </Wrapper>
  );
}
