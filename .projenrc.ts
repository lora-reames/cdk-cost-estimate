import { awscdk, javascript } from 'projen';
const project = new awscdk.AwsCdkConstructLibrary({
  author: 'Lora Reames',
  authorAddress: 'shes.lora.reames@gmail.com',
  cdkVersion: '2.1.0',
  cdkVersionPinning: true,
  defaultReleaseBranch: 'main',
  jsiiVersion: '~5.4.0',
  constructsVersion: '10.3.0',
  name: 'cdk-cost-estimate',
  packageManager: javascript.NodePackageManager.NPM,
  projenrcTs: true,
  repositoryUrl: 'https://github.com/lora-reames/cdk-cost-estimate.git',

  deps: ['aws-sdk', '@aws-sdk/client-pricing'],
  bundledDeps: ['aws-sdk', '@aws-sdk/client-pricing'],
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  devDeps: ['constructs@10.3.0'],
  // packageName:
  // undefined,  /* The "name" in package.json. */
});
project.synth();
