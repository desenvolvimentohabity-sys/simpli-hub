import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, Receipt, DollarSign, TrendingUp, TrendingDown } from "lucide-react";

// Dados mockados para categorias financeiras
const categoriasMock = [
  {
    id: 1,
    nome: "Vendas",
    tipo: "entrada",
    descricao: "Receitas provenientes de vendas de produtos",
    cor: "#10B981",
    ativo: true,
    orcamento: 100000.00,
    utilizado: 15000.00
  },
  {
    id: 2,
    nome: "Serviços",
    tipo: "entrada",
    descricao: "Receitas provenientes de serviços prestados",
    cor: "#3B82F6",
    ativo: true,
    orcamento: 50000.00,
    utilizado: 2500.00
  },
  {
    id: 3,
    nome: "Despesas Operacionais",
    tipo: "saida",
    descricao: "Despesas relacionadas à operação da empresa",
    cor: "#EF4444",
    ativo: true,
    orcamento: 30000.00,
    utilizado: 5000.00
  },
  {
    id: 4,
    nome: "Marketing",
    tipo: "saida",
    descricao: "Despesas com publicidade e marketing",
    cor: "#F59E0B",
    ativo: true,
    orcamento: 15000.00,
    utilizado: 2000.00
  }
];

export default function Categorias() {
  const [categorias, setCategorias] = useState(categoriasMock);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCategorias = categorias.filter(categoria => {
    return categoria.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
           categoria.descricao.toLowerCase().includes(searchTerm.toLowerCase());
  });

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

  const getStatusBadge = (ativo: boolean) => {
    return ativo ? (
      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Ativo</Badge>
    ) : (
      <Badge variant="secondary">Inativo</Badge>
    );
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const calcularPercentualUtilizado = (utilizado: number, orcamento: number) => {
    if (orcamento === 0) return 0;
    return (utilizado / orcamento) * 100;
  };

  const getPercentualColor = (percentual: number) => {
    if (percentual >= 90) return "text-red-600";
    if (percentual >= 75) return "text-yellow-600";
    return "text-green-600";
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Categorias Financeiras</h1>
            <p className="text-muted-foreground">
              Gerencie as categorias de receitas e despesas
            </p>
          </div>
          <Button className="bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary">
            <Plus className="h-4 w-4 mr-2" />
            Nova Categoria
          </Button>
        </div>

        {/* Cards de Resumo */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Categorias</CardTitle>
              <Receipt className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{categorias.length}</div>
              <p className="text-xs text-muted-foreground">
                Categorias cadastradas
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Categorias de Entrada</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {categorias.filter(c => c.tipo === "entrada").length}
              </div>
              <p className="text-xs text-muted-foreground">
                Receitas
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Categorias de Saída</CardTitle>
              <TrendingDown className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {categorias.filter(c => c.tipo === "saida").length}
              </div>
              <p className="text-xs text-muted-foreground">
                Despesas
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Orçamento Total</CardTitle>
              <DollarSign className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatCurrency(categorias.reduce((total, c) => total + c.orcamento, 0))}
              </div>
              <p className="text-xs text-muted-foreground">
                Orçamento planejado
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
                  placeholder="Buscar por nome ou descrição..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabela de Categorias */}
        <Card>
          <CardHeader>
            <CardTitle>Lista de Categorias</CardTitle>
            <CardDescription>
              {filteredCategorias.length} categoria(s) encontrada(s)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Descrição</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Orçamento</TableHead>
                    <TableHead>Utilizado</TableHead>
                    <TableHead>Percentual</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCategorias.map((categoria) => {
                    const percentual = calcularPercentualUtilizado(categoria.utilizado, categoria.orcamento);
                    return (
                      <TableRow key={categoria.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div 
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: categoria.cor }}
                            />
                            <span className="font-medium">{categoria.nome}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm text-muted-foreground max-w-[200px] truncate">
                            {categoria.descricao}
                          </div>
                        </TableCell>
                        <TableCell>{getTipoBadge(categoria.tipo)}</TableCell>
                        <TableCell>
                          <div className="font-medium">{formatCurrency(categoria.orcamento)}</div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">{formatCurrency(categoria.utilizado)}</div>
                        </TableCell>
                        <TableCell>
                          <div className={`font-medium ${getPercentualColor(percentual)}`}>
                            {percentual.toFixed(1)}%
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(categoria.ativo)}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Resumo por Tipo */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                Categorias de Entrada (Receitas)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {categorias
                  .filter(c => c.tipo === "entrada")
                  .map(categoria => (
                    <div key={categoria.id} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: categoria.cor }}
                        />
                        <span className="font-medium">{categoria.nome}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{formatCurrency(categoria.utilizado)}</div>
                        <div className="text-xs text-muted-foreground">
                          de {formatCurrency(categoria.orcamento)}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingDown className="h-5 w-5 text-red-600" />
                Categorias de Saída (Despesas)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {categorias
                  .filter(c => c.tipo === "saida")
                  .map(categoria => (
                    <div key={categoria.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: categoria.cor }}
                        />
                        <span className="font-medium">{categoria.nome}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{formatCurrency(categoria.utilizado)}</div>
                        <div className="text-xs text-muted-foreground">
                          de {formatCurrency(categoria.orcamento)}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
} 