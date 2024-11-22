import smartpy as sp


@sp.module
def main():
    class MusicRoyaltyMarketplace(sp.Contract):
        def __init__(self):
            self.data.songs = sp.big_map()
            self.data.counter = 0
    
        @sp.entry_point
        def addSong(self,params):

            sp.cast(params , sp.record(
                title = sp.string,
                artist = sp.string,
                artist_name = sp.string,
                image = sp.string,
                genre = sp.string,
                ipfs_hash = sp.string,
                price = sp.nat,
                timestamp = sp.string
            ))            
            
            self.data.songs[self.data.counter] = sp.record(
                title = params.title,
                artist = params.artist,
                ipfs_hash = params.ipfs_hash,
                price = params.price,  
                image = params.image,
                genre= params.genre,
                artist_name = params.artist_name,
                owner = [sp.record(id = params.artist , quantity = 1)],
                timestamp = params.timestamp
            )
            self.data.counter += 1
    
        # @sp.entry_point
        # def buySong(self, params):
        #     sp.cast(params , sp.record(
        #         song_id = sp.nat,
        #         quantity = sp.nat,
        #         buyer = sp.address
        #     ))
        #     song = self.data.songs[params.song_id]

            
            
        #     if(sp.amount>total_bill):
        #         sp.send(song.owner, song.price)
        #         self.data.songs[params.song_id].owner.push(sp.record(id= params.buyer , quantity = params.quantity))

@sp.add_test()
def test():
    scenario = sp.test_scenario("test", main)
    contract = main.MusicRoyaltyMarketplace()
    scenario += contract


    params = sp.record(
                    artist = "12432", 
                    title = "ABC" , 
                    ipfs_hash = "hash" , 
                    price = 1 , 
                    artist_name = "krishna" , 
                    genre = "pop" , 
                    image= "https://ix-marketing.imgix.net/case-study-image_chronext.png?auto=format,compress&w=1946",
                    # timestamp = "2024-10-30T13:49:22.285Z"
                    )
    # Register a song
    contract.addSong(params)
    

    # Buy a song
    # contract.buySong(0).run(sender=sp.address("tz2..."), amount=sp.mutez(1000000))
