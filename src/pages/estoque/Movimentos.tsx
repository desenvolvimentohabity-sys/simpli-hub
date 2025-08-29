import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search, ArrowUp, ArrowDown, Package, Calendar, User } from "lucide-react";

// Dados mockados para movimentações
const movimentosMock = [
  {
    id: 1,
    tipo: "entrada",
    produto: "Notebook Dell Inspiron",
    codigo: "PROD001",
    quantidade: 10,
    data: "2024-01-15",
    responsavel: "João Silva",
    motivo: "Compra de fornecedor",
    fornecedor: "Fornecedor A",
    valorUnitario: 2500.00,
    valorTotal: 25000.00,
    observacoes: "Notebooks novos para estoque"
  },
  {
    id: 2,
    tipo: "saida",
    produto: "Mouse Wireless Logitech",
    codigo: "PROD002",
    quantidade: 5,
    data: "2024-01-14",
    responsavel: "Maria Santos",
    motivo: "Venda",
    cliente: "Cliente X",
    valorUnitario: 69.90,
    valorTotal: 349.50,
    observacoes: "Venda para cliente corporativo"
  }
];

const tiposMovimento = [
  { key: "entrada", nome: "Entrada", desc: "Produtos entrando no estoque" },
  { key: "saida", nome: "Saída", desc: "Produtos saindo do estoque" }
];

const motivos = [
  "Compra de fornecedor",
  "Venda",
  "Devolução de cliente",
  "Devolução para fornecedor",
  "Ajuste de estoque",
  "Transferência entre filiais",
  "Perda/Danificação",
  "Outros"
];

export default function Movimentos() {
  const [movimentos, setMovimentos] = useState(movimentosMock);
  const [searchTerm, setSearchTerm] = useState("");
  const [tipoFilter, setTipoFilter] = useState("todos");
  const [dataFilter, setDataFilter] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const filteredMovimentos = movimentos.filter(movimento => {
    const matchesSearch = movimento.produto.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         movimento.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         movimento.responsavel.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTipo = tipoFilter === "todos" || movimento.tipo === tipoFilter;
    const matchesData = !dataFilter || movimento.data === dataFilter;
    return matchesSearch && matchesTipo && matchesData;
  });

  const handleCreateMovimento = (movimentoData: any) => {
    const newMovimento = {
      id: movimentos.length + 1,
      ...movimentoData,
      quantidade: parseInt(movimentoData.quantidade) || 0,
      valorUnitario: parseFloat(movimentoData.valorUnitario) || 0,
      valorTotal: (parseFloat(movimentoData.valorUnitario) || 0) * (parseInt(movimentoData.quantidade) || 0),
      data: new Date().toISOString().split('T')[0]
    };
    setMovimentos([...movimentos, newMovimento]);
    setIsCreateDialogOpen(false);
  };

  const getTipoBadge = (tipo: string) => {
    return tipo === "entrada" ? (
      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
        <ArrowUp className="h-3 w-3 mr-1" />
        Entrada
      </Badge>
    ) : (
      <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
        <ArrowDown className="h-3 w-3 mr-1" />
        Saída
      </Badge>
    );
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const calcularTotalEntradas = () => {
    return movimentos
      .filter(m => m.tipo === "entrada")
      .reduce((total, m) => total + m.valorTotal, 0);
  };

  const calcularTotalSaidas = () => {
    return movimentos
      .filter(m => m.tipo === "saida")
      .reduce((total, m) => total + m.valorTotal, 0);
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Movimentações de Estoque</h1>
            <p className="text-muted-foreground">
              Controle de entrada e saída de produtos
            </p>
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary">
                <Plus className="h-4 w-4 mr-2" />
                Nova Movimentação
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Nova Movimentação</DialogTitle>
                <DialogDescription>
                  Registre uma nova entrada ou saída de estoque
                </DialogDescription>
              </DialogHeader>
              <CreateMovimentoForm onSubmit={handleCreateMovimento} />
            </DialogContent>
          </Dialog>
        </div>

        {/* Cards de Resumo */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Movimentações</CardTitle>
              <Package className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{movimentos.length}</div>
              <p className="text-xs text-muted-foreground">
                Movimentações registradas
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Entradas</CardTitle>
              <ArrowUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {movimentos.filter(m => m.tipo === "entrada").length}
              </div>
              <p className="text-xs text-muted-foreground">
                {formatCurrency(calcularTotalEntradas())}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Saídas</CardTitle>
              <ArrowDown className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {movimentos.filter(m => m.tipo === "saida").length}
              </div>
              <p className="text-xs text-muted-foreground">
                {formatCurrency(calcularTotalSaidas())}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Saldo</CardTitle>
              <Package className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatCurrency(calcularTotalEntradas() - calcularTotalSaidas())}
              </div>
              <p className="text-xs text-muted-foreground">
                Valor em estoque
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
                <Label htmlFor="search">Buscar</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="search"
                    placeholder="Buscar por produto, código ou responsável..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="w-32">
                <Label htmlFor="tipo">Tipo</Label>
                <Select value={tipoFilter} onValueChange={setTipoFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos</SelectItem>
                    <SelectItem value="entrada">Entrada</SelectItem>
                    <SelectItem value="saida">Saída</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-40">
                <Label htmlFor="data">Data</Label>
                <Input
                  id="data"
                  type="date"
                  value={dataFilter}
                  onChange={(e) => setDataFilter(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabela de Movimentações */}
        <Card>
          <CardHeader>
            <CardTitle>Histórico de Movimentações</CardTitle>
            <CardDescription>
              {filteredMovimentos.length} movimentação(ões) encontrada(s)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Produto</TableHead>
                    <TableHead>Quantidade</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Responsável</TableHead>
                    <TableHead>Motivo</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Observações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMovimentos.map((movimento) => (
                    <TableRow key={movimento.id}>
                      <TableCell>{getTipoBadge(movimento.tipo)}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{movimento.produto}</div>
                          <div className="text-sm text-muted-foreground">{movimento.codigo}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-center">
                          <div className="font-medium">{movimento.quantidade}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {movimento.data}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {movimento.responsavel}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{movimento.motivo}</div>
                        {movimento.tipo === "entrada" && (
                          <div className="text-xs text-muted-foreground">
                            Fornecedor: {movimento.fornecedor}
                          </div>
                        )}
                        {movimento.tipo === "saida" && (
                          <div className="text-xs text-muted-foreground">
                            Cliente: {movimento.cliente}
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>Unit: {formatCurrency(movimento.valorUnitario)}</div>
                          <div className="font-medium">Total: {formatCurrency(movimento.valorTotal)}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm text-muted-foreground max-w-[200px] truncate">
                          {movimento.observacoes}
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

// Componente do formulário de criação
function CreateMovimentoForm({ onSubmit }: { onSubmit: (data: any) => void }) {
  const [formData, setFormData] = useState({
    tipo: "entrada",
    produto: "",
    codigo: "",
    quantidade: "",
    motivo: "",
    fornecedor: "",
    cliente: "",
    valorUnitario: "",
    observacoes: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="tipo">Tipo de Movimentação</Label>
          <Select value={formData.tipo} onValueChange={(value) => setFormData({ ...formData, tipo: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {tiposMovimento.map(tipo => (
                <SelectItem key={tipo.key} value={tipo.key}>{tipo.nome}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="motivo">Motivo</Label>
          <Select value={formData.motivo} onValueChange={(value) => setFormData({ ...formData, motivo: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione o motivo" />
            </SelectTrigger>
            <SelectContent>
              {motivos.map(motivo => (
                <SelectItem key={motivo} value={motivo}>{motivo}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="produto">Produto</Label>
          <Input
            id="produto"
            value={formData.produto}
            onChange={(e) => setFormData({ ...formData, produto: e.target.value })}
            placeholder="Nome do produto"
            required
          />
        </div>
        <div>
          <Label htmlFor="codigo">Código do Produto</Label>
          <Input
            id="codigo"
            value={formData.codigo}
            onChange={(e) => setFormData({ ...formData, codigo: e.target.value })}
            placeholder="Código do produto"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="quantidade">Quantidade</Label>
          <Input
            id="quantidade"
            type="number"
            value={formData.quantidade}
            onChange={(e) => setFormData({ ...formData, quantidade: e.target.value })}
            placeholder="0"
            min="1"
            required
          />
        </div>
        <div>
          <Label htmlFor="valorUnitario">Valor Unitário (R$)</Label>
          <Input
            id="valorUnitario"
            type="number"
            value={formData.valorUnitario}
            onChange={(e) => setFormData({ ...formData, valorUnitario: e.target.value })}
            placeholder="0.00"
            min="0"
            step="0.01"
            required
          />
        </div>
      </div>

      {formData.tipo === "entrada" && (
        <div>
          <Label htmlFor="fornecedor">Fornecedor</Label>
          <Input
            id="fornecedor"
            value={formData.fornecedor}
            onChange={(e) => setFormData({ ...formData, fornecedor: e.target.value })}
            placeholder="Nome do fornecedor"
            required
          />
        </div>
      )}

      {formData.tipo === "saida" && (
        <div>
          <Label htmlFor="cliente">Cliente</Label>
          <Input
            id="cliente"
            value={formData.cliente}
            onChange={(e) => setFormData({ ...formData, cliente: e.target.value })}
            placeholder="Nome do cliente"
            required
          />
        </div>
      )}

      <div>
        <Label htmlFor="observacoes">Observações</Label>
        <Textarea
          id="observacoes"
          value={formData.observacoes}
          onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })}
          placeholder="Observações adicionais"
        />
      </div>

      <DialogFooter>
        <Button type="submit">Registrar Movimentação</Button>
      </DialogFooter>
    </form>
  );
} 