import smartpy as sp

@sp.module
def main():
    class Assuredcontract(sp.Contract):
        def __init__(self):
            self.data.fadrs = sp.address("tz1PguFJTj2ZPT9fCqAxt4BwbJtDP8XNAfJS")
            self.data.cuadrs = sp.address("tz1Wo5j2PHYarqekwd7FimrZgS2Ps7oB2war")
            self.data.goods = {
                "rice": sp.mutez(10000),
                "wheat": sp.mutez(7000),
                "onion":sp.mutez(10000),
                "brinjal": sp.mutez(6000),
                "rajma": sp.mutez(15000),
                "bengal gram": sp.mutez(8000)
            }
            self.data.balance=sp.mutez(10000000)
            self.data.price = sp.mutez(0)
            self.data.cn = False

        @sp.entrypoint
        def buy(self, byls):
            price = sp.mutez(0)
            for i in byls:
                price += self.data.goods[i]
            self.data.price += price
            sp.send(self.data.fadrs, self.data.price)

        # @sp.entrypoint
        # def sendm(self, price):
        #     if self.data.cn:
                

        # @sp.entrypoint
        # def deliver(self, pr):
        #     if pr > 0:
        #         self.confirm_payment()
        #         self.sendm(self.data.price)
        #         self.data.price = 0

        # @sp.entry_point
        # def confirm_payment(self):
            # self.data.cn = True

@sp.add_test()
def test():
    scenario = sp.test_scenario("My 1st Assured Contract",main)
    contract = main.Assuredcontract()
    scenario += contract

    contract.buy(["rice", "wheat"]).run(sender=sp.address("tz1Wo5j2PHYarqekwd7FimrZgS2Ps7oB2war"))
