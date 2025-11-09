import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, FileImage } from "lucide-react";

export interface TestHistoryItem {
  id: string;
  date: Date;
  imageThumbnail?: string;
  summary: string;
}

interface TestHistoryProps {
  tests: TestHistoryItem[];
  onSelectTest?: (testId: string) => void;
}

export default function TestHistory({ tests, onSelectTest }: TestHistoryProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle data-testid="text-history-title">Test History</CardTitle>
      </CardHeader>
      <CardContent>
        {tests.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground" data-testid="text-no-history">
            <FileImage className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p className="text-sm">No previous tests</p>
          </div>
        ) : (
          <div className="space-y-3">
            {tests.map((test) => (
              <div
                key={test.id}
                className="flex items-center gap-3 p-3 rounded-md border hover-elevate cursor-pointer"
                onClick={() => onSelectTest?.(test.id)}
                data-testid={`history-item-${test.id}`}
              >
                {test.imageThumbnail ? (
                  <img
                    src={test.imageThumbnail}
                    alt="Test thumbnail"
                    className="w-16 h-16 rounded object-cover border"
                    data-testid={`img-thumbnail-${test.id}`}
                  />
                ) : (
                  <div className="w-16 h-16 rounded bg-muted flex items-center justify-center">
                    <FileImage className="h-6 w-6 text-muted-foreground" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Calendar className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground" data-testid={`text-date-${test.id}`}>
                      {test.date.toLocaleDateString()} at {test.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-sm truncate" data-testid={`text-summary-${test.id}`}>
                    {test.summary}
                  </p>
                </div>
                <Button variant="ghost" size="sm" data-testid={`button-view-${test.id}`}>
                  View
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
