import { useEffect, useState } from "react";
import fetchnft from "../../helpers/fetch/fetchnft";
import { Navbar } from "../../components";
import collect from "../../helpers/collect";

interface Props {
    wallet: walletInterfaceProps;
}

const Market = (props: Props) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [sellables, setSellables] = useState<any[]>([]);
    const [hide, setHide] = useState(true);
    const [kyc, setKyc] = useState("XXXXXXXXXXXX");
    const [pp, setpp] = useState("");
    const [amm, setamm] = useState("");

    useEffect(() => {
        (async () => {
            const nftdata = await fetchnft();
            console.log(nftdata);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            setSellables(nftdata?.filter((nf: any) => nf["value"]["collectable"]));
        })();
    }, []);
    return (
        <>
            <div className="ticket-div">
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
                                            Ensure that the inputed KYC ID is correct as this will be tied to the
                                            tickets purchased and entry will be restricted if there is a discrepancy
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="bbb"
                                    onClick={async () => {
                                        await collect(props.wallet.dAppclient, pp, kyc, amm);
                                        setHide(true);
                                    }}
                                    style={{ cursor: "pointer" }}
                                >
                                    Book Now
                                </div>
                                <div className="bbx" onClick={() => setHide(true)} style={{ cursor: "pointer" }}>
                                    <i className="fa fa-times fa-4x"></i>
                                </div>
                            </div>
                        </div>
                    )}
                </>
                <div className="ticket-h1">Market</div>
                <div className="ticket-cardlist">
                    {sellables.map((eve, ind) => (
                        <div className={`book-card card${(ind % 3) + 1}`} key={ind}>
                            <div className="card-h2">{JSON.parse(eve["value"]["event_data"])["eventName"]}</div>
                            <div className="card-date" style={{ fontFamily: "sans-serif" }}>
                                {eve["value"]["amount"]} Mutez
                            </div>
                            <div className="card-date" style={{ fontFamily: "sans-serif" }}>
                                {JSON.parse(eve["value"]["event_data"])["numTickets"]} Ticket(s)
                            </div>
                            <div
                                className="card-venue"
                                onClick={async () => {
                                    setpp(eve["value"]["token_id"]);
                                    setamm(eve["value"]["amount"].toString());
                                    setHide(false);
                                }}
                            >
                                <p>Buy Now</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Market;
