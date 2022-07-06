import urllib3
import sys
import re

URL = "https://competishundigital.com/umi.398207bb.js"


def fetch_original_script():
    request = urllib3.PoolManager().request("GET", URL)
    if request.status == 200:
        return request.data.decode()
    sys.exit("Error Fetching Original Script")


def modified_script():
    script = fetch_original_script()
    matches = re.findall("checkMultiple:.*?}", script)
    for match in matches:
        script = script.replace(match, "checkMultiple: 0}")
    return script


def script_remains_unchanged():
    new_script = fetch_original_script()
    with open("umi.398207bb.js") as old_script:
        return new_script == old_script.read()


def main():
    if script_remains_unchanged():
        return
    with open("modified.js", "w") as script:
        script.write(modified_script())


main()
