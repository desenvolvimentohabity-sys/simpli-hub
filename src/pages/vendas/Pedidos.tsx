import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, ShoppingCart, Clock, CheckCircle, Truck, Package } from "lucide-react";

// Dados mockados para pedidos
const pedidosMock = [
  {
    id: 1,
    numero: "PED001",
    cliente: "Empresa ABC Ltda",
    data: "2024-01-15",
    valor: 15000.00,
    status: "pendente",
    vendedor: "João Silva",
    formaPagamento: "Boleto",
    observacoes: "Pedido para equipamentos de TI"
  },
  {
    id: 2,
    numero: "PED002",
    cliente: "João Silva",
    data: "2024-01-14",
    valor: 2500.00,
    status: "aprovado",
    vendedor: "Maria Santos",
    formaPagamento: "Cartão de Crédito",
    observacoes: "Pedido para periféricos"
  }
];

export default function Pedidos() {
  const [pedidos, setPedidos] = useState(pedidosMock);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPedidos = pedidos.filter(pedido => {
    return pedido.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
           pedido.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
           pedido.vendedor.toLowerCase().includes(searchTerm.toLowerCase());
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
      case "em_producao":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
          <Package className="h-3 w-3 mr-1" />
          Em Produção
        </Badge>;
      case "enviado":
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">
          <Truck className="h-3 w-3 mr-1" />
          Enviado
        </Badge>;
      case "entregue":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
          <CheckCircle className="h-3 w-3 mr-1" />
          Entregue
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
            <h1 className="text-3xl font-bold">Pedidos</h1>
            <p className="text-muted-foreground">
              Gerencie os pedidos de vendas
            </p>
          </div>
          <Button className="bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary">
            <Plus className="h-4 w-4 mr-2" />
            Novo Pedido
          </Button>
        </div>

        {/* Cards de Resumo */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Pedidos</CardTitle>
              <ShoppingCart className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pedidos.length}</div>
              <p className="text-xs text-muted-foreground">
                Pedidos realizados
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
                {pedidos.filter(p => p.status === "pendente").length}
              </div>
              <p className="text-xs text-muted-foreground">
                Aguardando aprovação
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Em Produção</CardTitle>
              <Package className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {pedidos.filter(p => p.status === "em_producao").length}
              </div>
              <p className="text-xs text-muted-foreground">
                Sendo processados
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Valor Total</CardTitle>
              <ShoppingCart className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatCurrency(pedidos.reduce((total, p) => total + p.valor, 0))}
              </div>
              <p className="text-xs text-muted-foreground">
                Valor total dos pedidos
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

        {/* Tabela de Pedidos */}
        <Card>
          <CardHeader>
            <CardTitle>Lista de Pedidos</CardTitle>
            <CardDescription>
              {filteredPedidos.length} pedido(s) encontrado(s)
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
                    <TableHead>Valor</TableHead>
                    <TableHead>Vendedor</TableHead>
                    <TableHead>Forma Pagamento</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Observações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPedidos.map((pedido) => (
                    <TableRow key={pedido.id}>
                      <TableCell>
                        <div className="font-mono font-medium">{pedido.numero}</div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{pedido.cliente}</div>
                      </TableCell>
                      <TableCell>{pedido.data}</TableCell>
                      <TableCell>
                        <div className="font-medium">{formatCurrency(pedido.valor)}</div>
                      </TableCell>
                      <TableCell>{pedido.vendedor}</TableCell>
                      <TableCell>{pedido.formaPagamento}</TableCell>
                      <TableCell>{getStatusBadge(pedido.status)}</TableCell>
                      <TableCell>
                        <div className="text-sm text-muted-foreground max-w-[200px] truncate">
                          {pedido.observacoes}
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