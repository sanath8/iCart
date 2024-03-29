from __future__ import absolute_import
from __future__ import division
from __future__ import print_function
from __future__ import unicode_literals

import argparse
import logging
import warnings

from policy import RestaurantPolicy
from rasa_core import utils
from rasa_core.agent import Agent
from rasa_core.policies.memoization import MemoizationPolicy

logger = logging.getLogger(__name__)


class RestaurantAPI(object):
    def search(self, info):
        return "papi's pizza place"


def train_dialogue(domain_file="shop_domain.yml",
                   model_path="models/dialogue",
                   training_data_file="data/babi_stories.md"):

    from rasa_core.policies.keras_policy import KerasPolicy
    from rasa_core.agent import Agent
    agent = Agent(domain_file,
                   policies=[KerasPolicy()])

    training_data = agent.load_data(training_data_file)
    agent.train(
            training_data,
            epochs=2000,
            batch_size=100,
            validation_split=0.2
    )
    print(type(str(model_path)))
    agent.persist(str(model_path))
    return agent




def train_nlu():
    from rasa_nlu.training_data import load_data
    from rasa_nlu import config
    from rasa_nlu.model import Trainer

    training_data = load_data('data/nlu_data.json')
    trainer = Trainer(config.load("nlu_model_config.yml"))
    trainer.train(training_data)
    model_directory = trainer.persist('models/nlu/',
                                      fixed_model_name="current")

    return model_directory

def run():
    from rasa_core.agent import Agent
    agent = Agent.load('models/dialogue')
    print("Your bot is ready to talk! Type your messages here or send 'stop'")
    while True:
        a = str(input())
        if a == 'stop':
            break
        responses = agent.handle_text(a)
        for response in responses:
            print(response["text"])

if __name__ == '__main__':
    utils.configure_colored_logging(loglevel="INFO")

    parser = argparse.ArgumentParser(
            description='starts the bot')

    parser.add_argument(
            'task',
            choices=["train-nlu", "train-dialogue", "run"],
            help="what the bot should do - e.g. run or train?")
    task = parser.parse_args().task

    # decide what to do based on first parameter of the script
    if task == "train-nlu":
        train_nlu()
    elif task == "train-dialogue":
        train_dialogue()
    elif task == "run":
        run()
