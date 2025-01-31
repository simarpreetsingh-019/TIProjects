import { DAppClient, TezosOperationType } from "@airgap/beacon-sdk";
import toast from "react-hot-toast";
import mint from "../mint";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const buyTicket = async (dAppClient: DAppClient, name: string = "Concert", tickets:number = 1, amount: number = 0, kyc: string)=>{
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result:any = await dAppClient.requestOperation({
      operationDetails: [
        {
          kind: TezosOperationType.TRANSACTION,
          amount: amount.toString(),
          destination: "KT1Q8c6ZFoxG8f4cQEHpamirD2SQijXL8pNH",
          parameters: {
            entrypoint: "buy_ticket",
            value: {
              prim: 'Pair',
              args: [
                { string: name },
                { int: tickets.toString()}
              ]
            }
          },
        },
      ],
    });
  
    console.log(result);
    const thash = result["transactionHash"]
    await mint(dAppClient, name, kyc, "", tickets.toString(), thash, amount.toString())
    toast.success("Tickets have been bought Succesfully. ");
    return {status: true, data: result}
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error:any) {
    console.error(
      `The contract call failed and the following error was returned:`,
      error
    );
    toast.error("An error has occured")
    return {status: false, data: error}
  }
  

}

export default buyTicket;