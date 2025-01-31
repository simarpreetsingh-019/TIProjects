import { useEffect, useState } from "react";
import { Navbar } from "../../components";
import "./Tickets.css";
import QRCode from "react-qr-code";
// import fetchtickets from "../../helpers/fetch/fetchtickets";
import fetchnft from "../../helpers/fetch/fetchnft";
import publishNFT from "../../helpers/publishNFT";

interface Props {
    wallet: walletInterfaceProps;
}

const Tickets = (props: Props) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [fungi, setFungi] = useState<any[]>([]);
    const [hide, setHide] = useState(true);
    const [dt, setDT] = useState("");

    const onQRClick = (da: string) => {
        setHide(false);
        setDT(da);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    const onBobClick = () => setHide(true);

    useEffect(() => {
        (async () => {
            const activeacc = await props.wallet.dAppclient.getActiveAccount();
            if (activeacc) {
                const userAddress = activeacc.address;
                // const tickets = await fetchtickets(userAddress);
                // console.log(tickets);
                const nfts = await fetchnft();
                console.log(nfts);
                const filteredNfts = nfts.filter((e: any) => e.value.holder === userAddress);
                console.log(filteredNfts);
                setFungi(filteredNfts);
            }
        })();
    }, []);

    return (
        <>
            <div className="ticket-div">
                <Navbar wallet={props.wallet} />
                <>
                    {hide ? null : (
                        <div className="bob" onClick={onBobClick}>
                            <QRCode value={dt} size={300} />
                        </div>
                    )}
                </>
                <div className="ticket-h1">TICKETS</div>
                <div className="ticket-cardlist">
                    {fungi.map((eve, ind) => (
                        <div className={`book-card card${(ind % 3) + 1}`} key={ind}>
                            <div className="card-img"></div>
                            <div
                                className="card-sold"
                                onClick={() => {
                                    publishNFT(props.wallet.dAppclient, eve.value.token_id);
                                }}
                            >
                                SELL TICKET
                            </div>
                            <div className="card-h2">{JSON.parse(eve.value.event_data)["eventName"]}</div>
                            <div className="card-date" style={{ fontFamily: "sans-serif" }}>
                                {JSON.parse(eve.value.event_data)["numTickets"]} Ticket(s)
                            </div>
                            <div
                                id="qr"
                                className="card-qr"
                                onClick={() => {
                                    onQRClick(eve.value.event_data);
                                }}
                            >
                                <QRCode value={eve.value.event_data} size={100} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Tickets;
