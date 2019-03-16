#!/usr/bin/python

import threading
import time
from bt_proximity import BluetoothRSSI
from mobile import MobileInfo
exitFlag = 0

class Nodes:
	nearest_node = 0

	def set_nearest_node(id):
		nearest_node = id

	def get_nearest_node():
		return nearest_node

	def get_nearest_node_name():
		return MobileInfo.mobiles[nearest_node]["name"]

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
				Nodes.set_nearest_node(threadId)
			#print("Nearest node-name is ", Nodes.get_nearest_node_name(), "Node ID", Nodes.get_nearest_node())
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
