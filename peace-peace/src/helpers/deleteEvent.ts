import { DAppClient, TezosOperationType } from "@airgap/beacon-sdk";
import toast from "react-hot-toast";

const deleteEvent = async (dAppClient: DAppClient, userAddress: string, name: string) => {
    console.log(userAddress);
    try {
        const result = await dAppClient.requestOperation({
            operationDetails: [
                {
                    kind: TezosOperationType.TRANSACTION,
                    amount: "0",
                    destination: "KT1Q8c6ZFoxG8f4cQEHpamirD2SQijXL8pNH",
                    parameters: {
                        entrypoint: "delete_event",
                        value: {
                            string: name,
                        },
                    },
                },
            ],
        });

        console.log(result);
        toast.success("Event has been deleted successfully");
    } catch (error) {
        console.error(`The contract call failed and the following error was returned:`, error);
        toast.error("An error has occured");
    }
};

export default deleteEvent;
