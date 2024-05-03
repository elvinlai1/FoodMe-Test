/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const functions = require("firebase-functions");
const logger = require("firebase-functions/logger");
const vision = require("@google-cloud/vision");


// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

exports.readReciept = functions.storage
    .object().onFinalize(async (object, response) => {
      const imageBucket = `gs://${object.bucket}/${object.name}`;
      const client = new vision.ImageAnnotatorClient();
      const [textDetect] = await client.textDetection(imageBucket);
      const annotation = textDetect.textAnnotations;
      const text = annotation ? annotation.description : "";
      if (text != null) {
        Array.from(text).forEach((char) => console.log(char));
      } else {
        response.send("No text found");
      }
    });

exports.readRecieptManually = functions.https
    .onRequest(async (request) => {
      const imageBucket = request.body.image;
      logger.log(imageBucket);
      const client = new vision.ImageAnnotatorClient();
      const [textDetect] = await client.textDetection(imageBucket);
      const annotation = textDetect.textAnnotations;
      const text = annotation ? annotation.description : "";
      logger.log(text);
    });
