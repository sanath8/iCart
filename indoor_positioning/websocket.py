#!/usr/bin/env python

# WS server that sends messages at random intervals

import asyncio
import datetime
import random
import websockets
from thread import *
from mobile import MobileInfo


async def time(websocket, path):
    while True:

        thread_list = []
        for each_key in MobileInfo.mobiles:
        	thread = myThread(each_key, MobileInfo.mobiles[each_key]["name"], MobileInfo.mobiles[each_key]["bt_addr"])
        	thread_list.append(thread)
        	thread.start()


        await websocket.send(Nodes.nearest_node)
        await asyncio.sleep(2)

start_server = websockets.serve(time, '0.0.0.0', 5678)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
