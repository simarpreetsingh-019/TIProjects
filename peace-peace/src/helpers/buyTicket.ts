import { DAppClient, TezosOperationType } from "@airgap/beacon-sdk";
import toast from "react-hot-toast";

const buyTicket = async (dAppClient: DAppClient, userAddress: string, name: string, tickets_required: string) => {
    console.log(userAddress);
    try {
        const result = await dAppClient.requestOperation({
            operationDetails: [
                {
                    kind: TezosOperationType.TRANSACTION,
                    amount: "0",
                    destination: "KT1Q8c6ZFoxG8f4cQEHpamirD2SQijXL8pNH",
                    parameters: {
                        entrypoint: "buy_ticket",
                        value: {
                            prim: "Pair",
                            args: [{ string: name }, { int: tickets_required }],
                        },
                    },
                },
            ],
        });

        console.log(result);
        toast.success("Ticket has been bought successfully");
    } catch (error) {
        console.error(`The contract call failed and the following error was returned:`, error);
        toast.error("An error has occured");
    }
};

export default buyTicket;
