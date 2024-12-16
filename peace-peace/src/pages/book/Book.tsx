import { useEffect, useState } from "react";
import { Navbar } from "../../components";
import "./Book.css";
import fetchEvents from "../../helpers/fetch/fetchEvents";
import buyTicket from "../../helpers/contracts/buyTicket";

interface Props {
  wallet: walletInterfaceProps;
}

const Book = (props: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [events, setEvents] = useState<any[]>([]);
  const [hide, setHide] = useState(true);
  const [kyc, setKyc] = useState("XXXX-XXXX-XXXX");
  const [ticks, setTicks] = useState(1);
  const [nm, setNm] = useState("");
  const [prc, setPrc] = useState(0);

  useEffect(() => {
    (async () => {
      const data = await fetchEvents();
      setEvents(data);
    })();
  }, []);

  return (
    <div className="book-div">
      <Navbar wallet={props.wallet} />
      <>
        {hide ? null : (
          <div className="buypopup">
            <div className="buybody">
              <div className="wrap1">
                <div className="wrap2">
                  <div className="bblabel">KYC Document ID</div>{" "}
                  <div>
                    <input
                      className="bbinput"
                      value={kyc}
                      space-around
                      onChange={(e) => setKyc(e.target.value)}
                    />
                  </div>
                  <div className="err">
                    Ensure that the inputed KYC ID is correct as this will be
                    tied to the tickets purchased and entry will be restricted
                    if there is a discrepancy
                  </div>
                </div>
                <div className="wrap2">
                  <div className="bblabel">Number of Tickets </div>{" "}
                  <div>
                    <input
                      className="bbinput"
                      type="number"
                      value={ticks}
                      onChange={(e) => setTicks(Number(e.target.value))}
                    />
                  </div>
                  <div className="err">
                    To prevent scalping and to ensure fair access to tickets,
                    there is a cap on the number of tickets alloted per wallet
                  </div>
                </div>
              </div>
              <div className="bblabel">
                {ticks} tickets to {nm} at {prc * ticks} Mutez{" "}
              </div>
              <div
                className="bbb"
                onClick={async () => {
                  await buyTicket(
                    props.wallet.dAppclient,
                    nm,
                    ticks,
                    prc * ticks,
                    kyc
                  );
                  setHide(true);
                }}
                style={{ cursor: "pointer" }}
              >
                Book Now
              </div>
              <div
                className="bbx"
                onClick={() => setHide(true)}
                style={{ cursor: "pointer" }}
              >
                <i className="fa fa-times fa-4x"></i>
              </div>
            </div>
          </div>
        )}
      </>
      <div className="book-h1">EVENTS</div>
      <div className="book-cardlist">
        {events.map((eve, ind) => (
          <div className={`book-card card${(ind % 3) + 1}`} key={ind}>
            <div className="card-img"></div>
            {/* <div className="card-sold">SOLD OUT</div> */}
            <div className="card-h2">{eve["parameter"]["value"]["name"]}</div>
            <div className="card-date" style={{ fontFamily: "sans-serif" }}>
              {eve["parameter"]["value"]["price"]} Mutez
            </div>
            <div
              className="card-venue"
              onClick={async () => {
                setHide(false);
                setNm(eve["parameter"]["value"]["name"]);
                setPrc(eve["parameter"]["value"]["price"]);
              }}
            >
              <p>Buy Now</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Book;
