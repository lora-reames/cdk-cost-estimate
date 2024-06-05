import { IAspect, CfnResource } from 'aws-cdk-lib';
// import { CfnResource } from 'aws-cdk-lib/aws-cloudformation';
// import { Pricing } from 'aws-sdk';
// import { DescribeServicesRequest } from "aws-sdk/clients/pricing";
import { IConstruct } from 'constructs';
import { PriceProcessor, priceProcessors } from './priceProcessors';

// Define a custom aspect to collect resource information and their estimated costs
export class CostReportingAspect implements IAspect {
  // private readonly pricingClient: Pricing;
  resourceCosts: { [key: string]: number } = {};

  constructor() {
    // this.pricingClient = new Pricing({ region: 'us-east-1' }); // Adjust the region as per your requirement
  }

  public async visit(node: IConstruct): Promise<void> {
    // Collect resources and their costs
    // node.node.children.forEach( async (child, index, array) => {
    //   if ((child as CfnResource).cfnResourceType) {
    //     const resourceType = (child as CfnResource).cfnResourceType;
    //     console.log({ child: resourceType, index, length: array.length });
    //     // const resourceProps = (child as CfnResource).node.metadata;
    //     const resourceId = child.node.addr;
    //     const priceProcessor = this.getPriceProcessor(resourceType);
    //     if (priceProcessor) {
    //       const estimatedCost = await priceProcessor.calculateEstimatedCost(
    //         child as CfnResource,
    //       );
    //       // await priceProcessor.calculateEstimatedCost(child as CfnResource);
    //       if (estimatedCost) {
    //         // console.log('HERE', { estimatedCost, resourceType, resourceId });
    //         this.resourceCosts[`${resourceType}:${resourceId}`] = estimatedCost;
    //         const currentTotal = Object.values(this.resourceCosts).reduce((prev, curr) => prev += curr, 0);
    //         console.log({ currentTotal });
    //         // console.log(this.resourceCosts);
    //       }
    //     } else {
    //       console.warn(
    //         `No price processor found for resource type: ${resourceType} \n`,
    //       );
    //     }
    //   }
    // });

    if ((node as CfnResource).cfnResourceType) {
    console.log('visit called', (node as CfnResource).cfnResourceType);

      const resourceType = (node as CfnResource).cfnResourceType;
      // const resourceProps = (child as CfnResource).node.metadata;
      const resourceId = node.node.addr;
      const priceProcessor = this.getPriceProcessor(resourceType);
      if (priceProcessor) {
        const estimatedCost = await priceProcessor.calculateEstimatedCost(
          node as CfnResource,
        );
        // await priceProcessor.calculateEstimatedCost(child as CfnResource);
        if (estimatedCost) {
          // console.log('HERE', { estimatedCost, resourceType, resourceId });
          this.resourceCosts[`${resourceType}:${resourceId}`] = estimatedCost;
          const currentTotal = Object.values(this.resourceCosts).reduce(
            (prev, curr) => (prev += curr),
            0,
          );
          console.log({ currentTotal });
          // console.log(this.resourceCosts);
        }
      } else {
        console.warn(
          `No price processor found for resource type: ${resourceType} \n`,
        );
      }
    }

    // Print cost report
    // const nodeType = (node as CfnResource).cfnResourceType;
    // if (nodeType) {
    //   console.log('Cost Report:', nodeType);
    //   console.log('-------------\n');
    //   console.log({ resourceCosts: this.resourceCosts });
    //   for (const [resource, cost] of Object.entries(this.resourceCosts)) {
    //     console.log(`${resource} - $${cost}`);
    //   }
    //   console.log('\n');
    // }
  }

  private getPriceProcessor(resourceType: string): PriceProcessor | undefined {
    const priceProcessor = priceProcessors[resourceType];
    if (priceProcessor) {
      return priceProcessor;
    }
    // If no specific price processor is found for the resource type, you might want to have a fallback mechanism
    // For example, you could have a generic price processor for resources that don't have a specific processor
    // This could be useful for handling resources that have common pricing attributes
    // Example:
    // return genericPriceProcessor;
    return undefined;
  }
}

// Attach the custom aspect to your CDK app
// const app = new App();
// Aspects.of(app).add(new CostReportingAspect());

// Define your stacks and constructs
// const stack1 = new MyStack1(app, 'MyStack1', { /* stack configuration */ });
// const stack2 = new MyStack2(app, 'MyStack2', { /* stack configuration */ });

// Synthesize the CDK app
// app.synth();
