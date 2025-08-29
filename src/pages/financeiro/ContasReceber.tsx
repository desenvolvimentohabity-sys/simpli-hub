import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, TrendingUp, Clock, CheckCircle, DollarSign } from "lucide-react";

// Dados mockados para contas a receber
const contasReceberMock = [
  {
    id: 1,
    descricao: "Venda de Produtos",
    cliente: "Empresa ABC Ltda",
    valor: 15000.00,
    dataVencimento: "2024-02-15",
    dataRecebimento: null,
    status: "pendente",
    formaPagamento: "Boleto",
    observacoes: "Venda de equipamentos de TI"
  },
  {
    id: 2,
    descricao: "Serviços Prestados",
    cliente: "João Silva",
    valor: 2500.00,
    dataVencimento: "2024-01-25",
    dataRecebimento: "2024-01-20",
    status: "recebido",
    formaPagamento: "Cartão de Crédito",
    observacoes: "Serviços de manutenção"
  }
];

export default function ContasReceber() {
  const [contas, setContas] = useState(contasReceberMock);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredContas = contas.filter(conta => {
    return conta.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
           conta.cliente.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const getStatusBadge = (status: string) => {
    return status === "recebido" ? (
      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
        <CheckCircle className="h-3 w-3 mr-1" />
        Recebido
      </Badge>
    ) : (
      <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
        <Clock className="h-3 w-3 mr-1" />
        Pendente
      </Badge>
    );
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const calcularTotalPendente = () => {
    return contas
      .filter(c => c.status === "pendente")
      .reduce((total, c) => total + c.valor, 0);
  };

  const calcularTotalRecebido = () => {
    return contas
      .filter(c => c.status === "recebido")
      .reduce((total, c) => total + c.valor, 0);
  };

  const calcularTotalGeral = () => {
    return contas.reduce((total, c) => total + c.valor, 0);
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Contas a Receber</h1>
            <p className="text-muted-foreground">
              Gerencie as contas e recebimentos da empresa
            </p>
          </div>
          <Button className="bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary">
            <Plus className="h-4 w-4 mr-2" />
            Nova Conta
          </Button>
        </div>

        {/* Cards de Resumo */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Contas</CardTitle>
              <TrendingUp className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{contas.length}</div>
              <p className="text-xs text-muted-foreground">
                Contas registradas
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Pendente</CardTitle>
              <Clock className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">
                {formatCurrency(calcularTotalPendente())}
              </div>
              <p className="text-xs text-muted-foreground">
                A receber
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Recebido</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {formatCurrency(calcularTotalRecebido())}
              </div>
              <p className="text-xs text-muted-foreground">
                Já recebidos
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Valor Total</CardTitle>
              <DollarSign className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatCurrency(calcularTotalGeral())}
              </div>
              <p className="text-xs text-muted-foreground">
                Valor total das contas
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
                  placeholder="Buscar por descrição ou cliente..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabela de Contas */}
        <Card>
          <CardHeader>
            <CardTitle>Lista de Contas a Receber</CardTitle>
            <CardDescription>
              {filteredContas.length} conta(s) encontrada(s)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Descrição</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Vencimento</TableHead>
                    <TableHead>Forma Pagamento</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Observações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredContas.map((conta) => (
                    <TableRow key={conta.id}>
                      <TableCell>
                        <div className="font-medium">{conta.descricao}</div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{conta.cliente}</div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{formatCurrency(conta.valor)}</div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{conta.dataVencimento}</div>
                        {conta.dataRecebimento && (
                          <div className="text-xs text-muted-foreground">
                            Recebido: {conta.dataRecebimento}
                          </div>
                        )}
                      </TableCell>
                      <TableCell>{conta.formaPagamento}</TableCell>
                      <TableCell>{getStatusBadge(conta.status)}</TableCell>
                      <TableCell>
                        <div className="text-sm text-muted-foreground max-w-[200px] truncate">
                          {conta.observacoes}
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