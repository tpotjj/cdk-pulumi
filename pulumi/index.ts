import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";

// STEP 1: Create the same AWS resource (S3 Bucket), with the same name & props as CDK
// This is the equivalent of the CDK code in cdk/lib/cdk-stack.ts
// const bucket = new aws.s3.Bucket("cdk-to-pulumi",{
//     versioning: { enabled: false },
//     forceDestroy: true, // equivalent of CDK's autoDeleteObjects
// });

// STEP 2: Then import the bucket into the stack
// pulumi import aws:s3/bucket:Bucket cdk-to-pulumi cdk-to-pulumi

// This command will display the code which can be used to import the bucket into the stack
const bucket = new aws.s3.Bucket("cdk-to-pulumi", {
    arn: "arn:aws:s3:::cdk-to-pulumi",
    bucket: "cdk-to-pulumi",
    hostedZoneId: "Z21DNDUVLTQW6Q",
    requestPayer: "BucketOwner",
    serverSideEncryptionConfiguration: {
        rule: {
            applyServerSideEncryptionByDefault: {
                sseAlgorithm: "AES256",
            },
        },
    },
    tags: {
        "aws-cdk:auto-delete-objects": "true",
    },
}, {
    protect: true,
});

// STEP 3: make preview --> confirm no changes are planned
// STEP 4: make up --> applies the current Pulumi program (index.ts) and syncs it with Pulumi's state
// STEP 5: Delete CloudFormation stacks: aws cloudformation delete-stack --stack-name
// STEP 6: Delete the CDK project: rm -rf cdk

// Export the name of the bucket
export const bucketName = bucket.id;
