echo "taking snapshot"
fswebcam  images/webcam.jpg 
echo "snapshot successful"

user_name="pi" 
server_ip="127.0.0.1"
password=""

echo "transferring captured image to remote server"
sshpass -p $password scp -p images/webcam.jpg  $user_name@$server_ip:./ITS1/iCart/image_processing/images
echo "image transferred successfully"



