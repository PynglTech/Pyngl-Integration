from flask import Flask, request, jsonify
import cv2
import numpy as np

# Initialize the Flask app
app = Flask(__name__)

# Load the pre-trained Haar Cascade model for face detection
face_cascade = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')

@app.route('/analyze', methods=['POST'])
def analyze_image():
    # Check if a file was sent
    if 'image' not in request.files:
        return jsonify({"error": "No image file provided"}), 400
    
    file = request.files['image']
    
    # Read the image file as a numpy array
    filestr = file.read()
    npimg = np.frombuffer(filestr, np.uint8)
    image = cv2.imdecode(npimg, cv2.IMREAD_COLOR)

    # Convert to grayscale for the detector
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    # Detect faces
    faces = face_cascade.detectMultiScale(gray, 1.1, 4)
    
    focal_point = None
    if len(faces) > 0:
        # Find the largest face
        largest_face = max(faces, key=lambda rect: rect[2] * rect[3])
        x, y, w, h = largest_face
        focal_point = {"x": int(x), "y": int(y), "width": int(w), "height": int(h)}

    return jsonify({"focalPoint": focal_point})

if __name__ == '__main__':
    # Run the service on a different port than your Node app, e.g., 5002
    app.run(host='0.0.0.0', port=5002)