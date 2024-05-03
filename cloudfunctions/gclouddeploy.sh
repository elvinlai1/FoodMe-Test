gcloud functions deploy FirestoreTest \
--gen2 \
--runtime=go121 \
--region=us-west1 \
--trigger-location=us-west1 \
--source=. \
--entry-point=FirestoreTest \
--trigger-event-filters=type=google.cloud.firestore.document.v1.written \
--trigger-event-filters=database='(default)' \
--trigger-event-filters-path-pattern=document='user_reciepts/{imageBucket}'