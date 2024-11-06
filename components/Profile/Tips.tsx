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
          <li>
            • Beba água aos poucos ao longo do dia, não espere sentir sede
          </li>
          <li>• Tenha uma garrafa de água sempre ao seu alcance</li>
          <li>
            • Ajuste sua ingestão de água em dias de atividades físicas ou em
            clima quente
          </li>
          <li>
            • Defina pequenas metas diárias de consumo de água e acompanhe seu
            progresso
          </li>
        </ul>
      </CardContent>
    </Card>
  );
}
