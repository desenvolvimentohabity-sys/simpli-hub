import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, Wrench, Clock, CheckCircle, DollarSign } from "lucide-react";

// Dados mockados para serviços
const servicosMock = [
  {
    id: 1,
    nome: "Manutenção de Computadores",
    descricao: "Serviço de manutenção e reparo de computadores",
    categoria: "TI",
    preco: 150.00,
    duracao: "2 horas",
    status: "ativo",
    responsavel: "João Silva",
    observacoes: "Inclui diagnóstico e limpeza"
  },
  {
    id: 2,
    nome: "Instalação de Software",
    descricao: "Instalação e configuração de software",
    categoria: "TI",
    preco: 80.00,
    duracao: "1 hora",
    status: "ativo",
    responsavel: "Maria Santos",
    observacoes: "Software básico incluído"
  }
];

export default function Servicos() {
  const [servicos, setServicos] = useState(servicosMock);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredServicos = servicos.filter(servico => {
    return servico.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
           servico.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
           servico.responsavel.toLowerCase().includes(searchTerm.toLowerCase());
  });

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
            <h1 className="text-3xl font-bold">Serviços</h1>
            <p className="text-muted-foreground">
              Gerencie os serviços oferecidos
            </p>
          </div>
          <Button className="bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary">
            <Plus className="h-4 w-4 mr-2" />
            Novo Serviço
          </Button>
        </div>

        {/* Cards de Resumo */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Serviços</CardTitle>
              <Wrench className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{servicos.length}</div>
              <p className="text-xs text-muted-foreground">
                Serviços cadastrados
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Serviços Ativos</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {servicos.filter(s => s.status === "ativo").length}
              </div>
              <p className="text-xs text-muted-foreground">
                Em oferta
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Preço Médio</CardTitle>
              <DollarSign className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatCurrency(servicos.reduce((total, s) => total + s.preco, 0) / servicos.length)}
              </div>
              <p className="text-xs text-muted-foreground">
                Preço médio por serviço
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Categorias</CardTitle>
              <Wrench className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {new Set(servicos.map(s => s.categoria)).size}
              </div>
              <p className="text-xs text-muted-foreground">
                Categorias diferentes
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
                  placeholder="Buscar por nome, descrição ou responsável..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabela de Serviços */}
        <Card>
          <CardHeader>
            <CardTitle>Lista de Serviços</CardTitle>
            <CardDescription>
              {filteredServicos.length} serviço(s) encontrado(s)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Descrição</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead>Preço</TableHead>
                    <TableHead>Duração</TableHead>
                    <TableHead>Responsável</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Observações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredServicos.map((servico) => (
                    <TableRow key={servico.id}>
                      <TableCell>
                        <div className="font-medium">{servico.nome}</div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm text-muted-foreground max-w-[200px] truncate">
                          {servico.descricao}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{servico.categoria}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{formatCurrency(servico.preco)}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {servico.duracao}
                        </div>
                      </TableCell>
                      <TableCell>{servico.responsavel}</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                          {servico.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm text-muted-foreground max-w-[200px] truncate">
                          {servico.observacoes}
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