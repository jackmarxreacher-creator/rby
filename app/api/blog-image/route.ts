import { NextRequest, NextResponse } from 'next/server';
import { saveBlogImage } from '@/app/cms/blog/_utils/saveBlogImage.server';

export async function POST(req: NextRequest) {
  const fd = await req.formData();
  const dataUrl = fd.get('image') as string;
  const url = await saveBlogImage(dataUrl);
  return NextResponse.json({ url });
}