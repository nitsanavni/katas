import sys
import pexpect
import time


def test_temp():
    mm = pexpect.spawn(
        "/home/gitpod/.nvm/versions/node/v16.13.2/bin/node index.js 3.mm", encoding='utf-8')
    time.sleep(1)
    assert mm.readline() + mm.readline() == ''
