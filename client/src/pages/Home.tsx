import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ImageUpload from "@/components/ImageUpload";
import TestResults, { TestParameter } from "@/components/TestResults";
import ParameterGuide from "@/components/ParameterGuide";
import TestHistory, { TestHistoryItem } from "@/components/TestHistory";
import Header from "@/components/Header";
import { Loader2, FileCheck } from "lucide-react";
import sampleDipstickImage from "@assets/IMG_20251109_102721_1762675147625.jpg";

export default function Home() {
  const [currentImage, setCurrentImage] = useState<string>();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [testResults, setTestResults] = useState<TestParameter[] | null>(null);
  const [testDate, setTestDate] = useState<Date>();
  const [testHistory, setTestHistory] = useState<TestHistoryItem[]>([]);

  const sampleResults: TestParameter[] = [
    { code: 'L', name: 'Leukocyte', result: 'Negative', isNormal: true },
    { code: 'N', name: 'Nitrite', result: 'Negative', isNormal: true },
    { code: 'U', name: 'Urobilinogen', result: '1/17', isNormal: true },
    { code: 'P', name: 'Protein', result: 'Negative', isNormal: true },
    { code: 'PH', name: 'pH', result: '6.0', isNormal: true },
    { code: 'B', name: 'Blood', result: 'Negative', isNormal: true },
    { code: 'S', name: 'Specific Gravity', result: '1.020', isNormal: true },
    { code: 'K', name: 'Ketone', result: '80 (8.0)', isNormal: false },
    { code: 'Bi', name: 'Bilirubin', result: 'Negative', isNormal: true },
    { code: 'G', name: 'Glucose', result: 'Negative', isNormal: true },
  ];

  const handleImageSelected = (file: File, preview: string) => {
    setCurrentImage(preview);
    setTestResults(null);
    console.log('Image selected:', file.name);
  };

  const handleClearImage = () => {
    setCurrentImage(undefined);
    setTestResults(null);
    console.log('Image cleared');
  };

  const handleAnalyzeImage = async () => {
    setIsAnalyzing(true);
    console.log('Analyzing image...');
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setTestResults(sampleResults);
    const now = new Date();
    setTestDate(now);
    
    setTestHistory(prev => [{
      id: Date.now().toString(),
      date: now,
      imageThumbnail: currentImage,
      summary: 'Test completed - 9 normal, 1 abnormal'
    }, ...prev]);
    
    setIsAnalyzing(false);
    console.log('Analysis complete');
  };

  const handleLoadSample = () => {
    setCurrentImage(sampleDipstickImage);
    setTestResults(null);
    console.log('Sample image loaded');
  };

  const handleNewTest = () => {
    setCurrentImage(undefined);
    setTestResults(null);
    setTestDate(undefined);
    console.log('Starting new test');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container max-w-4xl mx-auto px-4 py-6 md:py-8">
        <Tabs defaultValue="test" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3" data-testid="tabs-navigation">
            <TabsTrigger value="test" data-testid="tab-new-test">New Test</TabsTrigger>
            <TabsTrigger value="history" data-testid="tab-history">History</TabsTrigger>
            <TabsTrigger value="guide" data-testid="tab-guide">Guide</TabsTrigger>
          </TabsList>

          <TabsContent value="test" className="space-y-6">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-2xl font-semibold" data-testid="text-page-title">
                Dipstick Analysis
              </h2>
              {!currentImage && (
                <Button
                  variant="outline"
                  onClick={handleLoadSample}
                  data-testid="button-load-sample"
                >
                  <FileCheck className="mr-2 h-4 w-4" />
                  Load Sample
                </Button>
              )}
            </div>

            <ImageUpload
              onImageSelected={handleImageSelected}
              currentImage={currentImage}
              onClearImage={handleClearImage}
            />

            {currentImage && !testResults && (
              <div className="flex justify-center">
                <Button
                  size="lg"
                  onClick={handleAnalyzeImage}
                  disabled={isAnalyzing}
                  data-testid="button-analyze"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    'Analyze Dipstick'
                  )}
                </Button>
              </div>
            )}

            {testResults && (
              <>
                <TestResults results={testResults} testDate={testDate} />
                <div className="flex justify-center">
                  <Button
                    variant="outline"
                    onClick={handleNewTest}
                    data-testid="button-new-test"
                  >
                    Start New Test
                  </Button>
                </div>
              </>
            )}
          </TabsContent>

          <TabsContent value="history">
            <TestHistory
              tests={testHistory}
              onSelectTest={(id) => console.log('View test:', id)}
            />
          </TabsContent>

          <TabsContent value="guide">
            <ParameterGuide />
          </TabsContent>
        </Tabs>
      </main>

      <footer className="border-t py-4">
        <div className="container max-w-4xl mx-auto px-4 text-center text-sm text-muted-foreground" data-testid="text-footer">
          Professional urinalysis dipstick testing with AI-powered analysis
        </div>
      </footer>
    </div>
  );
}
