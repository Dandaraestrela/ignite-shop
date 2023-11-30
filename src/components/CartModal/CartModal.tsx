import { useMemo, useState } from "react";
import axios from "axios";
import Image from "next/future/image";

import { useCart } from "../../hooks/useCart";
import { styled } from "../../styles";
import icX from "../../assets/ic-x.svg";
import { Button } from "../Button";

import { ProductListed } from "./ProductListed";

export const Wrapper = styled("div", {
  display: "flex",
  position: "absolute",
  top: "0",
  right: "0",
  zIndex: "999",
  flexDirection: "column",
  alignItems: "flex-start",
  minHeight: "100vh",
  maxHeight: "100vh",
  minWidth: "480px",
  padding: "30px 20px 30px 24px",
  backgroundColor: "$gray800",
});

const CloseButton = styled("button", {
  marginLeft: "auto",
  border: "none",
  background: "transparent",
  cursor: "pointer",
});

const ProductListWrapper = styled("div", {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  margin: "24px 0",
  gap: "24px",
  overflowY: "auto",
});

const Footer = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  width: "100%",
  marginTop: "auto",
  marginBottom: "12px",
  gap: "12px",
  fontSize: "18px",
  color: "$gray100",
  h3: {
    fontSize: "24px",
    fontWeight: "700",
  },
});

const FooterRow = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
});

interface CartModalProps {
  isOpen: boolean;
  setIsOpen: Function;
}

export function CartModal({ isOpen, setIsOpen }: CartModalProps) {
  const { cart } = useCart();
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false);

  const itensQuantity = useMemo(
    () => cart.reduce((acc, cartItem) => acc + cartItem.quantity, 0),
    [cart]
  );

  const cartTotalPrice = useMemo(
    () =>
      cart.reduce(
        (acc, cartItem) =>
          acc + cartItem.product.priceAsNumber * cartItem.quantity,
        0
      ),
    [cart]
  );

  async function handleBuyButton() {
    try {
      setIsCreatingCheckoutSession(true);
      const response = await axios.post("/api/checkout", {
        productsList: cart,
      });
      const { checkoutUrl } = response.data;
      window.location.href = checkoutUrl;
    } catch (err) {
      setIsCreatingCheckoutSession(false);
      alert("Falha ao redirecionar ao checkout!");
    }
  }

  return isOpen ? (
    <Wrapper>
      <CloseButton onClick={() => setIsOpen(!isOpen)}>
        <Image src={icX} alt="bag icon" />
      </CloseButton>
      <h1>Sacola de compras</h1>
      <ProductListWrapper>
        {cart.map((product) => (
          <ProductListed
            key={product.product.id}
            product={product.product}
            quantity={product.quantity}
          />
        ))}
      </ProductListWrapper>
      <Footer>
        <FooterRow>
          <p>Quantidade de itens</p> <p>{itensQuantity}</p>
        </FooterRow>
        <FooterRow>
          <p>
            <strong>Valor</strong>
          </p>
          <h3>R$ {`${cartTotalPrice.toFixed(2)}`.replace(".", ",")}</h3>
        </FooterRow>
      </Footer>
      <Button
        disabled={isCreatingCheckoutSession}
        onClick={handleBuyButton}
        css={{ width: "100%" }}
      >
        Finalizar compra
      </Button>
    </Wrapper>
  ) : (
    <></>
  );
}
