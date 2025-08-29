import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Shield, Users, Save } from "lucide-react";

// Dados mockados para permissões
const permissoesMock = [
  {
    id: 1,
    nome: "Administrador",
    descricao: "Acesso completo ao sistema",
    permissoes: {
      usuarios: { criar: true, editar: true, excluir: true, visualizar: true },
      empresas: { criar: true, editar: true, excluir: true, visualizar: true },
      estoque: { criar: true, editar: true, excluir: true, visualizar: true },
      financeiro: { criar: true, editar: true, excluir: true, visualizar: true },
      vendas: { criar: true, editar: true, excluir: true, visualizar: true },
      relatorios: { criar: true, editar: true, excluir: true, visualizar: true }
    }
  },
  {
    id: 2,
    nome: "Gerente",
    descricao: "Acesso gerencial limitado",
    permissoes: {
      usuarios: { criar: false, editar: false, excluir: false, visualizar: true },
      empresas: { criar: false, editar: true, excluir: false, visualizar: true },
      estoque: { criar: true, editar: true, excluir: false, visualizar: true },
      financeiro: { criar: false, editar: true, excluir: false, visualizar: true },
      vendas: { criar: true, editar: true, excluir: false, visualizar: true },
      relatorios: { criar: false, editar: false, excluir: false, visualizar: true }
    }
  },
  {
    id: 3,
    nome: "Usuário",
    descricao: "Acesso básico ao sistema",
    permissoes: {
      usuarios: { criar: false, editar: false, excluir: false, visualizar: false },
      empresas: { criar: false, editar: false, excluir: false, visualizar: true },
      estoque: { criar: false, editar: false, excluir: false, visualizar: true },
      financeiro: { criar: false, editar: false, excluir: false, visualizar: false },
      vendas: { criar: true, editar: false, excluir: false, visualizar: true },
      relatorios: { criar: false, editar: false, excluir: false, visualizar: false }
    }
  }
];

const modulos = [
  { key: "usuarios", nome: "Usuários" },
  { key: "empresas", nome: "Empresas" },
  { key: "estoque", nome: "Estoque" },
  { key: "financeiro", nome: "Financeiro" },
  { key: "vendas", nome: "Vendas" },
  { key: "relatorios", nome: "Relatórios" }
];

const acoes = [
  { key: "criar", nome: "Criar" },
  { key: "editar", nome: "Editar" },
  { key: "excluir", nome: "Excluir" },
  { key: "visualizar", nome: "Visualizar" }
];

export default function Permissoes() {
  const [permissoes, setPermissoes] = useState(permissoesMock);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<any>(null);

  const handleSavePermissions = (roleId: number, newPermissions: any) => {
    setPermissoes(permissoes.map(role => 
      role.id === roleId 
        ? { ...role, permissoes: newPermissions }
        : role
    ));
  };

  const handleCreateRole = (roleData: any) => {
    const newRole = {
      id: permissoes.length + 1,
      ...roleData,
      permissoes: {
        usuarios: { criar: false, editar: false, excluir: false, visualizar: false },
        empresas: { criar: false, editar: false, excluir: false, visualizar: false },
        estoque: { criar: false, editar: false, excluir: false, visualizar: false },
        financeiro: { criar: false, editar: false, excluir: false, visualizar: false },
        vendas: { criar: false, editar: false, excluir: false, visualizar: false },
        relatorios: { criar: false, editar: false, excluir: false, visualizar: false }
      }
    };
    setPermissoes([...permissoes, newRole]);
    setIsCreateDialogOpen(false);
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Permissões</h1>
            <p className="text-muted-foreground">
              Gerencie as permissões e roles dos usuários
            </p>
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary">
                <Plus className="h-4 w-4 mr-2" />
                Novo Role
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Criar Novo Role</DialogTitle>
                <DialogDescription>
                  Crie um novo role com permissões específicas
                </DialogDescription>
              </DialogHeader>
              <CreateRoleForm onSubmit={handleCreateRole} />
            </DialogContent>
          </Dialog>
        </div>

        {/* Cards de Resumo */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Roles</CardTitle>
              <Shield className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{permissoes.length}</div>
              <p className="text-xs text-muted-foreground">
                Roles configurados no sistema
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Módulos Ativos</CardTitle>
              <Users className="h-4 w-4 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{modulos.length}</div>
              <p className="text-xs text-muted-foreground">
                Módulos disponíveis para permissões
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ações Disponíveis</CardTitle>
              <Save className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{acoes.length}</div>
              <p className="text-xs text-muted-foreground">
                Tipos de ações por módulo
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Tabela de Permissões */}
        <Card>
          <CardHeader>
            <CardTitle>Configuração de Permissões</CardTitle>
            <CardDescription>
              Gerencie as permissões de cada role por módulo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">Role / Módulo</TableHead>
                    {modulos.map(modulo => (
                      <TableHead key={modulo.key} className="text-center">
                        {modulo.nome}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {permissoes.map(role => (
                    <TableRow key={role.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{role.nome}</div>
                          <div className="text-sm text-muted-foreground">{role.descricao}</div>
                        </div>
                      </TableCell>
                      {modulos.map(modulo => (
                        <TableCell key={modulo.key} className="text-center">
                          <div className="flex flex-col gap-2">
                            {acoes.map(acao => (
                              <div key={acao.key} className="flex items-center justify-center">
                                <Checkbox
                                  checked={role.permissoes[modulo.key][acao.key]}
                                  onCheckedChange={(checked) => {
                                    const newPermissions = {
                                      ...role.permissoes,
                                      [modulo.key]: {
                                        ...role.permissoes[modulo.key],
                                        [acao.key]: checked
                                      }
                                    };
                                    handleSavePermissions(role.id, newPermissions);
                                  }}
                                />
                                <Label className="ml-2 text-xs">{acao.nome}</Label>
                              </div>
                            ))}
                          </div>
                        </TableCell>
                      ))}
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

// Componente do formulário de criação de role
function CreateRoleForm({ onSubmit }: { onSubmit: (data: any) => void }) {
  const [formData, setFormData] = useState({
    nome: "",
    descricao: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="role-nome">Nome do Role</Label>
        <Input
          id="role-nome"
          value={formData.nome}
          onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
          placeholder="Ex: Supervisor"
          required
        />
      </div>
      <div>
        <Label htmlFor="role-descricao">Descrição</Label>
        <Input
          id="role-descricao"
          value={formData.descricao}
          onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
          placeholder="Descrição das permissões"
          required
        />
      </div>
      <DialogFooter>
        <Button type="submit">Criar Role</Button>
      </DialogFooter>
    </form>
  );
} 