import { App, Aspects, Stack } from 'aws-cdk-lib';
import { InstanceType, Vpc } from 'aws-cdk-lib/aws-ec2';
import { DatabaseInstance, DatabaseInstanceEngine, StorageType } from 'aws-cdk-lib/aws-rds';
import { Bucket } from 'aws-cdk-lib/aws-s3';
import { CostReportingAspect } from '../src/index';


it('should work i guess', () => {
  const testApp = new App();
  Aspects.of(testApp).add(new CostReportingAspect());
  const testStack = new Stack(testApp, 'testStack');
  const vpc = new Vpc(testStack, 'vpc');
  new Bucket(testStack, 'bucket', { bucketName: 'test-bucket' });
  new DatabaseInstance(testStack, 'Database', {
    engine: DatabaseInstanceEngine.POSTGRES,
    availabilityZone: 'us-east-1a',
    instanceType: new InstanceType('t4g.micro'),
    storageType: StorageType.GP2,
    allocatedStorage: 20,
    vpc: vpc,
    databaseName: 'dbName',
  }); expect(testApp.synth()).toBeInstanceOf(Object);
});