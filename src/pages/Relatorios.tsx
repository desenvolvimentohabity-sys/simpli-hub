import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Download, BarChart3, TrendingUp, DollarSign, Users, Package } from "lucide-react";

export default function Relatorios() {
  const [tipoRelatorio, setTipoRelatorio] = useState("");
  const [periodo, setPeriodo] = useState("");
  const [formato, setFormato] = useState("pdf");

  const relatoriosDisponiveis = [
    {
      id: 1,
      nome: "Relatório de Vendas",
      descricao: "Análise detalhada das vendas por período",
      categoria: "Vendas",
      icon: TrendingUp,
      status: "disponivel"
    },
    {
      id: 2,
      nome: "Relatório Financeiro",
      descricao: "Demonstrativo financeiro e fluxo de caixa",
      categoria: "Financeiro",
      icon: DollarSign,
      status: "disponivel"
    },
    {
      id: 3,
      nome: "Relatório de Clientes",
      descricao: "Análise de clientes e comportamento de compra",
      categoria: "Marketing",
      icon: Users,
      status: "disponivel"
    },
    {
      id: 4,
      nome: "Relatório de Estoque",
      descricao: "Controle de estoque e movimentações",
      categoria: "Operacional",
      icon: Package,
      status: "disponivel"
    },
    {
      id: 5,
      nome: "Relatório de Usuários",
      descricao: "Atividade dos usuários no sistema",
      categoria: "Administrativo",
      icon: Users,
      status: "disponivel"
    },
    {
      id: 6,
      nome: "Relatório de Serviços",
      descricao: "Análise de serviços prestados",
      categoria: "Operacional",
      icon: Package,
      status: "disponivel"
    }
  ];

  const periodos = [
    "Hoje",
    "Últimos 7 dias",
    "Últimos 30 dias",
    "Este mês",
    "Mês anterior",
    "Este ano",
    "Ano anterior",
    "Personalizado"
  ];

  const formatos = [
    { key: "pdf", nome: "PDF", desc: "Documento PDF" },
    { key: "excel", nome: "Excel", desc: "Planilha Excel" },
    { key: "csv", nome: "CSV", desc: "Arquivo CSV" },
    { key: "html", nome: "HTML", desc: "Página web" }
  ];

  const handleGerarRelatorio = () => {
    if (!tipoRelatorio || !periodo) {
      alert("Selecione o tipo de relatório e o período");
      return;
    }
    
    // Simulação de geração de relatório
    alert(`Gerando relatório: ${tipoRelatorio} - ${periodo} em formato ${formato.toUpperCase()}`);
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Relatórios</h1>
            <p className="text-muted-foreground">
              Gere relatórios e análises do sistema
            </p>
          </div>
        </div>

        {/* Cards de Resumo */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Relatórios</CardTitle>
              <BarChart3 className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{relatoriosDisponiveis.length}</div>
              <p className="text-xs text-muted-foreground">
                Relatórios disponíveis
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Relatórios Gerados</CardTitle>
              <Download className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">
                Este mês
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Categorias</CardTitle>
              <BarChart3 className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {new Set(relatoriosDisponiveis.map(r => r.categoria)).size}
              </div>
              <p className="text-xs text-muted-foreground">
                Categorias diferentes
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Status</CardTitle>
              <BarChart3 className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {relatoriosDisponiveis.filter(r => r.status === "disponivel").length}
              </div>
              <p className="text-xs text-muted-foreground">
                Relatórios disponíveis
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Configuração de Relatório */}
        <Card>
          <CardHeader>
            <CardTitle>Configurar Relatório</CardTitle>
            <CardDescription>
              Selecione as opções para gerar o relatório
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <Label htmlFor="tipo">Tipo de Relatório</Label>
                <Select value={tipoRelatorio} onValueChange={setTipoRelatorio}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    {relatoriosDisponiveis.map(relatorio => (
                      <SelectItem key={relatorio.id} value={relatorio.nome}>
                        {relatorio.nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="periodo">Período</Label>
                <Select value={periodo} onValueChange={setPeriodo}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o período" />
                  </SelectTrigger>
                  <SelectContent>
                    {periodos.map(p => (
                      <SelectItem key={p} value={p}>{p}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="formato">Formato</Label>
                <Select value={formato} onValueChange={setFormato}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {formatos.map(f => (
                      <SelectItem key={f.key} value={f.key}>{f.nome}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="mt-4">
              <Button 
                onClick={handleGerarRelatorio}
                className="bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary"
                disabled={!tipoRelatorio || !periodo}
              >
                <Download className="h-4 w-4 mr-2" />
                Gerar Relatório
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Lista de Relatórios Disponíveis */}
        <Card>
          <CardHeader>
            <CardTitle>Relatórios Disponíveis</CardTitle>
            <CardDescription>
              Todos os relatórios que podem ser gerados
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {relatoriosDisponiveis.map((relatorio) => {
                const IconComponent = relatorio.icon;
                return (
                  <Card key={relatorio.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        <IconComponent className="h-5 w-5 text-primary" />
                        <CardTitle className="text-lg">{relatorio.nome}</CardTitle>
                      </div>
                      <CardDescription>{relatorio.descricao}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline">{relatorio.categoria}</Badge>
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                          {relatorio.status}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Relatórios Recentes */}
        <Card>
          <CardHeader>
            <CardTitle>Relatórios Recentes</CardTitle>
            <CardDescription>
              Histórico dos últimos relatórios gerados
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-muted-foreground">
              <Download className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Nenhum relatório foi gerado ainda</p>
              <p className="text-sm">Configure e gere seu primeiro relatório</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
} 