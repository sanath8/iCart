#!/usr/bin/python

import threading
import time
from bt_proximity import BluetoothRSSI
from mobile import MobileInfo
exitFlag = 0

class Nodes:
	def __init__(self):
		self.nearest_node = 0

	def set_nearest_node(self, id):
		self.nearest_node = id

	def get_nearest_node(self):
		return self.nearest_node

	def get_nearest_node_name(self):
		return MobileInfo.mobiles[self.nearest_node]["name"]
	
class myThread (threading.Thread):
	def __init__(self, threadID, name, b_addr):
		threading.Thread.__init__(self)
		self.threadID = threadID
		self.name = name
		self.b_addr = b_addr

	def run(self):
		IPS(self.b_addr).run_tracking_system(self.threadID, self.name, 20, 1)


class IPS:
	def __init__(self, b_addr):
		self.no_signal_counter = 0
		self.b_addr = b_addr

	def run_tracking_system(self, threadId, threadName, counter, delay):
		b = BluetoothRSSI(addr=self.b_addr)
		while True:
			if exitFlag:
				threadName.exit()
			time.sleep(delay)
			rssi = self.get_rssi_value(b)
			print ("%s: %s" % (threadName, rssi))
			if(self.sensor_passive(rssi)):
				b = self.reset_bluetooth_instance()
			if(rssi > 0):
				node_marker.set_nearest_node(threadId)
			print("Nearest node-name is ", node_marker.get_nearest_node_name(), "Node ID", node_marker.get_nearest_node())
			counter -= 1

	def get_rssi_value(self, b):
	   rssi = b.get_rssi()
	   return rssi

	def sensor_passive(self, rssi):
		if(rssi == 0 or rssi == None):
			self.no_signal_counter += 1
		else:
			self.no_signal_counter = 0
		if(self.no_signal_counter > 5):
			return True
		else:
			return False

	def reset_bluetooth_instance(self):
		return BluetoothRSSI(addr=self.b_addr)
			
		
node_marker = Nodes()

# Create new threads
#addr1="74:23:44:3F:58:04"
#addr2="70:BB:E9:4A:94:17"
#thread1 = myThread(1, "note-3", addr1)
#thread2 = myThread(2, "note-6 pro", addr2)

# Start new Threads
#thread1.start()
#thread2.start()
thread_list = []
for each_key in MobileInfo.mobiles:
	thread = myThread(each_key, MobileInfo.mobiles[each_key]["name"], MobileInfo.mobiles[each_key]["bt_addr"])
	thread_list.append(thread)	
	thread.start()



print "Exiting Main Thread"
