import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, FileText, Clock, CheckCircle, XCircle } from "lucide-react";

// Dados mockados para orçamentos
const orcamentosMock = [
  {
    id: 1,
    numero: "ORC001",
    cliente: "Empresa ABC Ltda",
    data: "2024-01-15",
    validade: "2024-02-15",
    valor: 15000.00,
    status: "pendente",
    vendedor: "João Silva",
    observacoes: "Orçamento para equipamentos de TI"
  },
  {
    id: 2,
    numero: "ORC002",
    cliente: "João Silva",
    data: "2024-01-14",
    validade: "2024-02-14",
    valor: 2500.00,
    status: "aprovado",
    vendedor: "Maria Santos",
    observacoes: "Orçamento para periféricos"
  }
];

export default function Orcamentos() {
  const [orcamentos, setOrcamentos] = useState(orcamentosMock);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredOrcamentos = orcamentos.filter(orcamento => {
    return orcamento.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
           orcamento.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
           orcamento.vendedor.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pendente":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
          <Clock className="h-3 w-3 mr-1" />
          Pendente
        </Badge>;
      case "aprovado":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
          <CheckCircle className="h-3 w-3 mr-1" />
          Aprovado
        </Badge>;
      case "rejeitado":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
          <XCircle className="h-3 w-3 mr-1" />
          Rejeitado
        </Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Orçamentos</h1>
            <p className="text-muted-foreground">
              Gerencie os orçamentos de vendas
            </p>
          </div>
          <Button className="bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary">
            <Plus className="h-4 w-4 mr-2" />
            Novo Orçamento
          </Button>
        </div>

        {/* Cards de Resumo */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Orçamentos</CardTitle>
              <FileText className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{orcamentos.length}</div>
              <p className="text-xs text-muted-foreground">
                Orçamentos criados
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pendentes</CardTitle>
              <Clock className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {orcamentos.filter(o => o.status === "pendente").length}
              </div>
              <p className="text-xs text-muted-foreground">
                Aguardando aprovação
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Aprovados</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {orcamentos.filter(o => o.status === "aprovado").length}
              </div>
              <p className="text-xs text-muted-foreground">
                Orçamentos aprovados
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Valor Total</CardTitle>
              <FileText className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatCurrency(orcamentos.reduce((total, o) => total + o.valor, 0))}
              </div>
              <p className="text-xs text-muted-foreground">
                Valor total dos orçamentos
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Filtros */}
        <Card>
          <CardHeader>
            <CardTitle>Filtros</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Buscar por número, cliente ou vendedor..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabela de Orçamentos */}
        <Card>
          <CardHeader>
            <CardTitle>Lista de Orçamentos</CardTitle>
            <CardDescription>
              {filteredOrcamentos.length} orçamento(s) encontrado(s)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Número</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Validade</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Vendedor</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Observações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrcamentos.map((orcamento) => (
                    <TableRow key={orcamento.id}>
                      <TableCell>
                        <div className="font-mono font-medium">{orcamento.numero}</div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{orcamento.cliente}</div>
                      </TableCell>
                      <TableCell>{orcamento.data}</TableCell>
                      <TableCell>{orcamento.validade}</TableCell>
                      <TableCell>
                        <div className="font-medium">{formatCurrency(orcamento.valor)}</div>
                      </TableCell>
                      <TableCell>{orcamento.vendedor}</TableCell>
                      <TableCell>{getStatusBadge(orcamento.status)}</TableCell>
                      <TableCell>
                        <div className="text-sm text-muted-foreground max-w-[200px] truncate">
                          {orcamento.observacoes}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
} 