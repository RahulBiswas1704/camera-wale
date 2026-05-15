import CameraForm from '@/components/CameraForm';
import { getCameraById } from '@/data/cameras';
import { notFound } from 'next/navigation';

export default async function EditCameraPage({ params }) {
  const camera = await getCameraById(params.id);

  if (!camera) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto">
      <CameraForm initialData={camera} />
    </div>
  );
}
