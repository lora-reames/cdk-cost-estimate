import { PriceProcessor } from '.';

export const VPCPriceProcessor: PriceProcessor = {
  async calculateEstimatedCost(resource): Promise<number | undefined> {
    // Implement logic to calculate estimated cost for EC2 instances
    // Retrieve pricing data from AWS Pricing API
    // Calculate estimated cost based on instance type, region, etc.
	console.log(resource.cfnResourceType, 'TESTING BS ADD 300');
    return 300;
  },
};