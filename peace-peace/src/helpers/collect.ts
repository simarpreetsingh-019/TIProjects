import { DAppClient, TezosOperationType } from "@airgap/beacon-sdk";
import toast from "react-hot-toast";

const collect = async (dAppClient: DAppClient, ntidame: string, adh: string, amm: string) => {
    try {
        const result = await dAppClient.requestOperation({
            operationDetails: [
                {
                    kind: TezosOperationType.TRANSACTION,
                    amount: amm,
                    destination: "KT1MJEryRHS1vsz9swmP8k6ifU4ZM8Z46PcQ",
                    parameters: {
                        entrypoint: "collect",
                        value: {
                            prim: "Pair",
                            args: [{ int: adh }, { int: ntidame }],
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

export default collect;
