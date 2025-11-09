import { useState, useRef } from "react";
import { Camera, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface ImageUploadProps {
  onImageSelected: (file: File, preview: string) => void;
  currentImage?: string;
  onClearImage?: () => void;
}

export default function ImageUpload({ onImageSelected, currentImage, onClearImage }: ImageUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageSelected(file, reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        {currentImage ? (
          <div className="space-y-4">
            <div className="relative rounded-md overflow-hidden border bg-muted">
              <img
                src={currentImage}
                alt="Dipstick test"
                className="w-full h-auto"
                data-testid="img-dipstick-preview"
              />
              <Button
                size="icon"
                variant="destructive"
                className="absolute top-2 right-2"
                onClick={onClearImage}
                data-testid="button-clear-image"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-sm text-muted-foreground text-center" data-testid="text-image-uploaded">
              Image uploaded successfully
            </p>
          </div>
        ) : (
          <div
            className={`border-2 border-dashed rounded-md p-8 text-center transition-colors ${
              dragActive ? 'border-primary bg-accent' : 'border-border'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            data-testid="dropzone-image-upload"
          >
            <div className="space-y-4">
              <div className="flex justify-center gap-4">
                <Button
                  size="lg"
                  onClick={() => cameraInputRef.current?.click()}
                  data-testid="button-capture-camera"
                >
                  <Camera className="mr-2 h-5 w-5" />
                  Capture Image
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  data-testid="button-upload-file"
                >
                  <Upload className="mr-2 h-5 w-5" />
                  Upload Image
                </Button>
              </div>
              <p className="text-sm text-muted-foreground" data-testid="text-upload-instructions">
                Take a photo of the dipstick test or upload an existing image
              </p>
            </div>
          </div>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileInput}
        />
        <input
          ref={cameraInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={handleFileInput}
        />
      </CardContent>
    </Card>
  );
}
