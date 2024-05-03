package cloudvisionfunction

import (
	"context"
	"fmt"
	"log"

	vision "cloud.google.com/go/vision/apiv1"
	"github.com/GoogleCloudPlatform/functions-framework-go/functions"

	"github.com/cloudevents/sdk-go/v2/event"
	"github.com/googleapis/google-cloudevents-go/cloud/firestoredata"
	"google.golang.org/protobuf/proto"
)

func init() {
	functions.CloudEvent("FirestoreVision", FirestoreVision)
	functions.CloudEvent("FirestoreTest", FirestoreTest)
}

func FirestoreVision(ctx context.Context, event event.Event) error {
	var data firestoredata.DocumentEventData
	if err := proto.Unmarshal(event.Data(), &data); err != nil {
		return fmt.Errorf("proto.Unmarshal: %w", err)
	}

	fmt.Printf("Function triggered by change to: %v\n", event.Source())
	fmt.Printf("New value: %+v\n", data.GetValue())

	client, err := vision.NewImageAnnotatorClient(ctx)
	if err != nil {
		log.Fatalf("Failed to create client: %v", err)
	}
	defer client.Close()

	image := vision.NewImageFromURI(data.GetValue().String())
	if err != nil {
		log.Fatalf("Failed to create image: %v", err)
	}

	labels, err := client.DetectTexts(ctx, image, nil, 10)
	if err != nil {
		log.Fatalf("Failed to detect labels: %v", err)
	}

	fmt.Println("Labels:")
	for _, label := range labels {
		fmt.Println(label.Description)
	}

	return nil
}

func FirestoreTest(ctx context.Context, event event.Event) error {
	var data firestoredata.DocumentEventData
	if err := proto.Unmarshal(event.Data(), &data); err != nil {
		return fmt.Errorf("proto.Unmarshal: %w", err)
	}

	imageBucketURI := data.GetValue().GetFields()["imageBucket"].GetStringValue()

	fmt.Printf("Fields: %+v\n", data.GetValue().GetFields())
	fmt.Printf("imageBucketURI: %+v\n", imageBucketURI)

	return nil
}
