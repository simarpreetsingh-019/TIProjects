import { DAppClient, TezosOperationType } from "@airgap/beacon-sdk";
import toast from "react-hot-toast";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const mint = async (dAppClient: DAppClient, ename: string, adh: string, metadta: string, numticks: string, thash: string, price: string) => {
    try {
        const gomma = {
            eventName: ename,
            numTickets: numticks,
            trhash: thash,
        }
        const result = await dAppClient.requestOperation({
            operationDetails: [
                {
                    kind: TezosOperationType.TRANSACTION,
                    amount: price,
                    destination: "KT1MJEryRHS1vsz9swmP8k6ifU4ZM8Z46PcQ",
                    parameters: {
                        entrypoint: "mint",
                        value: {
                            prim: "Pair",
                            args: [{ int: adh }, { prim: "Pair", args: [{ string: JSON.stringify(gomma) }, { bytes: metadta }] }],
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

export default mint;
