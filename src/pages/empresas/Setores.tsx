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
import { Plus, Search, MoreHorizontal, Edit, Trash2, Building2, Users, Briefcase, Target } from "lucide-react";

// Dados mockados para setores
const setoresMock = [
  {
    id: 1,
    nome: "Administrativo",
    descricao: "Setor responsável pela administração geral da empresa",
    empresa: "Empresa Principal Ltda",
    responsavel: "João Silva",
    funcionarios: 15,
    status: "ativo",
    tipo: "interno",
    orcamento: 150000,
    area: "Gestão"
  },
  {
    id: 2,
    nome: "Vendas",
    descricao: "Setor responsável pelas vendas e relacionamento com clientes",
    empresa: "Empresa Principal Ltda",
    responsavel: "Maria Santos",
    funcionarios: 25,
    status: "ativo",
    tipo: "operacional",
    orcamento: 300000,
    area: "Comercial"
  },
  {
    id: 3,
    nome: "TI",
    descricao: "Setor de Tecnologia da Informação",
    empresa: "Empresa Principal Ltda",
    responsavel: "Pedro Costa",
    funcionarios: 8,
    status: "ativo",
    tipo: "suporte",
    orcamento: 200000,
    area: "Tecnologia"
  },
  {
    id: 4,
    nome: "Logística",
    descricao: "Setor responsável pela logística e distribuição",
    empresa: "Filial Norte Ltda",
    responsavel: "Ana Oliveira",
    funcionarios: 12,
    status: "ativo",
    tipo: "operacional",
    orcamento: 180000,
    area: "Operações"
  }
];

const empresas = [
  "Empresa Principal Ltda",
  "Filial Norte Ltda",
  "Empresa Inativa Ltda"
];

const areas = [
  "Gestão",
  "Comercial", 
  "Tecnologia",
  "Operações",
  "Financeiro",
  "Recursos Humanos",
  "Marketing",
  "Produção"
];

const tipos = [
  { key: "interno", nome: "Interno", desc: "Setor interno da empresa" },
  { key: "operacional", nome: "Operacional", desc: "Setor operacional" },
  { key: "suporte", nome: "Suporte", desc: "Setor de suporte" },
  { key: "estratégico", nome: "Estratégico", desc: "Setor estratégico" }
];

export default function Setores() {
  const [setores, setSetores] = useState(setoresMock);
  const [searchTerm, setSearchTerm] = useState("");
  const [empresaFilter, setEmpresaFilter] = useState("todos");
  const [areaFilter, setAreaFilter] = useState("todos");
  const [statusFilter, setStatusFilter] = useState("todos");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingSetor, setEditingSetor] = useState<any>(null);

  const filteredSetores = setores.filter(setor => {
    const matchesSearch = setor.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         setor.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         setor.responsavel.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesEmpresa = empresaFilter === "todos" || setor.empresa === empresaFilter;
    const matchesArea = areaFilter === "todos" || setor.area === areaFilter;
    const matchesStatus = statusFilter === "todos" || setor.status === statusFilter;
    return matchesSearch && matchesEmpresa && matchesArea && matchesStatus;
  });

  const handleCreateSetor = (setorData: any) => {
    const newSetor = {
      id: setores.length + 1,
      ...setorData,
      funcionarios: parseInt(setorData.funcionarios) || 0,
      orcamento: parseFloat(setorData.orcamento) || 0
    };
    setSetores([...setores, newSetor]);
    setIsCreateDialogOpen(false);
  };

  const handleEditSetor = (setorData: any) => {
    setSetores(setores.map(s => 
      s.id === editingSetor.id 
        ? { 
            ...s, 
            ...setorData, 
            funcionarios: parseInt(setorData.funcionarios) || 0,
            orcamento: parseFloat(setorData.orcamento) || 0
          }
        : s
    ));
    setIsEditDialogOpen(false);
    setEditingSetor(null);
  };

  const handleDeleteSetor = (setorId: number) => {
    setSetores(setores.filter(s => s.id !== setorId));
  };

  const getStatusBadge = (status: string) => {
    return status === "ativo" ? (
      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Ativo</Badge>
    ) : (
      <Badge variant="secondary">Inativo</Badge>
    );
  };

  const getTipoBadge = (tipo: string) => {
    const tipoInfo = tipos.find(t => t.key === tipo);
    if (!tipoInfo) return <Badge variant="outline">{tipo}</Badge>;
    
    const colors = {
      interno: "bg-blue-100 text-blue-800",
      operacional: "bg-green-100 text-green-800", 
      suporte: "bg-orange-100 text-orange-800",
      estratégico: "bg-purple-100 text-purple-800"
    };
    
    return (
      <Badge className={`${colors[tipo as keyof typeof colors]} hover:${colors[tipo as keyof typeof colors]}`}>
        {tipoInfo.nome}
      </Badge>
    );
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
            <h1 className="text-3xl font-bold">Setores</h1>
            <p className="text-muted-foreground">
              Gerencie os setores das empresas
            </p>
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary">
                <Plus className="h-4 w-4 mr-2" />
                Novo Setor
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Criar Novo Setor</DialogTitle>
                <DialogDescription>
                  Preencha as informações para criar um novo setor
                </DialogDescription>
              </DialogHeader>
              <CreateSetorForm onSubmit={handleCreateSetor} />
            </DialogContent>
          </Dialog>
        </div>

        {/* Cards de Resumo */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Setores</CardTitle>
              <Briefcase className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{setores.length}</div>
              <p className="text-xs text-muted-foreground">
                Setores cadastrados
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Funcionários</CardTitle>
              <Users className="h-4 w-4 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {setores.reduce((total, setor) => total + setor.funcionarios, 0)}
              </div>
              <p className="text-xs text-muted-foreground">
                Funcionários nos setores
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Orçamento Total</CardTitle>
              <Target className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatCurrency(setores.reduce((total, setor) => total + setor.orcamento, 0))}
              </div>
              <p className="text-xs text-muted-foreground">
                Orçamento total dos setores
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Setores Ativos</CardTitle>
              <Badge className="bg-green-100 text-green-800">Ativos</Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {setores.filter(s => s.status === "ativo").length}
              </div>
              <p className="text-xs text-muted-foreground">
                Setores em operação
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
                    placeholder="Buscar por nome, descrição ou responsável..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="w-40">
                <Label htmlFor="empresa">Empresa</Label>
                <Select value={empresaFilter} onValueChange={setEmpresaFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Empresa" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todas</SelectItem>
                    {empresas.map(empresa => (
                      <SelectItem key={empresa} value={empresa}>{empresa}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="w-32">
                <Label htmlFor="area">Área</Label>
                <Select value={areaFilter} onValueChange={setAreaFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Área" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todas</SelectItem>
                    {areas.map(area => (
                      <SelectItem key={area} value={area}>{area}</SelectItem>
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
            </div>
          </CardContent>
        </Card>

        {/* Tabela de Setores */}
        <Card>
          <CardHeader>
            <CardTitle>Lista de Setores</CardTitle>
            <CardDescription>
              {filteredSetores.length} setor(es) encontrado(s)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Setor</TableHead>
                  <TableHead>Empresa</TableHead>
                  <TableHead>Responsável</TableHead>
                  <TableHead>Funcionários</TableHead>
                  <TableHead>Orçamento</TableHead>
                  <TableHead>Área</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[50px]">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSetores.map((setor) => (
                  <TableRow key={setor.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{setor.nome}</div>
                        <div className="text-sm text-muted-foreground">{setor.descricao}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{setor.empresa}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>{setor.responsavel}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-center">
                        <div className="font-medium">{setor.funcionarios}</div>
                        <div className="text-xs text-muted-foreground">funcionários</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{formatCurrency(setor.orcamento)}</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{setor.area}</Badge>
                    </TableCell>
                    <TableCell>{getTipoBadge(setor.tipo)}</TableCell>
                    <TableCell>{getStatusBadge(setor.status)}</TableCell>
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
                            setEditingSetor(setor);
                            setIsEditDialogOpen(true);
                          }}>
                            <Edit className="h-4 w-4 mr-2" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="text-red-600"
                            onClick={() => handleDeleteSetor(setor.id)}
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
          </CardContent>
        </Card>

        {/* Dialog de Edição */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Editar Setor</DialogTitle>
              <DialogDescription>
                Edite as informações do setor
              </DialogDescription>
            </DialogHeader>
            {editingSetor && (
              <EditSetorForm setor={editingSetor} onSubmit={handleEditSetor} />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
}

// Componente do formulário de criação
function CreateSetorForm({ onSubmit }: { onSubmit: (data: any) => void }) {
  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    empresa: "",
    responsavel: "",
    funcionarios: "",
    status: "ativo",
    tipo: "interno",
    orcamento: "",
    area: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="nome">Nome do Setor</Label>
          <Input
            id="nome"
            value={formData.nome}
            onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
            placeholder="Ex: Administrativo"
            required
          />
        </div>
        <div>
          <Label htmlFor="empresa">Empresa</Label>
          <Select value={formData.empresa} onValueChange={(value) => setFormData({ ...formData, empresa: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione a empresa" />
            </SelectTrigger>
            <SelectContent>
              {empresas.map(empresa => (
                <SelectItem key={empresa} value={empresa}>{empresa}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="descricao">Descrição</Label>
        <Textarea
          id="descricao"
          value={formData.descricao}
          onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
          placeholder="Descreva as responsabilidades do setor"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="responsavel">Responsável</Label>
          <Input
            id="responsavel"
            value={formData.responsavel}
            onChange={(e) => setFormData({ ...formData, responsavel: e.target.value })}
            placeholder="Nome do responsável"
            required
          />
        </div>
        <div>
          <Label htmlFor="funcionarios">Número de Funcionários</Label>
          <Input
            id="funcionarios"
            type="number"
            value={formData.funcionarios}
            onChange={(e) => setFormData({ ...formData, funcionarios: e.target.value })}
            placeholder="0"
            min="0"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label htmlFor="area">Área</Label>
          <Select value={formData.area} onValueChange={(value) => setFormData({ ...formData, area: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione a área" />
            </SelectTrigger>
            <SelectContent>
              {areas.map(area => (
                <SelectItem key={area} value={area}>{area}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="tipo">Tipo</Label>
          <Select value={formData.tipo} onValueChange={(value) => setFormData({ ...formData, tipo: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {tipos.map(tipo => (
                <SelectItem key={tipo.key} value={tipo.key}>{tipo.nome}</SelectItem>
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

      <div>
        <Label htmlFor="orcamento">Orçamento Anual (R$)</Label>
        <Input
          id="orcamento"
          type="number"
          value={formData.orcamento}
          onChange={(e) => setFormData({ ...formData, orcamento: e.target.value })}
          placeholder="0.00"
          min="0"
          step="0.01"
          required
        />
      </div>

      <DialogFooter>
        <Button type="submit">Criar Setor</Button>
      </DialogFooter>
    </form>
  );
}

// Componente do formulário de edição
function EditSetorForm({ setor, onSubmit }: { setor: any; onSubmit: (data: any) => void }) {
  const [formData, setFormData] = useState({
    nome: setor.nome,
    descricao: setor.descricao,
    empresa: setor.empresa,
    responsavel: setor.responsavel,
    funcionarios: setor.funcionarios.toString(),
    status: setor.status,
    tipo: setor.tipo,
    orcamento: setor.orcamento.toString(),
    area: setor.area
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="edit-nome">Nome do Setor</Label>
          <Input
            id="edit-nome"
            value={formData.nome}
            onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="edit-empresa">Empresa</Label>
          <Select value={formData.empresa} onValueChange={(value) => setFormData({ ...formData, empresa: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {empresas.map(empresa => (
                <SelectItem key={empresa} value={empresa}>{empresa}</SelectItem>
              ))}
            </SelectContent>
          </Select>
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

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="edit-responsavel">Responsável</Label>
          <Input
            id="edit-responsavel"
            value={formData.responsavel}
            onChange={(e) => setFormData({ ...formData, responsavel: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="edit-funcionarios">Número de Funcionários</Label>
          <Input
            id="edit-funcionarios"
            type="number"
            value={formData.funcionarios}
            onChange={(e) => setFormData({ ...formData, funcionarios: e.target.value })}
            min="0"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label htmlFor="edit-area">Área</Label>
          <Select value={formData.area} onValueChange={(value) => setFormData({ ...formData, area: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {areas.map(area => (
                <SelectItem key={area} value={area}>{area}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="edit-tipo">Tipo</Label>
          <Select value={formData.tipo} onValueChange={(value) => setFormData({ ...formData, tipo: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {tipos.map(tipo => (
                <SelectItem key={tipo.key} value={tipo.key}>{tipo.nome}</SelectItem>
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

      <div>
        <Label htmlFor="edit-orcamento">Orçamento Anual (R$)</Label>
        <Input
          id="edit-orcamento"
          type="number"
          value={formData.orcamento}
          onChange={(e) => setFormData({ ...formData, orcamento: e.target.value })}
          min="0"
          step="0.01"
          required
        />
      </div>

      <DialogFooter>
        <Button type="submit">Salvar Alterações</Button>
      </DialogFooter>
    </form>
  );
} 