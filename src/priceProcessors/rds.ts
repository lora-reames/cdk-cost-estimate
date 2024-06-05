// RDSInstancePriceProcessor.ts
// import { PricingClient } from '@aws-sdk/client-pricing';
// import { DatabaseInstance } from 'aws-cdk-lib/aws-rds';
import { CfnDBInstance } from 'aws-cdk-lib/aws-rds';
import { PriceProcessor } from '.';
import { resolvePrimitive } from '../utils/resolve';

// const pricingClient = new PricingClient({ region: 'us-east-1' });

const prices: Record<string, Record<string, number>> = {
  postgres: {
    'db.t4g.micro': 0.016,
  },
};

const storageTypeCost: Record<string, number> = {
  gp2: 0.115,
};

export const RDSInstancePriceProcessor: PriceProcessor = {
  async calculateEstimatedCost(resource): Promise<number | undefined> {
    const resourceCfn = resource as CfnDBInstance;
    // let instance = node.defaultChild as DatabaseInstance;
    // Implement logic to calculate estimated cost for RDS instances
    // Retrieve pricing data from AWS Pricing API
    // Calculate estimated cost based on instance type, region, etc.

    const dbProps = {
      instanceClass: resolvePrimitive(resource, resourceCfn.dbInstanceClass),
      engine: resolvePrimitive(resource, resourceCfn.engine),
      storageAmount: resolvePrimitive(resource, resourceCfn.allocatedStorage),
      storageType: resolvePrimitive(resource, resourceCfn.storageType),
    };

    const instanceCostMonthly = prices[dbProps.engine][dbProps.instanceClass] * 730;
    const storageCostMonthly = parseInt(dbProps.storageAmount) * storageTypeCost[dbProps.storageType];

    const monthlyCost = instanceCostMonthly + storageCostMonthly;

    console.log(resourceCfn.cfnResourceType + '\n');
    console.table({ ...dbProps, cost: monthlyCost });
    return monthlyCost;
  },
};
