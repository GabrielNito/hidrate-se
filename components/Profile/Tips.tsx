import { LeafIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export default function Tips() {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center">
          <LeafIcon className="w-5 h-5 mr-2 text-green-600" />
          Dicas de Conservação
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 text-sm">
          <li>• Instale chuveiros e torneiras eficientes em água</li>
          <li>• Conserte canos e torneiras com vazamentos rapidamente</li>
          <li>
            • Regue seu jardim durante as horas mais frescas para reduzir a
            evaporação
          </li>
          <li>• Colete água da chuva para regar plantas</li>
        </ul>
      </CardContent>
    </Card>
  );
}
