import { CfnResource, Stack } from 'aws-cdk-lib';

export const resolvePrimitive = (node: CfnResource, parameter: any): any => {
  const resolvedValue = Stack.of(node).resolve(parameter);
  if (resolvedValue === Object(resolvedValue)) {
    throw Error(
      `The parameter resolved to to a non-primitive value "${JSON.stringify(
        resolvedValue,
      )}"`,
    );
  } else {
    return resolvedValue;
  }
};

export const resolveIntrinsic = (
  node: CfnResource,
  parameter: any,
): any => {
  const resolvedValue = Stack.of(node).resolve(parameter);
  const ref = resolvedValue?.Ref;
  const getAtt = resolvedValue?.['Fn::GetAtt'];
  if (ref != undefined) {
    return ref;
  } else if (Array.isArray(getAtt) && getAtt.length > 0) {
    return getAtt[0];
  }
  return resolvedValue;
};
