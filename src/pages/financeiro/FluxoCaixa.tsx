import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { TrendingUp, TrendingDown, DollarSign, Calendar, BarChart3 } from "lucide-react";

export default function FluxoCaixa() {
  const [periodo, setPeriodo] = useState("mes");
  const [ano, setAno] = useState("2024");

  // Dados mockados para fluxo de caixa
  const fluxoCaixaMock = [
    {
      id: 1,
      data: "2024-01-15",
      descricao: "Venda de Produtos",
      tipo: "entrada",
      categoria: "Vendas",
      valor: 15000.00,
      saldo: 15000.00
    },
    {
      id: 2,
      data: "2024-01-16",
      descricao: "Aluguel",
      tipo: "saida",
      categoria: "Despesas Operacionais",
      valor: 5000.00,
      saldo: 10000.00
    },
    {
      id: 3,
      data: "2024-01-17",
      descricao: "Serviços Prestados",
      tipo: "entrada",
      categoria: "Serviços",
      valor: 2500.00,
      saldo: 12500.00
    }
  ];

  const periodos = [
    { key: "semana", nome: "Última Semana" },
    { key: "mes", nome: "Este Mês" },
    { key: "trimestre", nome: "Este Trimestre" },
    { key: "ano", nome: "Este Ano" }
  ];

  const anos = ["2020", "2021", "2022", "2023", "2024", "2025"];

  const calcularTotalEntradas = () => {
    return fluxoCaixaMock
      .filter(item => item.tipo === "entrada")
      .reduce((total, item) => total + item.valor, 0);
  };

  const calcularTotalSaidas = () => {
    return fluxoCaixaMock
      .filter(item => item.tipo === "saida")
      .reduce((total, item) => total + item.valor, 0);
  };

  const calcularSaldoAtual = () => {
    return calcularTotalEntradas() - calcularTotalSaidas();
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const getTipoBadge = (tipo: string) => {
    return tipo === "entrada" ? (
      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
        <TrendingUp className="h-3 w-3 mr-1" />
        Entrada
      </Badge>
    ) : (
      <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
        <TrendingDown className="h-3 w-3 mr-1" />
        Saída
      </Badge>
    );
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Fluxo de Caixa</h1>
            <p className="text-muted-foreground">
              Acompanhe o fluxo financeiro da empresa
            </p>
          </div>
          <div className="flex gap-2">
            <div className="w-32">
              <Select value={periodo} onValueChange={setPeriodo}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {periodos.map(p => (
                    <SelectItem key={p.key} value={p.key}>{p.nome}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="w-24">
              <Select value={ano} onValueChange={setAno}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {anos.map(a => (
                    <SelectItem key={a} value={a}>{a}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Cards de Resumo */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Saldo Atual</CardTitle>
              <DollarSign className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(calcularSaldoAtual())}</div>
              <p className="text-xs text-muted-foreground">
                Saldo em caixa
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Entradas</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {formatCurrency(calcularTotalEntradas())}
              </div>
              <p className="text-xs text-muted-foreground">
                Receitas do período
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Saídas</CardTitle>
              <TrendingDown className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {formatCurrency(calcularTotalSaidas())}
              </div>
              <p className="text-xs text-muted-foreground">
                Despesas do período
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Movimentações</CardTitle>
              <BarChart3 className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{fluxoCaixaMock.length}</div>
              <p className="text-xs text-muted-foreground">
                Transações registradas
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Gráfico de Fluxo de Caixa */}
        <Card>
          <CardHeader>
            <CardTitle>Evolução do Saldo</CardTitle>
            <CardDescription>
              Gráfico mostrando a evolução do saldo ao longo do tempo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <BarChart3 className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p>Gráfico de Fluxo de Caixa</p>
                <p className="text-sm">Visualização em desenvolvimento</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabela de Movimentações */}
        <Card>
          <CardHeader>
            <CardTitle>Movimentações de Caixa</CardTitle>
            <CardDescription>
              Detalhamento de todas as entradas e saídas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data</TableHead>
                    <TableHead>Descrição</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Saldo</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {fluxoCaixaMock.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {item.data}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{item.descricao}</div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{item.categoria}</Badge>
                      </TableCell>
                      <TableCell>{getTipoBadge(item.tipo)}</TableCell>
                      <TableCell>
                        <div className={`font-medium ${
                          item.tipo === "entrada" ? "text-green-600" : "text-red-600"
                        }`}>
                          {item.tipo === "entrada" ? "+" : "-"} {formatCurrency(item.valor)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{formatCurrency(item.saldo)}</div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Resumo por Categoria */}
        <Card>
          <CardHeader>
            <CardTitle>Resumo por Categoria</CardTitle>
            <CardDescription>
              Análise das movimentações por categoria
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Vendas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">
                    {formatCurrency(fluxoCaixaMock.filter(i => i.categoria === "Vendas").reduce((total, i) => total + i.valor, 0))}
                  </div>
                  <p className="text-xs text-muted-foreground">Entradas</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Serviços</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">
                    {formatCurrency(fluxoCaixaMock.filter(i => i.categoria === "Serviços").reduce((total, i) => total + i.valor, 0))}
                  </div>
                  <p className="text-xs text-muted-foreground">Entradas</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Despesas Operacionais</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">
                    {formatCurrency(fluxoCaixaMock.filter(i => i.categoria === "Despesas Operacionais").reduce((total, i) => total + i.valor, 0))}
                  </div>
                  <p className="text-xs text-muted-foreground">Saídas</p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
} 