import FluxGenerator from '../../components/flux/flux-generator';

export default function GeneratePage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Generate Images</h1>
      <FluxGenerator />
    </div>
  );
}