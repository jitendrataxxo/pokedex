import os
import sys
import logging
from multiprocessing import Process

DJANGO_LOGGER = logging.getLogger('DJANGO')
NODE_LOGGER = logging.getLogger('NPM')


def main():
    args = sys.argv[1:]
    if '-p' in args:
        django_cli(args)
    elif '-n' in args:
        node_cli(args)
    elif 'start' in args:
        Process(target=node_cli, args=[["-n", "start"]]).start()
        Process(target=django_cli, args=[["-p", "runserver"]]).start()


def django_cli(args):
    args = ["cd ./backend && python", "./manage.py"] + args[1:]
    os.system(" ".join(args))


def node_cli(args):
    args = ["cd ./client && yarn"] + args[1:]
    os.system(" ".join(args))


main()
