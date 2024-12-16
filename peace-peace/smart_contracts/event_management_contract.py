import smartpy as sp

class EventManagement(sp.Contract):
    def _init_(self, address):
        self.init(
            admin=address, 
            events=sp.big_map(
                tkey=sp.TString, 
                tvalue=sp.TRecord(
                    price=sp.TMutez,
                    tickets_remaining=sp.TInt,
                ),
            ), 
        )
    
    @sp.entry_point
    def add_event(self, params):
        sp.verify(self.data.admin == sp.sender, "SenderNotAdmin")
        self.data.events[params.name] = sp.record(
            price=params.price,
            tickets_remaining=params.num_tickets,
        )
    
    @sp.entry_point
    def delete_event(self, params):
        sp.verify(self.data.admin == sp.sender, "SenderNotAdmin")
        del self.data.events[params.name]
    
    @sp.entry_point
    def update_ticket_price(self, params):
        sp.verify(self.data.admin == sp.sender, "SenderNotAdmin")
        self.data.events[params.name].price = params.updated_price
    
    @sp.entry_point
    def update_num_tickets(self, params):
        sp.verify(self.data.admin == sp.sender, "SenderNotAdmin")
        self.data.events[params.name].tickets_remaining = params.updated_num_tickets
    
    @sp.entry_point
    def buy_ticket(self, params):
        sp.verify(self.data.events[params.name].tickets_remaining >= params.tickets_required, "TicketsNotAvailable")
        self.data.events[params.name].tickets_remaining -= params.tickets_required


@sp.add_test(name = "Event Management Test")
def test():
    scenario = sp.test_scenario()
    
    admin1 = sp.test_account("admin")
    user1 = sp.test_account("user1")
    user2 = sp.test_account("user2")
    
    # Deploy the contract
    contract = EventManagement(admin1.address)
    scenario += contract
    
    # Test adding an event with Auth
    # scenario += contract.add_event(name="Concert", price=sp.tez(40), num_tickets=sp.int(100)).run(sender=user1)
    scenario += contract.add_event(name="Concert", price=sp.tez(40), num_tickets=sp.int(100)).run(sender=admin1)
    
    # Test viewing event details
    scenario.verify(contract.data.events["Concert"].price == sp.tez(40))
    scenario.verify(contract.data.events["Concert"].tickets_remaining == sp.int(100))

    # Test updating the ticket price with Auth
    # scenario += contract.update_ticket_price(name="Concert", updated_price=sp.tez(120)).run(sender=user1)
    scenario += contract.update_ticket_price(name="Concert", updated_price=sp.tez(120)).run(sender=admin1)
    scenario.verify(contract.data.events["Concert"].price == sp.tez(120))

    # Test updating the number of tickets with Auth
    # scenario += contract.update_num_tickets(name="Concert", updated_num_tickets=sp.int(80)).run(sender=user1)
    scenario += contract.update_num_tickets(name="Concert", updated_num_tickets=sp.int(80)).run(sender=admin1)
    scenario.verify(contract.data.events["Concert"].tickets_remaining == sp.int(80))

    # Test buying tickets
    scenario += contract.buy_ticket(name="Concert", tickets_required=5).run(sender=user1)
    scenario.verify(contract.data.events["Concert"].tickets_remaining == 75)

    # Test buying more tickets than available
    scenario += contract.buy_ticket(name="Concert", tickets_required=120).run(sender=user2,valid=False)
    
    # Test deleting an event with Auth
    # scenario += contract.delete_event(name="Concert").run(sender=user1)
    scenario += contract.delete_event(name="Concert").run(sender=admin1)
    scenario.verify(~(contract.data.events.contains("Concert")))