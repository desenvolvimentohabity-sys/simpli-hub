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
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Plus, Search, MoreHorizontal, Edit, Trash2, Package, AlertTriangle, TrendingUp, DollarSign } from "lucide-react";

// Dados mockados para produtos
const produtosMock = [
  {
    id: 1,
    codigo: "PROD001",
    nome: "Notebook Dell Inspiron",
    descricao: "Notebook Dell Inspiron 15 polegadas, Intel i5, 8GB RAM, 256GB SSD",
    categoria: "Eletrônicos",
    marca: "Dell",
    modelo: "Inspiron 15",
    precoCusto: 2500.00,
    precoVenda: 3200.00,
    estoqueMinimo: 5,
    estoqueAtual: 12,
    unidade: "unidade",
    fornecedor: "Fornecedor A",
    status: "ativo",
    localizacao: "Prateleira A1",
    peso: 2.5,
    dimensoes: "35 x 24 x 2 cm"
  },
  {
    id: 2,
    codigo: "PROD002",
    nome: "Mouse Wireless Logitech",
    descricao: "Mouse sem fio Logitech com sensor óptico de alta precisão",
    categoria: "Periféricos",
    marca: "Logitech",
    modelo: "M185",
    precoCusto: 45.00,
    precoVenda: 69.90,
    estoqueMinimo: 10,
    estoqueAtual: 25,
    unidade: "unidade",
    fornecedor: "Fornecedor B",
    status: "ativo",
    localizacao: "Prateleira B2",
    peso: 0.1,
    dimensoes: "10 x 6 x 3 cm"
  },
  {
    id: 3,
    codigo: "PROD003",
    nome: "Teclado Mecânico RGB",
    descricao: "Teclado mecânico com switches Cherry MX e iluminação RGB",
    categoria: "Periféricos",
    marca: "Corsair",
    modelo: "K70 RGB",
    precoCusto: 350.00,
    precoVenda: 499.90,
    estoqueMinimo: 3,
    estoqueAtual: 1,
    unidade: "unidade",
    fornecedor: "Fornecedor C",
    status: "ativo",
    localizacao: "Prateleira C3",
    peso: 1.2,
    dimensoes: "44 x 13 x 3 cm"
  }
];

const categorias = [
  "Eletrônicos",
  "Periféricos",
  "Informática",
  "Móveis",
  "Escritório",
  "Vestuário",
  "Alimentos",
  "Bebidas",
  "Higiene",
  "Limpeza"
];

const unidades = [
  "unidade",
  "kg",
  "g",
  "l",
  "ml",
  "m",
  "cm",
  "caixa",
  "pacote",
  "par"
];

const fornecedores = [
  "Fornecedor A",
  "Fornecedor B", 
  "Fornecedor C",
  "Fornecedor D",
  "Fornecedor E"
];

export default function Produtos() {
  const [produtos, setProdutos] = useState(produtosMock);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoriaFilter, setCategoriaFilter] = useState("todos");
  const [statusFilter, setStatusFilter] = useState("todos");
  const [estoqueFilter, setEstoqueFilter] = useState("todos");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingProduto, setEditingProduto] = useState<any>(null);

  const filteredProdutos = produtos.filter(produto => {
    const matchesSearch = produto.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         produto.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         produto.marca.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategoria = categoriaFilter === "todos" || produto.categoria === categoriaFilter;
    const matchesStatus = statusFilter === "todos" || produto.status === statusFilter;
    
    let matchesEstoque = true;
    if (estoqueFilter === "baixo") {
      matchesEstoque = produto.estoqueAtual <= produto.estoqueMinimo;
    } else if (estoqueFilter === "normal") {
      matchesEstoque = produto.estoqueAtual > produto.estoqueMinimo;
    }
    
    return matchesSearch && matchesCategoria && matchesStatus && matchesEstoque;
  });

  const handleCreateProduto = (produtoData: any) => {
    const newProduto = {
      id: produtos.length + 1,
      ...produtoData,
      precoCusto: parseFloat(produtoData.precoCusto) || 0,
      precoVenda: parseFloat(produtoData.precoVenda) || 0,
      estoqueMinimo: parseInt(produtoData.estoqueMinimo) || 0,
      estoqueAtual: parseInt(produtoData.estoqueAtual) || 0,
      peso: parseFloat(produtoData.peso) || 0
    };
    setProdutos([...produtos, newProduto]);
    setIsCreateDialogOpen(false);
  };

  const handleEditProduto = (produtoData: any) => {
    setProdutos(produtos.map(p => 
      p.id === editingProduto.id 
        ? { 
            ...p, 
            ...produtoData,
            precoCusto: parseFloat(produtoData.precoCusto) || 0,
            precoVenda: parseFloat(produtoData.precoVenda) || 0,
            estoqueMinimo: parseInt(produtoData.estoqueMinimo) || 0,
            estoqueAtual: parseInt(produtoData.estoqueAtual) || 0,
            peso: parseFloat(produtoData.peso) || 0
          }
        : p
    ));
    setIsEditDialogOpen(false);
    setEditingProduto(null);
  };

  const handleDeleteProduto = (produtoId: number) => {
    setProdutos(produtos.filter(p => p.id !== produtoId));
  };

  const getStatusBadge = (status: string) => {
    return status === "ativo" ? (
      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Ativo</Badge>
    ) : (
      <Badge variant="secondary">Inativo</Badge>
    );
  };

  const getEstoqueBadge = (produto: any) => {
    if (produto.estoqueAtual <= produto.estoqueMinimo) {
      return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Estoque Baixo</Badge>;
    } else if (produto.estoqueAtual <= produto.estoqueMinimo * 1.5) {
      return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Atenção</Badge>;
    } else {
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Normal</Badge>;
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const calcularMargem = (custo: number, venda: number) => {
    if (custo === 0) return 0;
    return ((venda - custo) / custo) * 100;
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Produtos</h1>
            <p className="text-muted-foreground">
              Gerencie o catálogo de produtos do estoque
            </p>
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary">
                <Plus className="h-4 w-4 mr-2" />
                Novo Produto
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>Criar Novo Produto</DialogTitle>
                <DialogDescription>
                  Preencha as informações para criar um novo produto
                </DialogDescription>
              </DialogHeader>
              <CreateProdutoForm onSubmit={handleCreateProduto} />
            </DialogContent>
          </Dialog>
        </div>

        {/* Cards de Resumo */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Produtos</CardTitle>
              <Package className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{produtos.length}</div>
              <p className="text-xs text-muted-foreground">
                Produtos cadastrados
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Valor Total em Estoque</CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatCurrency(produtos.reduce((total, p) => total + (p.precoCusto * p.estoqueAtual), 0))}
              </div>
              <p className="text-xs text-muted-foreground">
                Valor de custo total
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Produtos com Estoque Baixo</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {produtos.filter(p => p.estoqueAtual <= p.estoqueMinimo).length}
              </div>
              <p className="text-xs text-muted-foreground">
                Necessitam reposição
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Margem Média</CardTitle>
              <TrendingUp className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {produtos.length > 0 
                  ? (produtos.reduce((total, p) => total + calcularMargem(p.precoCusto, p.precoVenda), 0) / produtos.length).toFixed(1)
                  : 0}%
              </div>
              <p className="text-xs text-muted-foreground">
                Margem de lucro média
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
                    placeholder="Buscar por nome, código ou marca..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
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
              <div className="w-32">
                <Label htmlFor="status">Status</Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos</SelectItem>
                    <SelectItem value="ativo">Ativo</SelectItem>
                    <SelectItem value="inativo">Inativo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-40">
                <Label htmlFor="estoque">Estoque</Label>
                <Select value={estoqueFilter} onValueChange={setEstoqueFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Estoque" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos</SelectItem>
                    <SelectItem value="baixo">Estoque Baixo</SelectItem>
                    <SelectItem value="normal">Estoque Normal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabela de Produtos */}
        <Card>
          <CardHeader>
            <CardTitle>Lista de Produtos</CardTitle>
            <CardDescription>
              {filteredProdutos.length} produto(s) encontrado(s)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Produto</TableHead>
                    <TableHead>Código</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead>Preços</TableHead>
                    <TableHead>Estoque</TableHead>
                    <TableHead>Fornecedor</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[50px]">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProdutos.map((produto) => (
                    <TableRow key={produto.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{produto.nome}</div>
                          <div className="text-sm text-muted-foreground">{produto.marca} - {produto.modelo}</div>
                          <div className="text-xs text-muted-foreground">{produto.descricao}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-mono text-sm">{produto.codigo}</div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{produto.categoria}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="text-sm">
                            <span className="text-muted-foreground">Custo: </span>
                            <span className="font-medium">{formatCurrency(produto.precoCusto)}</span>
                          </div>
                          <div className="text-sm">
                            <span className="text-muted-foreground">Venda: </span>
                            <span className="font-medium text-green-600">{formatCurrency(produto.precoVenda)}</span>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Margem: {calcularMargem(produto.precoCusto, produto.precoVenda).toFixed(1)}%
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{produto.estoqueAtual}</span>
                            <span className="text-sm text-muted-foreground">/ {produto.estoqueMinimo}</span>
                            <span className="text-xs text-muted-foreground">{produto.unidade}</span>
                          </div>
                          {getEstoqueBadge(produto)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{produto.fornecedor}</div>
                        <div className="text-xs text-muted-foreground">{produto.localizacao}</div>
                      </TableCell>
                      <TableCell>{getStatusBadge(produto.status)}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Ações</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => {
                              setEditingProduto(produto);
                              setIsEditDialogOpen(true);
                            }}>
                              <Edit className="h-4 w-4 mr-2" />
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="text-red-600"
                              onClick={() => handleDeleteProduto(produto.id)}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Excluir
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Dialog de Edição */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Editar Produto</DialogTitle>
              <DialogDescription>
                Edite as informações do produto
              </DialogDescription>
            </DialogHeader>
            {editingProduto && (
              <EditProdutoForm produto={editingProduto} onSubmit={handleEditProduto} />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
}

// Componente do formulário de criação
function CreateProdutoForm({ onSubmit }: { onSubmit: (data: any) => void }) {
  const [formData, setFormData] = useState({
    codigo: "",
    nome: "",
    descricao: "",
    categoria: "",
    marca: "",
    modelo: "",
    precoCusto: "",
    precoVenda: "",
    estoqueMinimo: "",
    estoqueAtual: "",
    unidade: "",
    fornecedor: "",
    status: "ativo",
    localizacao: "",
    peso: "",
    dimensoes: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="codigo">Código do Produto</Label>
          <Input
            id="codigo"
            value={formData.codigo}
            onChange={(e) => setFormData({ ...formData, codigo: e.target.value })}
            placeholder="Ex: PROD001"
            required
          />
        </div>
        <div>
          <Label htmlFor="nome">Nome do Produto</Label>
          <Input
            id="nome"
            value={formData.nome}
            onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
            placeholder="Nome do produto"
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="descricao">Descrição</Label>
        <Textarea
          id="descricao"
          value={formData.descricao}
          onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
          placeholder="Descrição detalhada do produto"
          required
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
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
          <Label htmlFor="marca">Marca</Label>
          <Input
            id="marca"
            value={formData.marca}
            onChange={(e) => setFormData({ ...formData, marca: e.target.value })}
            placeholder="Marca do produto"
            required
          />
        </div>
        <div>
          <Label htmlFor="modelo">Modelo</Label>
          <Input
            id="modelo"
            value={formData.modelo}
            onChange={(e) => setFormData({ ...formData, modelo: e.target.value })}
            placeholder="Modelo do produto"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div>
          <Label htmlFor="precoCusto">Preço de Custo (R$)</Label>
          <Input
            id="precoCusto"
            type="number"
            value={formData.precoCusto}
            onChange={(e) => setFormData({ ...formData, precoCusto: e.target.value })}
            placeholder="0.00"
            min="0"
            step="0.01"
            required
          />
        </div>
        <div>
          <Label htmlFor="precoVenda">Preço de Venda (R$)</Label>
          <Input
            id="precoVenda"
            type="number"
            value={formData.precoVenda}
            onChange={(e) => setFormData({ ...formData, precoVenda: e.target.value })}
            placeholder="0.00"
            min="0"
            step="0.01"
            required
          />
        </div>
        <div>
          <Label htmlFor="estoqueMinimo">Estoque Mínimo</Label>
          <Input
            id="estoqueMinimo"
            type="number"
            value={formData.estoqueMinimo}
            onChange={(e) => setFormData({ ...formData, estoqueMinimo: e.target.value })}
            placeholder="0"
            min="0"
            required
          />
        </div>
        <div>
          <Label htmlFor="estoqueAtual">Estoque Atual</Label>
          <Input
            id="estoqueAtual"
            type="number"
            value={formData.estoqueAtual}
            onChange={(e) => setFormData({ ...formData, estoqueAtual: e.target.value })}
            placeholder="0"
            min="0"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label htmlFor="unidade">Unidade</Label>
          <Select value={formData.unidade} onValueChange={(value) => setFormData({ ...formData, unidade: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione a unidade" />
            </SelectTrigger>
            <SelectContent>
              {unidades.map(unidade => (
                <SelectItem key={unidade} value={unidade}>{unidade}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="fornecedor">Fornecedor</Label>
          <Select value={formData.fornecedor} onValueChange={(value) => setFormData({ ...formData, fornecedor: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione o fornecedor" />
            </SelectTrigger>
            <SelectContent>
              {fornecedores.map(fornecedor => (
                <SelectItem key={fornecedor} value={fornecedor}>{fornecedor}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="status">Status</Label>
          <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ativo">Ativo</SelectItem>
              <SelectItem value="inativo">Inativo</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label htmlFor="localizacao">Localização no Estoque</Label>
          <Input
            id="localizacao"
            value={formData.localizacao}
            onChange={(e) => setFormData({ ...formData, localizacao: e.target.value })}
            placeholder="Ex: Prateleira A1"
          />
        </div>
        <div>
          <Label htmlFor="peso">Peso (kg)</Label>
          <Input
            id="peso"
            type="number"
            value={formData.peso}
            onChange={(e) => setFormData({ ...formData, peso: e.target.value })}
            placeholder="0.0"
            min="0"
            step="0.1"
          />
        </div>
        <div>
          <Label htmlFor="dimensoes">Dimensões</Label>
          <Input
            id="dimensoes"
            value={formData.dimensoes}
            onChange={(e) => setFormData({ ...formData, dimensoes: e.target.value })}
            placeholder="Ex: 10 x 5 x 2 cm"
          />
        </div>
      </div>

      <DialogFooter>
        <Button type="submit">Criar Produto</Button>
      </DialogFooter>
    </form>
  );
}

// Componente do formulário de edição
function EditProdutoForm({ produto, onSubmit }: { produto: any; onSubmit: (data: any) => void }) {
  const [formData, setFormData] = useState({
    codigo: produto.codigo,
    nome: produto.nome,
    descricao: produto.descricao,
    categoria: produto.categoria,
    marca: produto.marca,
    modelo: produto.modelo,
    precoCusto: produto.precoCusto.toString(),
    precoVenda: produto.precoVenda.toString(),
    estoqueMinimo: produto.estoqueMinimo.toString(),
    estoqueAtual: produto.estoqueAtual.toString(),
    unidade: produto.unidade,
    fornecedor: produto.fornecedor,
    status: produto.status,
    localizacao: produto.localizacao,
    peso: produto.peso.toString(),
    dimensoes: produto.dimensoes
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="edit-codigo">Código do Produto</Label>
          <Input
            id="edit-codigo"
            value={formData.codigo}
            onChange={(e) => setFormData({ ...formData, codigo: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="edit-nome">Nome do Produto</Label>
          <Input
            id="edit-nome"
            value={formData.nome}
            onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="edit-descricao">Descrição</Label>
        <Textarea
          id="edit-descricao"
          value={formData.descricao}
          onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
          required
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label htmlFor="edit-categoria">Categoria</Label>
          <Select value={formData.categoria} onValueChange={(value) => setFormData({ ...formData, categoria: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categorias.map(categoria => (
                <SelectItem key={categoria} value={categoria}>{categoria}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="edit-marca">Marca</Label>
          <Input
            id="edit-marca"
            value={formData.marca}
            onChange={(e) => setFormData({ ...formData, marca: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="edit-modelo">Modelo</Label>
          <Input
            id="edit-modelo"
            value={formData.modelo}
            onChange={(e) => setFormData({ ...formData, modelo: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div>
          <Label htmlFor="edit-precoCusto">Preço de Custo (R$)</Label>
          <Input
            id="edit-precoCusto"
            type="number"
            value={formData.precoCusto}
            onChange={(e) => setFormData({ ...formData, precoCusto: e.target.value })}
            min="0"
            step="0.01"
            required
          />
        </div>
        <div>
          <Label htmlFor="edit-precoVenda">Preço de Venda (R$)</Label>
          <Input
            id="edit-precoVenda"
            type="number"
            value={formData.precoVenda}
            onChange={(e) => setFormData({ ...formData, precoVenda: e.target.value })}
            min="0"
            step="0.01"
            required
          />
        </div>
        <div>
          <Label htmlFor="edit-estoqueMinimo">Estoque Mínimo</Label>
          <Input
            id="edit-estoqueMinimo"
            type="number"
            value={formData.estoqueMinimo}
            onChange={(e) => setFormData({ ...formData, estoqueMinimo: e.target.value })}
            min="0"
            required
          />
        </div>
        <div>
          <Label htmlFor="edit-estoqueAtual">Estoque Atual</Label>
          <Input
            id="edit-estoqueAtual"
            type="number"
            value={formData.estoqueAtual}
            onChange={(e) => setFormData({ ...formData, estoqueAtual: e.target.value })}
            min="0"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label htmlFor="edit-unidade">Unidade</Label>
          <Select value={formData.unidade} onValueChange={(value) => setFormData({ ...formData, unidade: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {unidades.map(unidade => (
                <SelectItem key={unidade} value={unidade}>{unidade}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="edit-fornecedor">Fornecedor</Label>
          <Select value={formData.fornecedor} onValueChange={(value) => setFormData({ ...formData, fornecedor: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {fornecedores.map(fornecedor => (
                <SelectItem key={fornecedor} value={fornecedor}>{fornecedor}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="edit-status">Status</Label>
          <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ativo">Ativo</SelectItem>
              <SelectItem value="inativo">Inativo</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label htmlFor="edit-localizacao">Localização no Estoque</Label>
          <Input
            id="edit-localizacao"
            value={formData.localizacao}
            onChange={(e) => setFormData({ ...formData, localizacao: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="edit-peso">Peso (kg)</Label>
          <Input
            id="edit-peso"
            type="number"
            value={formData.peso}
            onChange={(e) => setFormData({ ...formData, peso: e.target.value })}
            min="0"
            step="0.1"
          />
        </div>
        <div>
          <Label htmlFor="edit-dimensoes">Dimensões</Label>
          <Input
            id="edit-dimensoes"
            value={formData.dimensoes}
            onChange={(e) => setFormData({ ...formData, dimensoes: e.target.value })}
          />
        </div>
      </div>

      <DialogFooter>
        <Button type="submit">Salvar Alterações</Button>
      </DialogFooter>
    </form>
  );
} 