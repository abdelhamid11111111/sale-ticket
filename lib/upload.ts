import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function saveFile(file: File): Promise<string> {
  const binary = await file.arrayBuffer();
  const buffer = Buffer.from(binary);
  const timestamp = Date.now();
  const filename = `${timestamp}-${file.name}`;

  const { data, error } = await supabase.storage
    .from('events')
    .upload(filename, buffer, {
      contentType: file.type,
      upsert: false,
    });

  if (error) throw new Error(error.message);

  const { data: publicUrl } = supabase.storage
    .from('events')
    .getPublicUrl(data.path);

  return publicUrl.publicUrl; // returns full https:// URL
}