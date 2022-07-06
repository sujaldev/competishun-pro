from flask import Flask, make_response
import requests
import re

app = Flask(__name__)


def fetch_original_script(url="https://competishundigital.com/umi.398207bb.js"):
    request = requests.get(url)
    if request.ok:
        return request.content.decode()
    return ""


def modified_script():
    script = fetch_original_script()
    matches = re.findall("checkMultiple:.*?}", script)
    for match in matches:
        script = script.replace(match, "checkMultiple: 0}")
    return script


@app.route("/")
def home():
    response = make_response(modified_script(), 200)
    response.mimetype = "application/javascript"
    return response


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=55000)
