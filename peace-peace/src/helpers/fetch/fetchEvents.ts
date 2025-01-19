import axios from "axios"

const fetchEvents = async()=>{
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response:any  = await axios.get(
    "https://api.ghostnet.tzkt.io/v1/operations/transactions?entry_point=add_events&target=KT1Q8c6ZFoxG8f4cQEHpamirD2SQijXL8pNH")
    const eve = response.data.filter((rep: any) => rep["parameter"]["entrypoint"] === "add_event");
    const deleve = response.data.filter((rep: any) => rep["parameter"]["entrypoint"] === "delete_event").map((rep:any)=>rep["parameter"]["value"]);
    const fileve = eve.filter((ev:any) => !deleve.includes(ev["parameter"]["value"]["name"]))
    console.log(fileve)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return fileve
}

export default fetchEvents;