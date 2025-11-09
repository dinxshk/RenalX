import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle } from "lucide-react";

export interface TestParameter {
  code: string;
  name: string;
  result: string;
  isNormal?: boolean;
}

interface TestResultsProps {
  results: TestParameter[];
  testDate?: Date;
}

export default function TestResults({ results, testDate }: TestResultsProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between gap-2">
          <CardTitle data-testid="text-results-title">Test Results</CardTitle>
          {testDate && (
            <span className="text-sm text-muted-foreground" data-testid="text-test-date">
              {testDate.toLocaleDateString()} {testDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {results.map((param, index) => (
          <div
            key={param.code}
            className="flex items-center justify-between gap-4 p-3 rounded-md border hover-elevate"
            data-testid={`result-item-${param.code.toLowerCase()}`}
          >
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="font-mono text-xs min-w-[2.5rem] justify-center" data-testid={`badge-code-${param.code.toLowerCase()}`}>
                {param.code}
              </Badge>
              <div>
                <p className="font-medium text-sm" data-testid={`text-name-${param.code.toLowerCase()}`}>
                  {param.name}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-base" data-testid={`text-result-${param.code.toLowerCase()}`}>
                {param.result}
              </span>
              {param.isNormal !== undefined && (
                param.isNormal ? (
                  <CheckCircle2 className="h-5 w-5 text-green-600" data-testid={`icon-normal-${param.code.toLowerCase()}`} />
                ) : (
                  <XCircle className="h-5 w-5 text-destructive" data-testid={`icon-abnormal-${param.code.toLowerCase()}`} />
                )
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
