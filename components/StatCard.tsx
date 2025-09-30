import { Card, CardContent } from "@/components/ui/card";


export function StatCard({ title, value }: { title: string; value: string | number }) {
return (
<Card className="shadow-sm">
<CardContent className="p-4">
<div className="text-xs uppercase text-gray-500">{title}</div>
<div className="mt-2 text-2xl font-semibold">{value}</div>
</CardContent>
</Card>
);
}