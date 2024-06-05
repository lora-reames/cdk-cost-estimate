import { CfnResource } from 'aws-cdk-lib';
import { EC2PriceProcessor } from './ec2';
import { RDSInstancePriceProcessor } from './rds';
import { S3BucketPriceProcessor } from './s3';
import { VPCPriceProcessor } from './vpc';


export interface PriceProcessor {
  calculateEstimatedCost(node: CfnResource): Promise<number | undefined>;
}

export const priceProcessors: { [resourceType: string]: PriceProcessor } = {
  'AWS::EC2::VPC': VPCPriceProcessor,
  'AWS::EC2::Instance': EC2PriceProcessor,
  'AWS::S3::Bucket': S3BucketPriceProcessor,
  'AWS::RDS::DBInstance': RDSInstancePriceProcessor,
};
