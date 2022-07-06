mkdir ~/.competishun-server
cd ~/.competishun-server || exit
wget https://github.com/sujaldev/competishun-pro/blob/server/server/script_modifier_server.py
wget https://github.com/sujaldev/competishun-pro/blob/server/server/requirements.txt
virtualenv env
source env/bin/activate
pip3 install -r requirements.txt

wget https://github.com/sujaldev/competishun-pro/blob/server/server/competishun-server.service
