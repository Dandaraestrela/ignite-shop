import Image from "next/future/image";

import { styled } from "../styles";
import logoImg from "../assets/logo.svg";
import icBag from "../assets/ic-bag.svg";
import { useCart } from "../hooks/useCart";
import { useState } from "react";
import { CartModal } from "./CartModal/CartModal";
import Link from "next/link";

export const Wrapper = styled("header", {
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
  maxWidth: 1180,
  padding: "2rem 0",
  margin: "0 auto",
});

export const ModalButton = styled("button", {
  display: "flex",
  position: "relative",
  alignItems: "center",
  justifyContent: "center",
  width: "48px",
  height: "48px",
  backgroundColor: "$gray800",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",

  p: {
    display: "flex",
    position: "absolute",
    top: "-8px",
    right: "-8px",
    alignItems: "center",
    justifyContent: "center",
    width: "24px",
    height: "24px",
    backgroundColor: "$green300",
    borderRadius: "100%",
    border: "1px solid $gray800",
    color: "$white",
  },
});

export function Header() {
  const { productsAmount } = useCart();
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <Wrapper>
      <Link href="/">
        <Image src={logoImg} alt="" />
      </Link>
      <ModalButton onClick={() => setCartOpen((prev) => !prev)}>
        <Image src={icBag} alt="bag icon" />
        {!!productsAmount && <p>{productsAmount}</p>}
      </ModalButton>
      <CartModal isOpen={cartOpen} setIsOpen={setCartOpen} />
    </Wrapper>
  );
}
