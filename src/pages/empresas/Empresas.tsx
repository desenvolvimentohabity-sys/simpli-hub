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
import { Plus, Search, MoreHorizontal, Edit, Trash2, Building2, MapPin, Phone, Mail, Globe } from "lucide-react";

// Dados mockados para empresas
const empresasMock = [
  {
    id: 1,
    nome: "Empresa Principal Ltda",
    cnpj: "12.345.678/0001-90",
    razaoSocial: "Empresa Principal Ltda",
    inscricaoEstadual: "123.456.789",
    endereco: "Rua das Flores, 123 - Centro",
    cidade: "São Paulo",
    estado: "SP",
    cep: "01234-567",
    telefone: "(11) 99999-9999",
    email: "contato@empresa.com",
    website: "www.empresa.com",
    status: "ativa",
    tipo: "matriz",
    setores: ["Administrativo", "Vendas", "TI"]
  },
  {
    id: 2,
    nome: "Filial Norte Ltda",
    cnpj: "98.765.432/0001-10",
    razaoSocial: "Filial Norte Ltda",
    inscricaoEstadual: "987.654.321",
    endereco: "Av. Principal, 456 - Norte",
    cidade: "Manaus",
    estado: "AM",
    cep: "69000-000",
    telefone: "(92) 88888-8888",
    email: "norte@empresa.com",
    website: "www.empresa.com/norte",
    status: "ativa",
    tipo: "filial",
    setores: ["Vendas", "Logística"]
  },
  {
    id: 3,
    nome: "Empresa Inativa Ltda",
    cnpj: "11.222.333/0001-44",
    razaoSocial: "Empresa Inativa Ltda",
    inscricaoEstadual: "111.222.333",
    endereco: "Rua Antiga, 789 - Velho",
    cidade: "Rio de Janeiro",
    estado: "RJ",
    cep: "20000-000",
    telefone: "(21) 77777-7777",
    email: "inativa@empresa.com",
    website: "www.empresa-inativa.com",
    status: "inativa",
    tipo: "matriz",
    setores: ["Administrativo"]
  }
];

const estados = [
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA",
  "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN",
  "RS", "RO", "RR", "SC", "SP", "SE", "TO"
];

export default function Empresas() {
  const [empresas, setEmpresas] = useState(empresasMock);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos");
  const [tipoFilter, setTipoFilter] = useState("todos");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingEmpresa, setEditingEmpresa] = useState<any>(null);

  const filteredEmpresas = empresas.filter(empresa => {
    const matchesSearch = empresa.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         empresa.cnpj.includes(searchTerm) ||
                         empresa.cidade.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "todos" || empresa.status === statusFilter;
    const matchesTipo = tipoFilter === "todos" || empresa.tipo === tipoFilter;
    return matchesSearch && matchesStatus && matchesTipo;
  });

  const handleCreateEmpresa = (empresaData: any) => {
    const newEmpresa = {
      id: empresas.length + 1,
      ...empresaData,
      setores: empresaData.setores ? empresaData.setores.split(',').map((s: string) => s.trim()) : []
    };
    setEmpresas([...empresas, newEmpresa]);
    setIsCreateDialogOpen(false);
  };

  const handleEditEmpresa = (empresaData: any) => {
    setEmpresas(empresas.map(e => 
      e.id === editingEmpresa.id 
        ? { ...e, ...empresaData, setores: empresaData.setores ? empresaData.setores.split(',').map((s: string) => s.trim()) : [] }
        : e
    ));
    setIsEditDialogOpen(false);
    setEditingEmpresa(null);
  };

  const handleDeleteEmpresa = (empresaId: number) => {
    setEmpresas(empresas.filter(e => e.id !== empresaId));
  };

  const getStatusBadge = (status: string) => {
    return status === "ativa" ? (
      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Ativa</Badge>
    ) : (
      <Badge variant="secondary">Inativa</Badge>
    );
  };

  const getTipoBadge = (tipo: string) => {
    return tipo === "matriz" ? (
      <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Matriz</Badge>
    ) : (
      <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">Filial</Badge>
    );
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Empresas</h1>
            <p className="text-muted-foreground">
              Gerencie as empresas do sistema
            </p>
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary">
                <Plus className="h-4 w-4 mr-2" />
                Nova Empresa
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Criar Nova Empresa</DialogTitle>
                <DialogDescription>
                  Preencha as informações para criar uma nova empresa
                </DialogDescription>
              </DialogHeader>
              <CreateEmpresaForm onSubmit={handleCreateEmpresa} />
            </DialogContent>
          </Dialog>
        </div>

        {/* Cards de Resumo */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Empresas</CardTitle>
              <Building2 className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{empresas.length}</div>
              <p className="text-xs text-muted-foreground">
                Empresas cadastradas
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Empresas Ativas</CardTitle>
              <Badge className="bg-green-100 text-green-800">Ativas</Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {empresas.filter(e => e.status === "ativa").length}
              </div>
              <p className="text-xs text-muted-foreground">
                Em operação
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Matrizes</CardTitle>
              <Badge className="bg-blue-100 text-blue-800">Matriz</Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {empresas.filter(e => e.tipo === "matriz").length}
              </div>
              <p className="text-xs text-muted-foreground">
                Empresas matriz
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Filiais</CardTitle>
              <Badge className="bg-orange-100 text-orange-800">Filial</Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {empresas.filter(e => e.tipo === "filial").length}
              </div>
              <p className="text-xs text-muted-foreground">
                Empresas filiais
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
                    placeholder="Buscar por nome, CNPJ ou cidade..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="w-32">
                <Label htmlFor="status">Status</Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos</SelectItem>
                    <SelectItem value="ativa">Ativa</SelectItem>
                    <SelectItem value="inativa">Inativa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-32">
                <Label htmlFor="tipo">Tipo</Label>
                <Select value={tipoFilter} onValueChange={setTipoFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos</SelectItem>
                    <SelectItem value="matriz">Matriz</SelectItem>
                    <SelectItem value="filial">Filial</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabela de Empresas */}
        <Card>
          <CardHeader>
            <CardTitle>Lista de Empresas</CardTitle>
            <CardDescription>
              {filteredEmpresas.length} empresa(s) encontrada(s)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Empresa</TableHead>
                  <TableHead>CNPJ</TableHead>
                  <TableHead>Localização</TableHead>
                  <TableHead>Contato</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead className="w-[50px]">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEmpresas.map((empresa) => (
                  <TableRow key={empresa.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{empresa.nome}</div>
                        <div className="text-sm text-muted-foreground">{empresa.razaoSocial}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-mono text-sm">{empresa.cnpj}</div>
                      <div className="text-xs text-muted-foreground">IE: {empresa.inscricaoEstadual}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm">
                        <MapPin className="h-3 w-3" />
                        {empresa.cidade} - {empresa.estado}
                      </div>
                      <div className="text-xs text-muted-foreground">{empresa.cep}</div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-sm">
                          <Phone className="h-3 w-3" />
                          {empresa.telefone}
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <Mail className="h-3 w-3" />
                          {empresa.email}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(empresa.status)}</TableCell>
                    <TableCell>{getTipoBadge(empresa.tipo)}</TableCell>
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
                            setEditingEmpresa(empresa);
                            setIsEditDialogOpen(true);
                          }}>
                            <Edit className="h-4 w-4 mr-2" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="text-red-600"
                            onClick={() => handleDeleteEmpresa(empresa.id)}
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
              <DialogTitle>Editar Empresa</DialogTitle>
              <DialogDescription>
                Edite as informações da empresa
              </DialogDescription>
            </DialogHeader>
            {editingEmpresa && (
              <EditEmpresaForm empresa={editingEmpresa} onSubmit={handleEditEmpresa} />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
}

// Componente do formulário de criação
function CreateEmpresaForm({ onSubmit }: { onSubmit: (data: any) => void }) {
  const [formData, setFormData] = useState({
    nome: "",
    cnpj: "",
    razaoSocial: "",
    inscricaoEstadual: "",
    endereco: "",
    cidade: "",
    estado: "",
    cep: "",
    telefone: "",
    email: "",
    website: "",
    status: "ativa",
    tipo: "matriz",
    setores: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="nome">Nome Fantasia</Label>
          <Input
            id="nome"
            value={formData.nome}
            onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="razaoSocial">Razão Social</Label>
          <Input
            id="razaoSocial"
            value={formData.razaoSocial}
            onChange={(e) => setFormData({ ...formData, razaoSocial: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="cnpj">CNPJ</Label>
          <Input
            id="cnpj"
            value={formData.cnpj}
            onChange={(e) => setFormData({ ...formData, cnpj: e.target.value })}
            placeholder="00.000.000/0000-00"
            required
          />
        </div>
        <div>
          <Label htmlFor="inscricaoEstadual">Inscrição Estadual</Label>
          <Input
            id="inscricaoEstadual"
            value={formData.inscricaoEstadual}
            onChange={(e) => setFormData({ ...formData, inscricaoEstadual: e.target.value })}
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="endereco">Endereço</Label>
        <Input
          id="endereco"
          value={formData.endereco}
          onChange={(e) => setFormData({ ...formData, endereco: e.target.value })}
          required
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label htmlFor="cidade">Cidade</Label>
          <Input
            id="cidade"
            value={formData.cidade}
            onChange={(e) => setFormData({ ...formData, cidade: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="estado">Estado</Label>
          <Select value={formData.estado} onValueChange={(value) => setFormData({ ...formData, estado: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              {estados.map(estado => (
                <SelectItem key={estado} value={estado}>{estado}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="cep">CEP</Label>
          <Input
            id="cep"
            value={formData.cep}
            onChange={(e) => setFormData({ ...formData, cep: e.target.value })}
            placeholder="00000-000"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="telefone">Telefone</Label>
          <Input
            id="telefone"
            value={formData.telefone}
            onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
            placeholder="(00) 00000-0000"
            required
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="website">Website</Label>
          <Input
            id="website"
            value={formData.website}
            onChange={(e) => setFormData({ ...formData, website: e.target.value })}
            placeholder="www.empresa.com"
          />
        </div>
        <div>
          <Label htmlFor="setores">Setores (separados por vírgula)</Label>
          <Input
            id="setores"
            value={formData.setores}
            onChange={(e) => setFormData({ ...formData, setores: e.target.value })}
            placeholder="Administrativo, Vendas, TI"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="status">Status</Label>
          <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ativa">Ativa</SelectItem>
              <SelectItem value="inativa">Inativa</SelectItem>
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
              <SelectItem value="matriz">Matriz</SelectItem>
              <SelectItem value="filial">Filial</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <DialogFooter>
        <Button type="submit">Criar Empresa</Button>
      </DialogFooter>
    </form>
  );
}

// Componente do formulário de edição
function EditEmpresaForm({ empresa, onSubmit }: { empresa: any; onSubmit: (data: any) => void }) {
  const [formData, setFormData] = useState({
    nome: empresa.nome,
    cnpj: empresa.cnpj,
    razaoSocial: empresa.razaoSocial,
    inscricaoEstadual: empresa.inscricaoEstadual,
    endereco: empresa.endereco,
    cidade: empresa.cidade,
    estado: empresa.estado,
    cep: empresa.cep,
    telefone: empresa.telefone,
    email: empresa.email,
    website: empresa.website,
    status: empresa.status,
    tipo: empresa.tipo,
    setores: empresa.setores.join(', ')
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="edit-nome">Nome Fantasia</Label>
          <Input
            id="edit-nome"
            value={formData.nome}
            onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="edit-razaoSocial">Razão Social</Label>
          <Input
            id="edit-razaoSocial"
            value={formData.razaoSocial}
            onChange={(e) => setFormData({ ...formData, razaoSocial: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="edit-cnpj">CNPJ</Label>
          <Input
            id="edit-cnpj"
            value={formData.cnpj}
            onChange={(e) => setFormData({ ...formData, cnpj: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="edit-inscricaoEstadual">Inscrição Estadual</Label>
          <Input
            id="edit-inscricaoEstadual"
            value={formData.inscricaoEstadual}
            onChange={(e) => setFormData({ ...formData, inscricaoEstadual: e.target.value })}
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="edit-endereco">Endereço</Label>
        <Input
          id="edit-endereco"
          value={formData.endereco}
          onChange={(e) => setFormData({ ...formData, endereco: e.target.value })}
          required
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label htmlFor="edit-cidade">Cidade</Label>
          <Input
            id="edit-cidade"
            value={formData.cidade}
            onChange={(e) => setFormData({ ...formData, cidade: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="edit-estado">Estado</Label>
          <Select value={formData.estado} onValueChange={(value) => setFormData({ ...formData, estado: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {estados.map(estado => (
                <SelectItem key={estado} value={estado}>{estado}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="edit-cep">CEP</Label>
          <Input
            id="edit-cep"
            value={formData.cep}
            onChange={(e) => setFormData({ ...formData, cep: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="edit-telefone">Telefone</Label>
          <Input
            id="edit-telefone"
            value={formData.telefone}
            onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="edit-email">Email</Label>
          <Input
            id="edit-email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="edit-website">Website</Label>
          <Input
            id="edit-website"
            value={formData.website}
            onChange={(e) => setFormData({ ...formData, website: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="edit-setores">Setores (separados por vírgula)</Label>
          <Input
            id="edit-setores"
            value={formData.setores}
            onChange={(e) => setFormData({ ...formData, setores: e.target.value })}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="edit-status">Status</Label>
          <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ativa">Ativa</SelectItem>
              <SelectItem value="inativa">Inativa</SelectItem>
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
              <SelectItem value="matriz">Matriz</SelectItem>
              <SelectItem value="filial">Filial</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <DialogFooter>
        <Button type="submit">Salvar Alterações</Button>
      </DialogFooter>
    </form>
  );
} 