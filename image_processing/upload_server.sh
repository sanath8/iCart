echo "taking snapshot"
fswebcam  images/webcam.jpg
echo "snapshot successful"

user_name="pi"
server_ip="192.168.1.7"
password="0987"
server_path="./ITS1/iCart/FaceExtraction/demo/webcam.jpg"

echo "transferring captured image to remote server"
sshpass -p $password scp -p images/webcam.jpg  $user_name@$server_ip:$server_path
echo "image transferred successfully"
