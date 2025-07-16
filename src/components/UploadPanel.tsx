"use client";

import { useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import Image from "next/image";

type SelectedFile = {
  file: File;
  preview: string;
  caption: string;
};

type UploadedAsset = {
  _id?: string;
  url: string;
  public_id: string;
  type: "image" | "video";
  caption?: string;
};

export default function UploadPanel() {
  const [selectedFiles, setSelectedFiles] = useState<SelectedFile[]>([]);
  const [uploads, setUploads] = useState<UploadedAsset[]>([]);
  const [loading, setLoading] = useState(false);

  const onDrop = (acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      caption: "",
    }));
    setSelectedFiles((prev) => [...newFiles, ...prev]);
  };

  const handleCaptionChange = (index: number, caption: string) => {
    const updated = [...selectedFiles];
    updated[index].caption = caption;
    setSelectedFiles(updated);
  };

  const handleUpload = async () => {
    setLoading(true);
    const uploadedAssets: UploadedAsset[] = [];

    for (const item of selectedFiles) {
      const formData = new FormData();
      formData.append("file", item.file);
      formData.append("upload_preset", "acegradelab");

      try {
        const cloudinaryRes = await axios.post(
          "https://api.cloudinary.com/v1_1/dzgiaekwh/upload",
          formData
        );

        const asset = {
          url: cloudinaryRes.data.secure_url,
          public_id: cloudinaryRes.data.public_id,
          type: item.file.type.startsWith("video") ? "video" : "image",
          caption: item.caption,
        };

        const dbRes = await axios.post("/api/proof/upload", asset);
        uploadedAssets.push({
          ...asset,
          _id: dbRes.data.id,
          type: asset.type as "image" | "video", // 👈 force correct type
        });
      } catch (err) {
        console.error("Upload error", err);
      }
    }

    setUploads((prev) => [...uploadedAssets, ...prev]);
    setSelectedFiles([]);
    setLoading(false);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <section className="p-6 max-w-5xl mx-auto text-[#0E0E10]">
      <h2 className="text-2xl font-bold mb-4">Admin Upload Panel</h2>

      <div
        {...getRootProps()}
        className="border-2 border-dashed border-[#6C4FF7] p-8 rounded-lg text-center cursor-pointer"
      >
        <input {...getInputProps()} />
        <p className="text-lg">
          <p className="text-lg">
            Drag &apos;n&apos; drop some files here, or click to select files
          </p>
        </p>
      </div>

      {selectedFiles.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-2">Files to upload:</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {selectedFiles.map((item, index) => (
              <div key={index} className="border p-2 rounded shadow">
                {item.file.type.startsWith("image") ? (
                  <Image
                    src={item.preview}
                    alt="preview"
                    width={400}
                    height={300}
                    className="w-full h-auto mb-2"
                  />
                ) : (
                  <video controls className="w-full h-auto mb-2">
                    <source src={item.preview} type="video/mp4" />
                  </video>
                )}
                <input
                  type="text"
                  value={item.caption}
                  onChange={(e) => handleCaptionChange(index, e.target.value)}
                  placeholder="Enter caption"
                  className="border p-2 w-full rounded"
                />
              </div>
            ))}
          </div>
          <button
            onClick={handleUpload}
            disabled={loading}
            className="mt-4 bg-[#6C4FF7] text-white px-6 py-2 rounded hover:opacity-90"
          >
            {loading ? "Uploading..." : "Upload All"}
          </button>
        </div>
      )}

      {uploads.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8">
          {uploads.map((file, i) => (
            <div key={i} className="border rounded overflow-hidden shadow">
              {file.type === "image" ? (
                <Image
                  src={file.url}
                  alt={file.caption || "proof"}
                  className="w-full h-auto"
                  width={400}
                  height={300}
                />
              ) : (
                <video controls className="w-full h-auto">
                  <source src={file.url} type="video/mp4" />
                </video>
              )}
              {file.caption && (
                <p className="bg-[#6C4FF7] text-white py-2 text-sm text-center font-medium">
                  {file.caption}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
// Note: Ensure you have the necessary dependencies installed:
