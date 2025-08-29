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
import { Plus, Search, DollarSign, Calendar, AlertTriangle, CheckCircle } from "lucide-react";

// Dados mockados para contas a pagar
const contasPagarMock = [
  {
    id: 1,
    descricao: "Aluguel do Escritório",
    fornecedor: "Imobiliária ABC",
    valor: 5000.00,
    dataVencimento: "2024-02-01",
    dataPagamento: null,
    status: "pendente",
    categoria: "Despesas Operacionais",
    formaPagamento: "Transferência",
    observacoes: "Aluguel mensal do escritório"
  },
  {
    id: 2,
    descricao: "Fornecedor de Material",
    fornecedor: "Fornecedor XYZ",
    valor: 2500.00,
    dataVencimento: "2024-01-25",
    dataPagamento: "2024-01-20",
    status: "pago",
    categoria: "Fornecedores",
    formaPagamento: "Boleto",
    observacoes: "Material de escritório"
  }
];

const categorias = [
  "Fornecedores",
  "Despesas Operacionais",
  "Impostos",
  "Salários",
  "Serviços",
  "Manutenção",
  "Marketing",
  "Outros"
];

const formasPagamento = [
  "Boleto",
  "Transferência",
  "PIX",
  "Cartão de Crédito",
  "Cartão de Débito",
  "Dinheiro",
  "Cheque"
];

export default function ContasPagar() {
  const [contas, setContas] = useState(contasPagarMock);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos");
  const [categoriaFilter, setCategoriaFilter] = useState("todos");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const filteredContas = contas.filter(conta => {
    const matchesSearch = conta.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         conta.fornecedor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "todos" || conta.status === statusFilter;
    const matchesCategoria = categoriaFilter === "todos" || conta.categoria === categoriaFilter;
    return matchesSearch && matchesStatus && matchesCategoria;
  });

  const handleCreateConta = (contaData: any) => {
    const newConta = {
      id: contas.length + 1,
      ...contaData,
      valor: parseFloat(contaData.valor) || 0,
      dataPagamento: null,
      status: "pendente"
    };
    setContas([...contas, newConta]);
    setIsCreateDialogOpen(false);
  };

  const handlePagarConta = (contaId: number) => {
    setContas(contas.map(c => 
      c.id === contaId 
        ? { ...c, status: "pago", dataPagamento: new Date().toISOString().split('T')[0] }
        : c
    ));
  };

  const getStatusBadge = (status: string) => {
    return status === "pago" ? (
      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
        <CheckCircle className="h-3 w-3 mr-1" />
        Pago
      </Badge>
    ) : (
      <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
        <AlertTriangle className="h-3 w-3 mr-1" />
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

  const calcularTotalPago = () => {
    return contas
      .filter(c => c.status === "pago")
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
            <h1 className="text-3xl font-bold">Contas a Pagar</h1>
            <p className="text-muted-foreground">
              Gerencie as contas e obrigações da empresa
            </p>
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary">
                <Plus className="h-4 w-4 mr-2" />
                Nova Conta
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Nova Conta a Pagar</DialogTitle>
                <DialogDescription>
                  Registre uma nova obrigação a pagar
                </DialogDescription>
              </DialogHeader>
              <CreateContaForm onSubmit={handleCreateConta} />
            </DialogContent>
          </Dialog>
        </div>

        {/* Cards de Resumo */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Contas</CardTitle>
              <DollarSign className="h-4 w-4 text-primary" />
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
              <AlertTriangle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {formatCurrency(calcularTotalPendente())}
              </div>
              <p className="text-xs text-muted-foreground">
                A pagar
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Pago</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {formatCurrency(calcularTotalPago())}
              </div>
              <p className="text-xs text-muted-foreground">
                Já pagos
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
                <Label htmlFor="search">Buscar</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="search"
                    placeholder="Buscar por descrição ou fornecedor..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="w-40">
                <Label htmlFor="status">Status</Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos</SelectItem>
                    <SelectItem value="pendente">Pendente</SelectItem>
                    <SelectItem value="pago">Pago</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-40">
                <Label htmlFor="categoria">Categoria</Label>
                <Select value={categoriaFilter} onValueChange={setCategoriaFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todas</SelectItem>
                    {categorias.map(categoria => (
                      <SelectItem key={categoria} value={categoria}>{categoria}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabela de Contas */}
        <Card>
          <CardHeader>
            <CardTitle>Lista de Contas a Pagar</CardTitle>
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
                    <TableHead>Fornecedor</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Vencimento</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Forma Pagamento</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredContas.map((conta) => (
                    <TableRow key={conta.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{conta.descricao}</div>
                          <div className="text-sm text-muted-foreground">{conta.observacoes}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{conta.fornecedor}</div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{formatCurrency(conta.valor)}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {conta.dataVencimento}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{conta.categoria}</Badge>
                      </TableCell>
                      <TableCell>{getStatusBadge(conta.status)}</TableCell>
                      <TableCell>
                        <div className="text-sm">{conta.formaPagamento}</div>
                      </TableCell>
                      <TableCell>
                        {conta.status === "pendente" && (
                          <Button
                            size="sm"
                            onClick={() => handlePagarConta(conta.id)}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            Marcar como Pago
                          </Button>
                        )}
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
function CreateContaForm({ onSubmit }: { onSubmit: (data: any) => void }) {
  const [formData, setFormData] = useState({
    descricao: "",
    fornecedor: "",
    valor: "",
    dataVencimento: "",
    categoria: "",
    formaPagamento: "",
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
          <Label htmlFor="descricao">Descrição</Label>
          <Input
            id="descricao"
            value={formData.descricao}
            onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
            placeholder="Descrição da conta"
            required
          />
        </div>
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
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="valor">Valor (R$)</Label>
          <Input
            id="valor"
            type="number"
            value={formData.valor}
            onChange={(e) => setFormData({ ...formData, valor: e.target.value })}
            placeholder="0.00"
            min="0"
            step="0.01"
            required
          />
        </div>
        <div>
          <Label htmlFor="dataVencimento">Data de Vencimento</Label>
          <Input
            id="dataVencimento"
            type="date"
            value={formData.dataVencimento}
            onChange={(e) => setFormData({ ...formData, dataVencimento: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="categoria">Categoria</Label>
          <Select value={formData.categoria} onValueChange={(value) => setFormData({ ...formData, categoria: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione a categoria" />
            </SelectTrigger>
            <SelectContent>
              {categorias.map(categoria => (
                <SelectItem key={categoria} value={categoria}>{categoria}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="formaPagamento">Forma de Pagamento</Label>
          <Select value={formData.formaPagamento} onValueChange={(value) => setFormData({ ...formData, formaPagamento: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione a forma" />
            </SelectTrigger>
            <SelectContent>
              {formasPagamento.map(forma => (
                <SelectItem key={forma} value={forma}>{forma}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

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
        <Button type="submit">Criar Conta</Button>
      </DialogFooter>
    </form>
  );
} 