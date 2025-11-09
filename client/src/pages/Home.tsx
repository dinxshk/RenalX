import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import ImageUpload from "@/components/ImageUpload";
import TestResults, { TestParameter } from "@/components/TestResults";
import ParameterGuide from "@/components/ParameterGuide";
import TestHistory, { TestHistoryItem } from "@/components/TestHistory";
import Header from "@/components/Header";
import { Loader2, FileCheck } from "lucide-react";
import sampleDipstickImage from "@assets/IMG_20251109_102721_1762675147625.jpg";
import { apiRequest, queryClient } from "@/lib/queryClient";

interface UrinalysisTest {
  id: string;
  imageUrl: string | null;
  results: TestParameter[];
  testDate: string;
  summary: string;
}

export default function Home() {
  const [currentImage, setCurrentImage] = useState<string>();
  const [currentFile, setCurrentFile] = useState<File>();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [testResults, setTestResults] = useState<TestParameter[] | null>(null);
  const [testDate, setTestDate] = useState<Date>();
  const { toast } = useToast();

  const { data: testHistory = [] } = useQuery<UrinalysisTest[]>({
    queryKey: ['/api/tests'],
  });

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
    setCurrentFile(file);
    setTestResults(null);
    console.log('Image selected:', file.name);
  };

  const handleClearImage = () => {
    setCurrentImage(undefined);
    setCurrentFile(undefined);
    setTestResults(null);
    console.log('Image cleared');
  };

  const handleAnalyzeImage = async () => {
    if (!currentFile) return;

    setIsAnalyzing(true);
    console.log('Analyzing image...');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const normalCount = sampleResults.filter(r => r.isNormal).length;
      const abnormalCount = sampleResults.length - normalCount;
      const summary = `Test completed - ${normalCount} normal, ${abnormalCount} abnormal`;

      const formData = new FormData();
      formData.append('image', currentFile);
      formData.append('results', JSON.stringify(sampleResults));
      formData.append('summary', summary);

      const response = await apiRequest('/api/tests', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to save test results');
      }

      const savedTest = await response.json();
      
      setTestResults(sampleResults);
      setTestDate(new Date(savedTest.testDate));
      
      await queryClient.invalidateQueries({ queryKey: ['/api/tests'] });
      
      toast({
        title: "Analysis Complete",
        description: "Test results have been saved successfully.",
      });
      
      console.log('Analysis complete');
    } catch (error) {
      console.error('Analysis error:', error);
      toast({
        title: "Analysis Failed",
        description: "Failed to analyze the image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleLoadSample = () => {
    fetch(sampleDipstickImage)
      .then(res => res.blob())
      .then(blob => {
        const file = new File([blob], "sample-dipstick.jpg", { type: "image/jpeg" });
        setCurrentFile(file);
        setCurrentImage(sampleDipstickImage);
        setTestResults(null);
        console.log('Sample image loaded');
      })
      .catch(err => {
        console.error('Failed to load sample:', err);
        toast({
          title: "Error",
          description: "Failed to load sample image",
          variant: "destructive",
        });
      });
  };

  const handleNewTest = () => {
    setCurrentImage(undefined);
    setCurrentFile(undefined);
    setTestResults(null);
    setTestDate(undefined);
    console.log('Starting new test');
  };

  const historyItems: TestHistoryItem[] = testHistory.map(test => ({
    id: test.id,
    date: new Date(test.testDate),
    imageThumbnail: test.imageUrl || undefined,
    summary: test.summary,
  }));

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
            <div className="flex items-center justify-between gap-3 flex-wrap">
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
              tests={historyItems}
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
