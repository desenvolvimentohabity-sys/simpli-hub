import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorBoundary from "@/components/ErrorBoundary";

// Importações das páginas
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import NotFound from "@/pages/NotFound";

// Importações das páginas de usuários
import ListarUsuarios from "@/pages/usuarios/ListarUsuarios";
import Permissoes from "@/pages/usuarios/Permissoes";

// Importações das páginas de empresas
import Empresas from "@/pages/empresas/Empresas";
import Setores from "@/pages/empresas/Setores";

// Importações das páginas de estoque
import Produtos from "@/pages/estoque/Produtos";
import Movimentos from "@/pages/estoque/Movimentos";
import Inventario from "@/pages/estoque/Inventario";

// Importações das páginas financeiras
import ContasPagar from "@/pages/financeiro/ContasPagar";
import ContasReceber from "@/pages/financeiro/ContasReceber";
import FluxoCaixa from "@/pages/financeiro/FluxoCaixa";
import Categorias from "@/pages/financeiro/Categorias";

// Importações das páginas de vendas
import Clientes from "@/pages/vendas/Clientes";
import Orcamentos from "@/pages/vendas/Orcamentos";
import Pedidos from "@/pages/vendas/Pedidos";

// Importações das páginas individuais
import Servicos from "@/pages/Servicos";
import Relatorios from "@/pages/Relatorios";
import Configuracoes from "@/pages/Configuracoes";

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            
            {/* Rotas de Usuários */}
            <Route path="/usuarios" element={<ListarUsuarios />} />
            <Route path="/usuarios/permissoes" element={<Permissoes />} />
            
            {/* Rotas de Empresas */}
            <Route path="/empresas" element={<Empresas />} />
            <Route path="/empresas/setores" element={<Setores />} />
            
            {/* Rotas de Estoque */}
            <Route path="/estoque/produtos" element={<Produtos />} />
            <Route path="/estoque/movimentos" element={<Movimentos />} />
            <Route path="/estoque/inventario" element={<Inventario />} />
            
            {/* Rotas Financeiras */}
            <Route path="/financeiro/pagar" element={<ContasPagar />} />
            <Route path="/financeiro/receber" element={<ContasReceber />} />
            <Route path="/financeiro/fluxo" element={<FluxoCaixa />} />
            <Route path="/financeiro/categorias" element={<Categorias />} />
            
            {/* Rotas de Vendas */}
            <Route path="/vendas/clientes" element={<Clientes />} />
            <Route path="/vendas/orcamentos" element={<Orcamentos />} />
            <Route path="/vendas/pedidos" element={<Pedidos />} />
            
            {/* Rotas Individuais */}
            <Route path="/servicos" element={<Servicos />} />
            <Route path="/relatorios" element={<Relatorios />} />
            <Route path="/configuracoes" element={<Configuracoes />} />
            
            {/* ROTA CATCH-ALL - DEVE SER A ÚLTIMA */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
