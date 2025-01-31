import axios from "axios"

const fetchtickets = async(addr: string)=>{
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response:any  = await axios.get(
    "https://api.ghostnet.tzkt.io/v1/operations/transactions?entry_point=add_events&target=KT1Q8c6ZFoxG8f4cQEHpamirD2SQijXL8pNH")
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return response.data.filter((rep: any) => rep["parameter"]["entrypoint"] === "buy_ticket" && rep["sender"]["address"] === addr);
}

export default fetchtickets;