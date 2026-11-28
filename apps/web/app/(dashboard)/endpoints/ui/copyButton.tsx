'use client';

import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export function CopyButton({ textToCopy, prompt }: { textToCopy: string, prompt: string }) {
  const handleCopy = () => {
    navigator.clipboard.writeText(textToCopy);
    toast.success("Secret copied")
  };

  return (
    <Button onClick={handleCopy}>
      Copy
    </Button>
  );
}
