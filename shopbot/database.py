import sqlite3
import time


class DataBase:
    def __init__(self, dbName):
        self.conn = sqlite3.connect(dbName)
        print ("Opened database successfully")
    def createTable(self):
        self.conn.execute('''CREATE TABLE MISSING_ITEM \
                    (ITEM          TEXT    NOT NULL, \
                     DAY          TEXT     NOT NULL \
                    );''')
        print ("Table created successfully")
    def insertItem(self, itemName):
        presentTime = str(time.strftime("%Y,%m,%d"))
        sql = '''INSERT INTO MISSING_ITEM (ITEM, DAY) VALUES(?, ?)'''
        self.conn.execute(sql,(itemName, presentTime))
        self.conn.commit()

#conn.close()
