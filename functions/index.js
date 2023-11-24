/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const functions = require("firebase-functions");
const vision = require("@google-cloud/vision");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

exports.ocrTest = functions.https.onRequest(async (response) => {
  const client = new vision.ImageAnnotatorClient();
  const [textDetect] = await client.textDetection("./resources/wakeupcat.jpg");
  const annotation = textDetect.textAnnotations;
  const text = annotation ? annotation.description : "";
  if (text != null) {
    Array.from(text).forEach((char) => console.log(char));
    response.send(text);
  } else {
    response.send("No text found");
  }
});

// firestore triggers
// exports.onReceiptAdd = functions.firestore
//   .document("user_reciepts/{recieptId}")
//   .onCreate((snap, context) => {
//     const newValue = snap.data();
//     console.log("New reciept added: ", newValue);
//     return 0;
//   });

exports.readReciept = functions.storage
    .object().onFinalize(async (object, response) => {
      const imageBucket = `gs://${object.bucket}/${object.name}`;
      const client = new vision.ImageAnnotatorClient();
      const [textDetect] = await client.textDetection(imageBucket);
      const annotation = textDetect.textAnnotations;
      const text = annotation ? annotation.description : "";
      if (text != null) {
        Array.from(text).forEach((char) => console.log(char));
        response.send(text);
      } else {
        response.send("No text found");
      }
    });


    