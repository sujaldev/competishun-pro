mkdir /opt/competishun-server
cd /opt/competishun-server || exit
wget https://github.com/sujaldev/competishun-pro/blob/server/server/script_modifier_server.py
wget https://github.com/sujaldev/competishun-pro/blob/server/server/requirements.txt
virtualenv env
source env/bin/activate
pip3 install -r requirements.txt

wget https://github.com/sujaldev/competishun-pro/blob/server/server/competishun-server.service
mv competishun-server.service /etc/systemd/system/
systemctl daemon-reload
systemctl status competishun-server
