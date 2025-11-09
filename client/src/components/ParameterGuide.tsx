import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ParameterInfo {
  code: string;
  name: string;
  description: string;
  normalRange: string;
}

const parameterInfo: ParameterInfo[] = [
  {
    code: 'L',
    name: 'Leukocyte',
    description: 'White blood cells in urine. Elevated levels may indicate urinary tract infection or kidney disease.',
    normalRange: 'Negative'
  },
  {
    code: 'N',
    name: 'Nitrite',
    description: 'Indicates presence of bacteria that convert nitrate to nitrite. Positive result suggests bacterial infection.',
    normalRange: 'Negative'
  },
  {
    code: 'U',
    name: 'Urobilinogen',
    description: 'Byproduct of bilirubin breakdown. Abnormal levels may indicate liver disease or hemolytic disorders.',
    normalRange: '0.1-1.0 mg/dL'
  },
  {
    code: 'P',
    name: 'Protein',
    description: 'Presence of protein in urine may indicate kidney damage or disease. Small amounts may be normal after exercise.',
    normalRange: 'Negative or trace'
  },
  {
    code: 'PH',
    name: 'pH Level',
    description: 'Measures acidity or alkalinity of urine. Can indicate metabolic or respiratory conditions.',
    normalRange: '5.0-8.0'
  },
  {
    code: 'B',
    name: 'Blood',
    description: 'Red blood cells in urine. May indicate kidney stones, infection, or other urinary tract problems.',
    normalRange: 'Negative'
  },
  {
    code: 'S',
    name: 'Specific Gravity',
    description: 'Measures urine concentration. Indicates kidney ability to concentrate or dilute urine.',
    normalRange: '1.005-1.030'
  },
  {
    code: 'K',
    name: 'Ketone',
    description: 'Produced when body burns fat for energy. High levels may indicate diabetes or starvation.',
    normalRange: 'Negative'
  },
  {
    code: 'Bi',
    name: 'Bilirubin',
    description: 'Breakdown product of red blood cells. Presence may indicate liver disease or bile duct obstruction.',
    normalRange: 'Negative'
  },
  {
    code: 'G',
    name: 'Glucose',
    description: 'Sugar in urine. Presence may indicate diabetes or kidney problems affecting glucose reabsorption.',
    normalRange: 'Negative'
  },
];

export default function ParameterGuide() {
  return (
    <Card>
      <CardHeader>
        <CardTitle data-testid="text-guide-title">Parameter Guide</CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {parameterInfo.map((param) => (
            <AccordionItem key={param.code} value={param.code} data-testid={`accordion-item-${param.code.toLowerCase()}`}>
              <AccordionTrigger className="hover:no-underline" data-testid={`accordion-trigger-${param.code.toLowerCase()}`}>
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="font-mono text-xs" data-testid={`badge-param-${param.code.toLowerCase()}`}>
                    {param.code}
                  </Badge>
                  <span className="text-sm font-medium" data-testid={`text-param-name-${param.code.toLowerCase()}`}>
                    {param.name}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-2 pl-12" data-testid={`accordion-content-${param.code.toLowerCase()}`}>
                <p className="text-sm text-foreground">{param.description}</p>
                <div className="pt-1">
                  <span className="text-xs font-medium text-muted-foreground">Normal Range: </span>
                  <span className="text-xs text-foreground">{param.normalRange}</span>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}
