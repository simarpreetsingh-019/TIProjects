"use client";
import Footer from "@/components/header/Footer";
import Menu from "@/components/header/menu";
import WalletAddressForm from "@/components/WalletAddressForm";

export default function userDashboardPage() {
  return (
    <>
      <Menu />
      <WalletAddressForm />
      <Footer />
    </>
  );
}
