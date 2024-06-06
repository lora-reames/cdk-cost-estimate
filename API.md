# API Reference <a name="API Reference" id="api-reference"></a>



## Classes <a name="Classes" id="Classes"></a>

### CostReportingAspect <a name="CostReportingAspect" id="cdk-cost-estimate.CostReportingAspect"></a>

- *Implements:* aws-cdk-lib.IAspect

#### Initializers <a name="Initializers" id="cdk-cost-estimate.CostReportingAspect.Initializer"></a>

```typescript
import { CostReportingAspect } from 'cdk-cost-estimate'

new CostReportingAspect()
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-cost-estimate.CostReportingAspect.visit">visit</a></code> | All aspects can visit an IConstruct. |

---

##### `visit` <a name="visit" id="cdk-cost-estimate.CostReportingAspect.visit"></a>

```typescript
public visit(node: IConstruct): void
```

All aspects can visit an IConstruct.

###### `node`<sup>Required</sup> <a name="node" id="cdk-cost-estimate.CostReportingAspect.visit.parameter.node"></a>

- *Type:* constructs.IConstruct

---


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-cost-estimate.CostReportingAspect.property.resourceCosts">resourceCosts</a></code> | <code>{[ key: string ]: number}</code> | *No description.* |

---

##### `resourceCosts`<sup>Required</sup> <a name="resourceCosts" id="cdk-cost-estimate.CostReportingAspect.property.resourceCosts"></a>

```typescript
public readonly resourceCosts: {[ key: string ]: number};
```

- *Type:* {[ key: string ]: number}

---



