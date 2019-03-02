from rasa_core_sdk import Action
from rasa_core_sdk.events import SlotSet
from bot import RestaurantAPI

class ActionSearchItem(Action):
    def name(self):
        return 'actions_search_item'

    def run(self, dispatcher, tracker, domain):
        msg = "Yes, we do have them in our stock. Would you like to see the location for " + tracker.get_slot("item") + " ?"
        dispatcher.utter_message(msg)
        return []

"""class ActionSearchRestaurants(Action):
    def name(self):
        return 'action_search_restaurants'

    def run(self, dispatcher, tracker, domain):
        dispatcher.utter_message("looking for restaurants")
        restaurant_api = Restaurestaurant_apirantAPI()
        restaurants = restaurant_api.search(tracker.get_slot("cuisine"))
        return [SlotSet("matches", restaurants)]


class ActionSuggest(Action):
    def name(self):
        return 'action_suggest'

    def run(self, dispatcher, tracker, domain):
        dispatcher.utter_message("here's what I found:")
        dispatcher.utter_message(tracker.get_slot("matches"))
        dispatcher.utter_message("is it ok for you? "
                                 "hint: I'm not going to "
                                 "find anything else :)")
        return []"""
