class ItemMapping:
    def __init__(self):
        self.item_index_map = {
                                "furniture":0,
                                "sports":1,
                                "cloths":2,
                                "electronics":3,
                                "apple":4,
                                "utensils":5,
                                "sanitory":6
                              }
    def getItemId(self, item):
        return self.item_index_map[item]
