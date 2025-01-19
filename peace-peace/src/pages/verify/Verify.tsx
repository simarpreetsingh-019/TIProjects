import { useState } from "react";
import { Navbar, QrReader } from "../../components";
import fetchnft from "../../helpers/fetch/fetchnft";

import "./Verify.css";
import toast from "react-hot-toast";

interface Props {
    wallet: walletInterfaceProps;
}

const Verify = (props: Props) => {
    const [kyc, setKyc] = useState("");
    const [qrData, setQrdata] = useState("");
    const [hide, setHide] = useState(true);

    const checkTicket = async () => {
        const tokenData = await fetchnft();
        let vl = tokenData.filter(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (v: any) => {
                try {
                    const jj = JSON.parse(v["value"]["event_data"]);
                    const qq = JSON.parse(qrData);
                    return jj["trhash"] === qq["trhash"];
                } catch (error) {
                    return false;
                }
            }
        );
        if (vl.length > 0) {
            vl = vl[0];
            if (kyc == vl["value"]["aadhar_number"]) {
                toast.success("Ticket is Valid");
            } else {
                toast.error("Ticket is invalid");
            }
        } else {
            toast.error("Ticket is invalid");
        }
    };

    return (
        <div className="verify-main">
            <Navbar wallet={props.wallet} />
            <div className="verify-body">
                <div className="verify-heading">VERIFY</div>
                <div className="verify-form">
                    <div className="verify-form-body qr">
                        {hide ? (
                            <>
                                <button
                                    className="qr-scan-button"
                                    onClick={() => {
                                        setHide(false);
                                    }}
                                >
                                    Scan QR
                                </button>
                                <div className="verifyy">{qrData}</div>
                            </>
                        ) : (
                            <QrReader setHide={setHide} setQrdata={setQrdata} />
                        )}
                    </div>
                    <div className="verify-form-body">
                        <div>
                            <div className="verify-label">KYC Document</div>
                            <br />
                            <input className="verify-input" value={kyc} onChange={(e) => setKyc(e.target.value)} />
                        </div>
                        <button
                            className="qr-scan-button verify-button"
                            onClick={async () => {
                                setHide(true);
                                await checkTicket();
                            }}
                            disabled={qrData == "" || kyc == ""}
                        >
                            Verify Ticket
                        </button>
                    </div>
                </div>
            </div>

            <br />
        </div>
    );
};

export default Verify;
