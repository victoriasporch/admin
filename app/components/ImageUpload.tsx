/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Icon from './Icon';
import clsx from 'clsx';

const CloudinaryUpload = ({
  preset,
  url,
  onUpload,
}: {
  preset: string;
  url: string;
  onUpload: (url: string) => void;
}) => {
  const [imageUrl, setImageUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    setImageUrl(url);
  }, []);

  const handleUpload = async (event: any) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsUploading(true);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', preset);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      const data = await response.json();
      if (data.secure_url) {
        onUpload(data.secure_url);
        setImageUrl(data.secure_url); // Save the uploaded image URL
      } else {
        console.error('Upload failed:', data);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div
      className={clsx(
        'relative cloudinary-upload border-2 border-dotted p-2 py-4 px-4 rounded-xl overflow-hidden',
        imageUrl ? 'bg-green-100' : 'bg-gray-50'
      )}
    >
      <label
        htmlFor="file-upload"
        className="flex flex-wrap items-center gap-x-5 gap-y-4"
      >
        <div
          className={clsx(
            'rounded-xl w-[8rem] h-[8rem] overflow-hidden',
            imageUrl ? 'bg-green-200' : 'bg-gray-200'
          )}
        >
          {imageUrl && !isUploading && (
            <Image
              width={500}
              height={500}
              src={imageUrl}
              alt="Uploaded Preview"
              className="w-full h-full object-cover"
              unoptimized
            />
          )}

          {isUploading && (
            <div className="w-full h-full  text-gray-500 grid place-items-center animate-spin">
              <Icon name="Loader" size={25} />
            </div>
          )}

          {!imageUrl && !isUploading && (
            <div className="w-full h-full text-gray-500  grid place-items-center">
              <Icon name="Image" size={25} />
            </div>
          )}
        </div>

        <article>
          <p className="font-semibold text-sm">
            {isUploading ? (
              'Uploading...'
            ) : imageUrl ? (
              <span className="text-green-500">Upload Successful</span>
            ) : (
              'Upload Image'
            )}
          </p>

          {!imageUrl && (
            <p className="text-gray-600 text-sm">
              Click here to upload an image
            </p>
          )}

          {imageUrl && (
            <p className="text-gray-600 text-sm">(click here to replace)</p>
          )}
        </article>
      </label>
      <input
        type="file"
        id="file-upload"
        accept="image/*"
        onChange={handleUpload}
        className="opacity-0 absolute top-0 left-0 w-full h-full z-10"
      />
    </div>
  );
};

export default CloudinaryUpload;
