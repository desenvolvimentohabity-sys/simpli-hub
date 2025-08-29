import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Settings, Save, Globe, Shield, Bell, Palette, Database, Users } from "lucide-react";

export default function Configuracoes() {
  const [configuracoes, setConfiguracoes] = useState({
    // Configurações Gerais
    nomeEmpresa: "ERP System",
    emailContato: "contato@erpsystem.com",
    telefoneContato: "(11) 99999-9999",
    enderecoEmpresa: "Rua das Flores, 123 - Centro, São Paulo - SP",
    timezone: "America/Sao_Paulo",
    idioma: "pt-BR",
    moeda: "BRL",
    
    // Configurações de Segurança
    senhaMinima: 8,
    expiracaoSenha: 90,
    tentativasLogin: 3,
    bloqueioTemporario: 30,
    autenticacao2FA: true,
    logsAuditoria: true,
    
    // Configurações de Notificações
    emailNotificacoes: true,
    notificacoesPush: true,
    notificacoesEstoque: true,
    notificacoesFinanceiro: true,
    notificacoesVendas: true,
    
    // Configurações de Tema
    temaPadrao: "claro",
    coresPrimarias: "#3B82F6",
    coresSecundarias: "#10B981",
    
    // Configurações de Backup
    backupAutomatico: true,
    frequenciaBackup: "diario",
    retencaoBackup: 30,
    backupCloud: true
  });

  const handleSaveConfiguracoes = () => {
    // Simulação de salvamento
    alert("Configurações salvas com sucesso!");
  };

  const timezones = [
    "America/Sao_Paulo",
    "America/New_York",
    "Europe/London",
    "Asia/Tokyo"
  ];

  const idiomas = [
    { key: "pt-BR", nome: "Português (Brasil)" },
    { key: "en-US", nome: "English (US)" },
    { key: "es-ES", nome: "Español" }
  ];

  const moedas = [
    { key: "BRL", nome: "Real Brasileiro (R$)" },
    { key: "USD", nome: "Dólar Americano ($)" },
    { key: "EUR", nome: "Euro (€)" }
  ];

  const frequenciasBackup = [
    { key: "diario", nome: "Diário" },
    { key: "semanal", nome: "Semanal" },
    { key: "mensal", nome: "Mensal" }
  ];

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Configurações</h1>
            <p className="text-muted-foreground">
              Configure as preferências do sistema
            </p>
          </div>
          <Button 
            onClick={handleSaveConfiguracoes}
            className="bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary"
          >
            <Save className="h-4 w-4 mr-2" />
            Salvar Configurações
          </Button>
        </div>

        {/* Configurações Gerais */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Configurações Gerais
            </CardTitle>
            <CardDescription>
              Informações básicas da empresa e configurações do sistema
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="nomeEmpresa">Nome da Empresa</Label>
                <Input
                  id="nomeEmpresa"
                  value={configuracoes.nomeEmpresa}
                  onChange={(e) => setConfiguracoes({ ...configuracoes, nomeEmpresa: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="emailContato">Email de Contato</Label>
                <Input
                  id="emailContato"
                  type="email"
                  value={configuracoes.emailContato}
                  onChange={(e) => setConfiguracoes({ ...configuracoes, emailContato: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="telefoneContato">Telefone de Contato</Label>
                <Input
                  id="telefoneContato"
                  value={configuracoes.telefoneContato}
                  onChange={(e) => setConfiguracoes({ ...configuracoes, telefoneContato: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="enderecoEmpresa">Endereço da Empresa</Label>
                <Input
                  id="enderecoEmpresa"
                  value={configuracoes.enderecoEmpresa}
                  onChange={(e) => setConfiguracoes({ ...configuracoes, enderecoEmpresa: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="timezone">Fuso Horário</Label>
                <Select value={configuracoes.timezone} onValueChange={(value) => setConfiguracoes({ ...configuracoes, timezone: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {timezones.map(tz => (
                      <SelectItem key={tz} value={tz}>{tz}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="idioma">Idioma</Label>
                <Select value={configuracoes.idioma} onValueChange={(value) => setConfiguracoes({ ...configuracoes, idioma: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {idiomas.map(id => (
                      <SelectItem key={id.key} value={id.key}>{id.nome}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="moeda">Moeda</Label>
                <Select value={configuracoes.moeda} onValueChange={(value) => setConfiguracoes({ ...configuracoes, moeda: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {moedas.map(m => (
                      <SelectItem key={m.key} value={m.key}>{m.nome}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Configurações de Segurança */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Configurações de Segurança
            </CardTitle>
            <CardDescription>
              Configurações de senhas, autenticação e auditoria
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="senhaMinima">Tamanho Mínimo da Senha</Label>
                <Input
                  id="senhaMinima"
                  type="number"
                  value={configuracoes.senhaMinima}
                  onChange={(e) => setConfiguracoes({ ...configuracoes, senhaMinima: parseInt(e.target.value) })}
                  min="6"
                  max="20"
                />
              </div>
              <div>
                <Label htmlFor="expiracaoSenha">Expiração da Senha (dias)</Label>
                <Input
                  id="expiracaoSenha"
                  type="number"
                  value={configuracoes.expiracaoSenha}
                  onChange={(e) => setConfiguracoes({ ...configuracoes, expiracaoSenha: parseInt(e.target.value) })}
                  min="30"
                  max="365"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="tentativasLogin">Tentativas de Login</Label>
                <Input
                  id="tentativasLogin"
                  type="number"
                  value={configuracoes.tentativasLogin}
                  onChange={(e) => setConfiguracoes({ ...configuracoes, tentativasLogin: parseInt(e.target.value) })}
                  min="3"
                  max="10"
                />
              </div>
              <div>
                <Label htmlFor="bloqueioTemporario">Bloqueio Temporário (minutos)</Label>
                <Input
                  id="bloqueioTemporario"
                  type="number"
                  value={configuracoes.bloqueioTemporario}
                  onChange={(e) => setConfiguracoes({ ...configuracoes, bloqueioTemporario: parseInt(e.target.value) })}
                  min="5"
                  max="120"
                />
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Autenticação em 2 Fatores</Label>
                  <p className="text-sm text-muted-foreground">
                    Exigir segundo fator de autenticação
                  </p>
                </div>
                <Switch
                  checked={configuracoes.autenticacao2FA}
                  onCheckedChange={(checked) => setConfiguracoes({ ...configuracoes, autenticacao2FA: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Logs de Auditoria</Label>
                  <p className="text-sm text-muted-foreground">
                    Registrar todas as ações dos usuários
                  </p>
                </div>
                <Switch
                  checked={configuracoes.logsAuditoria}
                  onCheckedChange={(checked) => setConfiguracoes({ ...configuracoes, logsAuditoria: checked })}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Configurações de Notificações */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Configurações de Notificações
            </CardTitle>
            <CardDescription>
              Configure como e quando receber notificações
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Notificações por Email</Label>
                <p className="text-sm text-muted-foreground">
                  Receber notificações por email
                </p>
              </div>
              <Switch
                checked={configuracoes.emailNotificacoes}
                onCheckedChange={(checked) => setConfiguracoes({ ...configuracoes, emailNotificacoes: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Notificações Push</Label>
                <p className="text-sm text-muted-foreground">
                  Receber notificações push no navegador
                </p>
              </div>
              <Switch
                checked={configuracoes.notificacoesPush}
                onCheckedChange={(checked) => setConfiguracoes({ ...configuracoes, notificacoesPush: checked })}
              />
            </div>

            <Separator />

            <div className="grid grid-cols-3 gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm">Estoque</Label>
                </div>
                <Switch
                  checked={configuracoes.notificacoesEstoque}
                  onCheckedChange={(checked) => setConfiguracoes({ ...configuracoes, notificacoesEstoque: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm">Financeiro</Label>
                </div>
                <Switch
                  checked={configuracoes.notificacoesFinanceiro}
                  onCheckedChange={(checked) => setConfiguracoes({ ...configuracoes, notificacoesFinanceiro: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm">Vendas</Label>
                </div>
                <Switch
                  checked={configuracoes.notificacoesVendas}
                  onCheckedChange={(checked) => setConfiguracoes({ ...configuracoes, notificacoesVendas: checked })}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Configurações de Tema */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Configurações de Tema
            </CardTitle>
            <CardDescription>
              Personalize a aparência do sistema
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="temaPadrao">Tema Padrão</Label>
                <Select value={configuracoes.temaPadrao} onValueChange={(value) => setConfiguracoes({ ...configuracoes, temaPadrao: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="claro">Claro</SelectItem>
                    <SelectItem value="escuro">Escuro</SelectItem>
                    <SelectItem value="sistema">Sistema</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="coresPrimarias">Cor Primária</Label>
                <Input
                  id="coresPrimarias"
                  type="color"
                  value={configuracoes.coresPrimarias}
                  onChange={(e) => setConfiguracoes({ ...configuracoes, coresPrimarias: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="coresSecundarias">Cor Secundária</Label>
                <Input
                  id="coresSecundarias"
                  type="color"
                  value={configuracoes.coresSecundarias}
                  onChange={(e) => setConfiguracoes({ ...configuracoes, coresSecundarias: e.target.value })}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Configurações de Backup */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Configurações de Backup
            </CardTitle>
            <CardDescription>
              Configure backups automáticos e retenção de dados
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Backup Automático</Label>
                <p className="text-sm text-muted-foreground">
                  Realizar backups automáticos do sistema
                </p>
              </div>
              <Switch
                checked={configuracoes.backupAutomatico}
                onCheckedChange={(checked) => setConfiguracoes({ ...configuracoes, backupAutomatico: checked })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="frequenciaBackup">Frequência do Backup</Label>
                <Select value={configuracoes.frequenciaBackup} onValueChange={(value) => setConfiguracoes({ ...configuracoes, frequenciaBackup: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {frequenciasBackup.map(f => (
                      <SelectItem key={f.key} value={f.key}>{f.nome}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="retencaoBackup">Retenção (dias)</Label>
                <Input
                  id="retencaoBackup"
                  type="number"
                  value={configuracoes.retencaoBackup}
                  onChange={(e) => setConfiguracoes({ ...configuracoes, retencaoBackup: parseInt(e.target.value) })}
                  min="7"
                  max="365"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Backup na Nuvem</Label>
                <p className="text-sm text-muted-foreground">
                  Fazer backup também na nuvem
                </p>
              </div>
              <Switch
                checked={configuracoes.backupCloud}
                onCheckedChange={(checked) => setConfiguracoes({ ...configuracoes, backupCloud: checked })}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
} 