import pexpect
import time


def test_temp():
    temp = pexpect.spawn('/usr/bin/mktemp').readline().strip().decode()
    mm = pexpect.spawn(
        f"/home/gitpod/.nvm/versions/node/v16.13.2/bin/node index.js {temp}")
    time.sleep(1)
    mm.expect('>')
    mm.send('\t')
    assert mm.read().decode() == ''
