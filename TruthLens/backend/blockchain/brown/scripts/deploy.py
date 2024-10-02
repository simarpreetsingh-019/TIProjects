import json

from brownie import FundMe, SimpleCollectible, network, config, accounts
from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

simple_collectable = SimpleCollectible.deploy({"from": address})


def get_account():
    if network.show_active() == "development":
        return accounts[0]
    return accounts.add(config["wallets"]["from_key"])


def main():
    address = get_account()
    print(address, type(address))
    simple_collectable = SimpleCollectible.deploy({"from": address})
    return FundMe, simple_collectable, address


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow access from any origin
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["Authorization", "Content-Type"],
)


@app.get("/pay")
def payment(url: str, name: str, description: str, result: str, confidense: int, to_address: str):
    uri = {
        "name": f"{name}",
        "description": f"{description}",
        "image": f"{url}",
        "attributes": [
            {
                "Result": f"{result}",
                "value": str(confidense)
            }
        ]
    }
    json_uri = json.dumps(uri)
    # fund_me = FundMe[-1]
    # tx = fund_me.fund({"from": address, "value": 30000000000000})
    tx = simple_collectable.createCollectible(json_uri, to_address, {"from": address})
    print(
        f"You can view your nft at {OPENSEA_URL.format(simple_collectable.address, simple_collectable.tokenCounter() - 1)}")
    # tx = fund_me.withdraw({"from": address})
    print("Payment Transfered")


def main():
    uvicorn.run(app, port=8000, host="0.0.0.0")
# def main():
#     return FundMe, simple_collectable
