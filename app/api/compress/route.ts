import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const files = formData.getAll("files") as File[];
    const quality = parseInt(formData.get("quality") as string) || 80;
    const format = (formData.get("format") as string) || "webp";

    if (files.length === 0) {
      return NextResponse.json(
        { error: "No image file provided" },
        { status: 400 }
      );
    }

    const compressedImages = [];
    const stats = [];

    for (const file of files) {
      const buffer = Buffer.from(await file.arrayBuffer());
      let sharpInstance = sharp(buffer);

      // Get image metadata
      const metadata = await sharpInstance.metadata();
      const originalFormat = metadata.format;

      // Optimize compression settings based on format
      let processedBuffer: Buffer;
      const compressionOptions = { quality: Math.min(quality, 95), effort: 6 };

      switch (format) {
        case "jpeg":
          processedBuffer = await sharpInstance
            .jpeg({
              quality: compressionOptions.quality,
              mozjpeg: true,
              chromaSubsampling: "4:2:0",
            })
            .toBuffer();
          break;
        case "png":
          processedBuffer = await sharpInstance
            .png({
              quality: compressionOptions.quality,
              effort: compressionOptions.effort,
              palette: true,
              colors: 256,
            })
            .toBuffer();
          break;
        case "webp":
          processedBuffer = await sharpInstance
            .webp({
              quality: compressionOptions.quality,
              effort: compressionOptions.effort,
              lossless: quality >= 95,
              nearLossless: quality >= 90,
            })
            .toBuffer();
          break;
        case "avif":
          processedBuffer = await sharpInstance
            .avif({
              quality: compressionOptions.quality,
              effort: compressionOptions.effort,
              lossless: quality >= 95,
            })
            .toBuffer();
          break;
        default:
          processedBuffer = await sharpInstance
            .webp({
              quality: compressionOptions.quality,
              effort: compressionOptions.effort,
            })
            .toBuffer();
      }

      // If compressed size is larger than original, return original with format conversion
      if (processedBuffer.length > buffer.length && format === originalFormat) {
        console.log("Compressed size larger than original, returning original");
        processedBuffer = buffer;
      }

      // Convert buffer to base64
      const base64Image = `data:image/${format};base64,${processedBuffer.toString(
        "base64"
      )}`;

      compressedImages.push(base64Image);
      stats.push({
        originalSize: buffer.length,
        originalFormat,
        compressedFormat: format,
        compressedSize: processedBuffer.length,
      });
    }

    return NextResponse.json({
      compressedImages,
      stats,
    });
  } catch (error) {
    console.error("Error processing image:", error);
    return NextResponse.json(
      { error: "Failed to process image" },
      { status: 500 }
    );
  }
}
