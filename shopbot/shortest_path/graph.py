class Graph:
    def __init__(self, index):
        if(index == 0):
            self.graph = {
                            0 : [[1,1], [3,1]],
                            1 : [[0,1], [2,1], [4,1]],
                            2 : [[1,1], [5,1]],
                            3 : [[0,1], [4,1]],
                            4 : [[3,1], [1,1], [5,1]],
                            5 : [[4,1], [2,1]]
                        }
        elif(index == 1):
            self.graph = {
                            0 : [[1,4], [7,8]],
                            1 : [[0,4], [7,11], [2,8]],
                            2 : [[1,8], [8,2], [3,7], [5,4]],
                            3 : [[2,7], [5,14], [4,9]],
                            4 : [[3,9], [5,10]],
                            5 : [[6,2], [4,10], [3,14], [2,4]],
                            6 : [[7,1], [5,2], [8,6]],
                            7 : [[0,8], [1,11], [8,7], [6,1]],
                            8 : [[2,2], [7,7], [6,6], [2,4]],
                        }

    def getGraph(self):
        return self.graph