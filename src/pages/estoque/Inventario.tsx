import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Package, AlertTriangle, CheckCircle, Clock, Download, Upload } from "lucide-react";

// Dados mockados para inventário
const inventarioMock = [
  {
    id: 1,
    codigo: "PROD001",
    produto: "Notebook Dell Inspiron",
    categoria: "Eletrônicos",
    estoqueAtual: 12,
    estoqueMinimo: 5,
    estoqueMaximo: 20,
    valorUnitario: 2500.00,
    valorTotal: 30000.00,
    ultimaMovimentacao: "2024-01-15",
    status: "normal",
    localizacao: "Prateleira A1"
  },
  {
    id: 2,
    codigo: "PROD002",
    produto: "Mouse Wireless Logitech",
    categoria: "Periféricos",
    estoqueAtual: 25,
    estoqueMinimo: 10,
    estoqueMaximo: 50,
    valorUnitario: 45.00,
    valorTotal: 1125.00,
    ultimaMovimentacao: "2024-01-14",
    status: "normal",
    localizacao: "Prateleira B2"
  },
  {
    id: 3,
    codigo: "PROD003",
    produto: "Teclado Mecânico RGB",
    categoria: "Periféricos",
    estoqueAtual: 1,
    estoqueMinimo: 3,
    estoqueMaximo: 10,
    valorUnitario: 350.00,
    valorTotal: 350.00,
    ultimaMovimentacao: "2024-01-10",
    status: "baixo",
    localizacao: "Prateleira C3"
  }
];

export default function Inventario() {
  const [inventario, setInventario] = useState(inventarioMock);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos");

  const filteredInventario = inventario.filter(item => {
    const matchesSearch = item.produto.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.categoria.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "todos" || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "baixo":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Estoque Baixo</Badge>;
      case "normal":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Normal</Badge>;
      case "alto":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Estoque Alto</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const calcularNivelEstoque = (atual: number, minimo: number, maximo: number) => {
    if (atual <= minimo) return 0;
    if (atual >= maximo) return 100;
    return ((atual - minimo) / (maximo - minimo)) * 100;
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const calcularTotalEstoque = () => {
    return inventario.reduce((total, item) => total + item.valorTotal, 0);
  };

  const calcularProdutosBaixoEstoque = () => {
    return inventario.filter(item => item.status === "baixo").length;
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Inventário</h1>
            <p className="text-muted-foreground">
              Visão geral do estoque e controle de inventário
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
            <Button variant="outline">
              <Upload className="h-4 w-4 mr-2" />
              Importar
            </Button>
          </div>
        </div>

        {/* Cards de Resumo */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Produtos</CardTitle>
              <Package className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{inventario.length}</div>
              <p className="text-xs text-muted-foreground">
                Produtos em estoque
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Valor Total</CardTitle>
              <Package className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(calcularTotalEstoque())}</div>
              <p className="text-xs text-muted-foreground">
                Valor em estoque
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Estoque Baixo</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{calcularProdutosBaixoEstoque()}</div>
              <p className="text-xs text-muted-foreground">
                Necessitam reposição
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Última Atualização</CardTitle>
              <Clock className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Hoje</div>
              <p className="text-xs text-muted-foreground">
                Inventário atualizado
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
                  placeholder="Buscar por produto, código ou categoria..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="w-40">
                <select
                  className="w-full px-3 py-2 border border-input rounded-md"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="todos">Todos os Status</option>
                  <option value="baixo">Estoque Baixo</option>
                  <option value="normal">Normal</option>
                  <option value="alto">Estoque Alto</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabela de Inventário */}
        <Card>
          <CardHeader>
            <CardTitle>Inventário de Estoque</CardTitle>
            <CardDescription>
              {filteredInventario.length} produto(s) encontrado(s)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Produto</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead>Estoque</TableHead>
                    <TableHead>Nível</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Última Movimentação</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Localização</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInventario.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{item.produto}</div>
                          <div className="text-sm text-muted-foreground">{item.codigo}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{item.categoria}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="text-sm">
                            <span className="font-medium">{item.estoqueAtual}</span>
                            <span className="text-muted-foreground"> / {item.estoqueMaximo}</span>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Mín: {item.estoqueMinimo}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="w-20">
                          <Progress value={calcularNivelEstoque(item.estoqueAtual, item.estoqueMinimo, item.estoqueMaximo)} />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="text-sm">
                            <span className="text-muted-foreground">Unit: </span>
                            <span className="font-medium">{formatCurrency(item.valorUnitario)}</span>
                          </div>
                          <div className="text-sm font-medium">
                            Total: {formatCurrency(item.valorTotal)}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{item.ultimaMovimentacao}</div>
                      </TableCell>
                      <TableCell>{getStatusBadge(item.status)}</TableCell>
                      <TableCell>
                        <div className="text-sm text-muted-foreground">{item.localizacao}</div>
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