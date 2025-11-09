import { useState } from 'react';
import ImageUpload from '../ImageUpload';

export default function ImageUploadExample() {
  const [image, setImage] = useState<string>();

  return (
    <div className="p-4 max-w-2xl">
      <ImageUpload
        onImageSelected={(file, preview) => {
          console.log('Image selected:', file.name);
          setImage(preview);
        }}
        currentImage={image}
        onClearImage={() => setImage(undefined)}
      />
    </div>
  );
}
