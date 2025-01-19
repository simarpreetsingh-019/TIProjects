import { useState } from "react";
import { Navbar } from "../../components";
import addEvent from "../../helpers/addEvent";
import deleteEvent from "../../helpers/deleteEvent";
import updateTickets from "../../helpers/updateTickets";
import updatePrice from "../../helpers/updatePrice";
import "./Admin.css";

interface Props {
    wallet: walletInterfaceProps;
}

const Admin = (props: Props) => {

    const [activeForm, setActiveForm] = useState("addEventForm");

    const changeActiveForm = (activeForm: any) => {
        setActiveForm(activeForm);
    };

    return (
        <div className="admin-div">
            <Navbar wallet={props.wallet} />
            <div className="admin-h1">ADMIN</div>
            <div className="admin-cardlist">
                <div className="admin-left">
                    <div className="admin-contract" onClick={() => changeActiveForm("addEventForm")}>
                        ADD EVENT.
                    </div>
                    <div className="admin-contract" onClick={() => changeActiveForm("deleteEventForm")}>
                        DELETE EVENT.
                    </div>
                    <div className="admin-contract" onClick={() => changeActiveForm("updateTicketsForm")}>
                        UPDATE TICKETS.
                    </div>
                    <div className="admin-contract" onClick={() => changeActiveForm("updatePricesForm")}>
                        UPDATE PRICES.
                    </div>
                </div>
                <div className="admin-right">
                    {activeForm === "addEventForm" && <AddEventForm wallet={props.wallet} />}
                    {activeForm === "deleteEventForm" && <DeleteEventForm wallet={props.wallet} />}
                    {activeForm === "updateTicketsForm" && <UpdateTicketsForm wallet={props.wallet} />}
                    {activeForm === "updatePricesForm" && <UpdatePricesForm wallet={props.wallet} />}
                </div>
            </div>
        </div>
    );
};

const AddEventForm = (props: Props) => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [ticketsNum, setTicketsNum] = useState("");

    return (
        <form className="admin-form">
            <div className="form-main">
                <div className="form-section1">
                    <label htmlFor="name">NAME</label>
                    <br />
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    <br />
                    <label htmlFor="price">PRICE</label>
                    <br />
                    <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
                    <br />
                </div>
                <div className="form-section2">
                    <label htmlFor="num_tickets">NO. OF TICKETS</label>
                    <br />
                    <input type="text" value={ticketsNum} onChange={(e) => setTicketsNum(e.target.value)} />
                    <br />
                </div>
            </div>
            <button
                onClick={async (e) => {
                    e.preventDefault()
                    const useraddr = await props.wallet.dAppclient.getActiveAccount();
                    addEvent(props.wallet.dAppclient, useraddr.address, name, ticketsNum, price);
                }}
                className="submit-btn"
            >
                SUBMIT.
            </button>
        </form>
    );
};

const DeleteEventForm = (props: Props) => {
    const [name, setName] = useState("");

    return (
        <form className="admin-form">
            <div className="form-main">
                <div className="form-section1">
                    <label htmlFor="name">NAME</label>
                    <br />
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    <br />
                </div>
            </div>
            <button
                onClick={async (e) => {
                    e.preventDefault()
                    const useraddr = await props.wallet.dAppclient.getActiveAccount();
                    deleteEvent(props.wallet.dAppclient, useraddr.address, name);
                }}
                className="submit-btn"
            >
                SUBMIT.
            </button>
        </form>
    );
};

const UpdateTicketsForm = (props: Props) => {
    const [name, setName] = useState("");
    const [ticketsRequired, setTicketsRequired] = useState("");

    return (
        <form className="admin-form">
            <div className="form-main">
                <div className="form-section1">
                    <label htmlFor="name">NAME</label>
                    <br />
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    <br />
                </div>
                <div className="form-section2">
                    <label htmlFor="tickets_required">TICKETS REQUIRED</label>
                    <br />
                    <input type="text" value={ticketsRequired} onChange={(e) => setTicketsRequired(e.target.value)} />
                    <br />
                </div>
            </div>
            <button
                onClick={async (e) => {
                    e.preventDefault()
                    const useraddr = await props.wallet.dAppclient.getActiveAccount();
                    updateTickets(props.wallet.dAppclient, useraddr.address, name, ticketsRequired);
                }}
                className="submit-btn"
            >
                SUBMIT.
            </button>
        </form>
    );
};

const UpdatePricesForm = (props: Props) => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");

    return (
        <form className="admin-form">
            <div className="form-main">
                <div className="form-section1">
                    <label htmlFor="name">NAME</label>
                    <br />
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    <br />
                </div>
                <div className="form-section2">
                    <label htmlFor="price">PRICE</label>
                    <br />
                    <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
                    <br />
                </div>
            </div>
            <button
                onClick={async (e) => {
                    e.preventDefault()
                    const useraddr = await props.wallet.dAppclient.getActiveAccount();
                    updatePrice(props.wallet.dAppclient, useraddr.address, name, price);
                }}
                className="submit-btn"
            >
                SUBMIT.
            </button>
        </form>
    );
};

export default Admin;
