import { CheckCircle2 } from "lucide-react";

export function SuccessBanner({ message }: { message: string }) {
  return (
    <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg flex items-center gap-2">
      <CheckCircle2 className="h-5 w-5" />
      {message}
    </div>
  );
}
