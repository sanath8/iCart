#!/usr/bin/env python

# WS server that sends messages at random intervals

import asyncio
import datetime
import random
import websockets
from thread import *
from mobile import MobileInfo


async def time(websocket, path):
    thread_list = []
    for each_key in MobileInfo.mobiles:
        thread = myThread(each_key, MobileInfo.mobiles[each_key]["name"], MobileInfo.mobiles[each_key]["bt_addr"])
        thread_list.append(thread)
        thread.start()
        prevNode = 0
    while True:
        currNode = Nodes.nearest_node
        if(currNode != prevNode):
            await websocket.send(str(currNode))
            prevNode = currNode
        await asyncio.sleep(2)

start_server = websockets.serve(time, '0.0.0.0', 5678)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
