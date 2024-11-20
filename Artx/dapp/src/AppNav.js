import React from "react";
import { withRouter } from 'react-router-dom';
import "./App.css";
import { getWeb3, getInstance,  getContractAddress } from "./Web3Util";

class AppNav extends React.Component {
  constructor(props) {
    super(props);
    this.handleNavClick = this.handleNavClick.bind(this);
    this.state = {
      name: '',
      symbol: ''
    };
  }
  handleNavClick = param => e => {
    e.preventDefault();
    this.props.history.push('/' + param)
  };
  async componentDidMount() {
    try {
      const web3 = await getWeb3();
      const contractAddress = await getContractAddress(); 
      const contractInstance = await getInstance(web3, contractAddress);
      window.user = (await web3.eth.getAccounts())[0];
      const symbol = await contractInstance.methods.symbol().call()
      this.setState({ symbol: symbol });
      const name = await contractInstance.methods.name().call();
      this.setState({ name: name });
    } catch (error) {
      console.error("Error while initializing web3 and contract instance:", error);
    }
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg ">
        <div className="navbar-brand">
          <a className="navbar-item text-white" href="/">
            <strong>Artx - Your Digital Art Gallery</strong>
          </a>
        </div>
        <form className="form-inline  my-2 my-lg-0 ml-auto">
          <a className="btn btn1" href="/myWallet">My Wallet Info</a>
        </form>
      </nav>
    );
  }
}
export default withRouter(AppNav);
