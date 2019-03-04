from graph import *
from item_map import *
class DijkstraAlgo:
    def __init__(self, graph):
        self.graph = graph
        self.source = 0
        self.visited = []
        self.matrix = [[]]
        self.numNodes = len(self.graph)
        self.MAXI = 999

    def createTrackingMatrix(self, dim, source):
        w, h = dim, dim;
        self.matrix = [[self.MAXI for x in range(w+1)] for y in range(h+1)]
        self.matrix[0][source] = 0
        return self.matrix

    def getMinNode(self, rowIndex, visited):
        mini = self.MAXI
        minIndex = 0
        #import pdb; pdb.set_trace()
        for i in range(self.numNodes):
            if(self.matrix[rowIndex][i] < mini):
                if(i not in visited):
                    mini = self.matrix[rowIndex][i]
                    minIndex = i
        return minIndex

    def copyRow(self, matrix, src, dest):
        matrix[dest] = matrix[src].copy()
        return matrix



    def printTrackingMatrix(self):
        for i in range(len(self.matrix)):
            for j in range(len(self.matrix[i])):
                print(self.matrix[i][j], end = "\t\t")
            print("\n")

    def run(self, source):
        self.matrix = self.createTrackingMatrix(self.numNodes, source)
        self.source = source
        rowCounter = 0
        while(len(self.visited) != self.numNodes):
            self.matrix = self.copyRow(self.matrix, rowCounter, rowCounter+1)
            currNode = self.getMinNode(rowCounter, self.visited)
            self.matrix[rowCounter][self.numNodes] = currNode
            self.visited.append(currNode)
            for eachNeighbour in self.graph[currNode]:
                if(eachNeighbour[0] not in self.visited):
                    self.matrix[rowCounter+1][eachNeighbour[0]] = min(self.matrix[rowCounter][eachNeighbour[0]], self.matrix[rowCounter][currNode] + eachNeighbour[1])
            rowCounter += 1
        self.printTrackingMatrix()

    def getPath(self, destination):
        temp = destination
        pointer = self.numNodes
        path = [destination]

        while(temp != self.source):
            if(self.matrix[pointer][temp] != self.matrix[pointer - 1][temp]):
                path.append(self.matrix[pointer - 1][self.numNodes])
                temp = self.matrix[pointer - 1][self.numNodes]
            pointer -= 1
        return path[::-1]



graph = Graph(0)
dijk = DijkstraAlgo(graph.getGraph())
dijk.run(0)
print(dijk.getPath(ItemMapping().getItemId("furniture")))
