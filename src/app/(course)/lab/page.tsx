import AppLab from '@/lab/App';

export const metadata = {
  title: 'Interactive Lab | Al-Qalam Academy',
  description: 'Interactive classical Arabic learning laboratory',
};

export default function LabPage() {
  return (
    <div className="flex-1 w-full h-full min-h-screen">
      <AppLab />
    </div>
  );
}
