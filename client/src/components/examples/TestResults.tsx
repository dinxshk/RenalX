import TestResults from '../TestResults';

export default function TestResultsExample() {
  const mockResults = [
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

  return (
    <div className="p-4 max-w-2xl">
      <TestResults results={mockResults} testDate={new Date()} />
    </div>
  );
}
