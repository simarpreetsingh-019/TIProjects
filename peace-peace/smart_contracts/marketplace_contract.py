import smartpy as sp

FA2 = sp.io.import_template("fa2_lib.py")

class Token(FA2.Admin, FA2.MintNft, FA2.Fa2Nft):
    def __init__(self, admin, **kwargs):
        FA2.Fa2Nft.__init__(self, **kwargs)
        FA2.Admin.__init__(self, admin)

class Marketplace(sp.Contract):
    def __init__(self, token, metadata, admin):
        self.init(
            token=token,
            metadata=metadata,
            admin=admin,
            data=sp.big_map(
                tkey=sp.TNat,
                tvalue=sp.TRecord(
                    holder=sp.TAddress,
                    author=sp.TAddress,
                    amount=sp.TMutez,
                    token_id=sp.TNat,
                    collectable=sp.TBool,
                    aadhar_number=sp.TInt,
                    event_data=sp.TString
                    # num_tickets_booked=sp.TNat,
                    # event_name=sp.TString,
                    # transaction_hash=sp.TString
                    )),
            token_id=0,
            )

    @sp.entry_point
    def mint(self, params):        
        mint_params = sp.TList(
            sp.TRecord(
                to_=sp.TAddress,
                metadata=sp.TMap(sp.TString, sp.TBytes),
            ).layout(("to_", "metadata"))
        )
        c = sp.contract(mint_params, self.data.token, entry_point="mint").open_some()

        args = [
            sp.record(
                to_=sp.self_address,
                metadata={ '': params.metadata }
            )]
        sp.transfer(args, sp.mutez(0), c)
        
        self.data.data[self.data.token_id] = sp.record(
            holder=sp.sender,
            author=self.data.admin,
            amount=sp.amount,
            token_id=self.data.token_id,
            collectable=False,
            aadhar_number=params.aadhar_number,
            event_data=params.event_data
            # Params inside event_data:
            # num_tickets_booked=params.num_tickets_booked,
            # event_name=params.event_name,
            # transaction_hash=params.transaction_hash
        )
        sp.send(self.data.admin, sp.amount)
        self.data.token_id += 1

    def fa2_transfer(self, fa2, from_, to_, token_id, amount):
        c = sp.contract(sp.TList(sp.TRecord(from_=sp.TAddress, txs=sp.TList(sp.TRecord(amount=sp.TNat, to_=sp.TAddress, token_id=sp.TNat).layout(("to_", ("token_id", "amount")))))), fa2, entry_point='transfer').open_some()
        sp.transfer(sp.list([sp.record(from_=from_, txs=sp.list([sp.record(amount=amount, to_=to_, token_id=token_id)]))]), sp.mutez(0), c)

    @sp.entry_point
    def collect(self, params):
        sp.verify(sp.amount == self.data.data[params.token_id].amount, "WrongAmount")
        sp.verify(self.data.data[params.token_id].collectable, "NotCollectable")
        sp.verify(self.data.data[params.token_id].holder != sp.sender, "SenderisHolder")

        sp.send(self.data.data[params.token_id].holder, sp.amount)

        self.data.token.transfer(
            [sp.record(from_=self.data.data[params.token_id].holder,
                      txs=[sp.record(token_id=params.token_id, amount=sp.amount, 
                                     to_=sp.sender)])]
        )
        
        self.data.data[params.token_id].collectable = False
        self.data.data[params.token_id].holder = sp.sender
        self.data.data[params.token_id].aadhar_number = params.aadhar_number


    @sp.entry_point
    def publish_nft(self, params):
        sp.verify(self.data.data[params.token_id].collectable == False, "AlreadyInMarketPlace")
        sp.verify(self.data.data[params.token_id].holder == sp.sender, "SenderNotHolder")
        self.data.data[params.token_id].collectable = True

@sp.add_test(name = "Non Fungible Token")
def test():
    scenario = sp.test_scenario()
    
    admin = sp.test_account("admin")
    mark = sp.test_account("user1")
    elon = sp.test_account("user2")

    token_contract = Token(
        admin=admin.address,
        metadata=sp.utils.metadata_of_url(
            "ipfs://QmW8jPMdBmFvsSEoLWPPhaozN6jGQFxxkwuMLtVFqEy6Fb"))
    scenario += token_contract

    scenario.h1("MarketPlace")
    marketplace = Marketplace(
        token_contract.address,
        sp.utils.metadata_of_url(
            "ipfs://QmW8jPMdBmFvsSEoLWPPhaozN6jGQFxxkwuMLtVFqEy6Fb"
        ), admin.address)
    scenario += marketplace

    token_contract.set_administrator(marketplace.address).run(sender=admin)
    
    marketplace.mint(
        metadata= sp.pack("ipfs://bafyreibwl5hhjgrat5l7cmjlv6ppwghm6ijygpz2xor2r6incfcxnl7y3e/metadata.json"),
        aadhar_number=100, event_data="{key: value}").run(sender=mark, amount=sp.tez(10))
    marketplace.publish_nft(token_id=0).run(sender=mark)
    
    scenario.h1("Collect")
    marketplace.collect(token_id=0, aadhar_number=1221).run(sender=elon, amount=sp.tez(10))