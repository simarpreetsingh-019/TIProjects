import { DAppClient, TezosOperationType } from "@airgap/beacon-sdk";
import toast from "react-hot-toast";

const updateTickets = async (
    dAppClient: DAppClient,
    userAddress: string,
    name: string,
    updated_num_tickets: string
) => {
    console.log(userAddress);
    try {
        const result = await dAppClient.requestOperation({
            operationDetails: [
                {
                    kind: TezosOperationType.TRANSACTION,
                    amount: "0",
                    destination: "KT1Q8c6ZFoxG8f4cQEHpamirD2SQijXL8pNH",
                    parameters: {
                        entrypoint: "update_num_tickets",
                        value: {
                            prim: "Pair",
                            args: [{ string: name }, { int: updated_num_tickets }],
                        },
                    },
                },
            ],
        });

        console.log(result);
        toast.success("Tickets have been updated successfully");
    } catch (error) {
        console.error(`The contract call failed and the following error was returned:`, error);
        toast.error("An error has occured");
    }
};

export default updateTickets;
