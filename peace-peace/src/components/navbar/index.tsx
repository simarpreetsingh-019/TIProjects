import { useNavigate } from "react-router";
import "./Navbar.css";
import WalletNav from "./wallet";
import { useState } from "react";
import { Link } from "react-router-dom";

interface Props {
  wallet: walletInterfaceProps;
}

const Navbar = (props: Props) => {
  const [tgg, setTgg] = useState(true);
  const navigate = useNavigate();
  return (
    <div className="navbar-root">
      <div
        className="navbar-logo"
        onClick={() => {
          navigate("/");
        }}
      >
        PEACE
      </div>
      <div className={tgg ? "navbar-wrap navbar-wrap-toggle" : "navbar-wrap"}>
        <div
          onClick={() => {
            setTgg((prev) => !prev);
          }}
          className="navbar-bottom"
        >
          {" "}
          {tgg ? (
            <i className="fa fa-arrow-down" style={{ color: "black" }}></i>
          ) : (
            <i className="fa fa-arrow-up" style={{ color: "black" }}></i>
          )}
        </div>
        <div className="navbar-menu">
          <div
            onClick={() => {
              navigate("/book");
            }}
          >
            Book Tickets
          </div>
          <div
            onClick={() => {
              navigate("/tickets");
            }}
          >
            View Tickets
          </div>
          <div
            onClick={() => {
              navigate("/verify");
            }}
          >
            Verify Tickets
          </div>
          <div
            onClick={() => {
              navigate("/market");
            }}
          >
            Market
          </div>
          <div
            onClick={() => {
              navigate("/admin");
            }}
          >
            Admin
          </div>
          <div>
            <Link to="https://github.com/NitroKnight68/peace-peace" style={{ color: "black", textDecoration: "none" }}>Github</Link>
            
          </div>
        </div>
      </div>

      <div className="navbar-wallet">
        <WalletNav
          key={"tezos"}
          walletType={props.wallet.walletType}
          wallets={props.wallet.wallets}
          connect={props.wallet.connect}
          disconnect={props.wallet.disconnect}
          dAppclient={props.wallet.dAppclient}
        />
      </div>
    </div>
  );
};

export default Navbar;
