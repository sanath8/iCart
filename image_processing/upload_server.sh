echo "taking snapshot"
fswebcam  images/webcam.jpg 
echo "snapshot successful"

user_name="sanath" 
server_ip="192.168.1.5"

echo "transferring captured image to remote server"
 sshpass -p "0987" scp -p images/webcam.jpg  $user_name@$server_ip:./ITS1/iCart/image_processing/images
echo "image transferred successfully"



