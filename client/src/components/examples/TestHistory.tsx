import TestHistory from '../TestHistory';

export default function TestHistoryExample() {
  const mockTests = [
    {
      id: '1',
      date: new Date(2024, 10, 9, 10, 30),
      summary: 'All parameters normal',
    },
    {
      id: '2',
      date: new Date(2024, 10, 5, 14, 15),
      summary: 'Elevated ketone levels detected',
    },
  ];

  return (
    <div className="p-4 max-w-2xl">
      <TestHistory
        tests={mockTests}
        onSelectTest={(id) => console.log('Selected test:', id)}
      />
    </div>
  );
}
