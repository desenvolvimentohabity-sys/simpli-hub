import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Users,
  Building2,
  Package,
  DollarSign,
  FileText,
  Wrench,
  BarChart3,
  Settings,
  ChevronDown,
  Box,
  ShoppingCart,
  UserCog,
  TrendingUp,
  Receipt,
  ClipboardList,
  Briefcase
} from "lucide-react";
import {
  Sidebar as SidebarComponent,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

interface MenuItem {
  title: string;
  url?: string;
  icon: any;
  children?: MenuItem[];
}

const menuItems: MenuItem[] = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Usuários",
    icon: Users,
    children: [
      { title: "Listar Usuários", url: "/usuarios", icon: Users },
      { title: "Permissões", url: "/usuarios/permissoes", icon: UserCog },
    ],
  },
  {
    title: "Empresas",
    icon: Building2,
    children: [
      { title: "Empresas", url: "/empresas", icon: Building2 },
      { title: "Setores", url: "/empresas/setores", icon: Briefcase },
    ],
  },
  {
    title: "Estoque",
    icon: Package,
    children: [
      { title: "Produtos", url: "/estoque/produtos", icon: Box },
      { title: "Entrada/Saída", url: "/estoque/movimentos", icon: Package },
      { title: "Inventário", url: "/estoque/inventario", icon: ClipboardList },
    ],
  },
  {
    title: "Financeiro",
    icon: DollarSign,
    children: [
      { title: "Contas a Pagar", url: "/financeiro/pagar", icon: DollarSign },
      { title: "Contas a Receber", url: "/financeiro/receber", icon: TrendingUp },
      { title: "Fluxo de Caixa", url: "/financeiro/fluxo", icon: BarChart3 },
      { title: "Categorias", url: "/financeiro/categorias", icon: Receipt },
    ],
  },
  {
    title: "Vendas",
    icon: ShoppingCart,
    children: [
      { title: "Clientes", url: "/vendas/clientes", icon: Users },
      { title: "Orçamentos", url: "/vendas/orcamentos", icon: FileText },
      { title: "Pedidos", url: "/vendas/pedidos", icon: ShoppingCart },
    ],
  },
  {
    title: "Serviços",
    url: "/servicos",
    icon: Wrench,
  },
  {
    title: "Relatórios",
    url: "/relatorios",
    icon: BarChart3,
  },
  {
    title: "Configurações",
    url: "/configuracoes",
    icon: Settings,
  },
];

export function Sidebar() {
  const location = useLocation();
  const { state } = useSidebar();
  const [openMenus, setOpenMenus] = useState<string[]>([]);

  // Abrir menus que contêm a rota ativa
  useEffect(() => {
    const activeMenus: string[] = [];
    menuItems.forEach((item) => {
      if (item.children) {
        const hasActiveChild = item.children.some(
          (child) => child.url === location.pathname
        );
        if (hasActiveChild) {
          activeMenus.push(item.title);
        }
      }
    });
    setOpenMenus(activeMenus);
  }, [location.pathname]);

  const toggleMenu = (title: string) => {
    setOpenMenus((prev) =>
      prev.includes(title)
        ? prev.filter((t) => t !== title)
        : [...prev, title]
    );
  };

  const isActive = (url?: string) => {
    if (!url) return false;
    return location.pathname === url;
  };

  return (
    <SidebarComponent className="border-r border-border bg-card">
      <div className="flex h-16 items-center justify-center border-b border-border px-6">
        <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          ERP System
        </h1>
      </div>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.children ? (
                    <>
                      <SidebarMenuButton
                        onClick={() => toggleMenu(item.title)}
                        className={cn(
                          "w-full justify-between hover:bg-accent/50",
                          openMenus.includes(item.title) && "bg-accent/30"
                        )}
                      >
                        <span className="flex items-center gap-2">
                          <item.icon className="h-4 w-4" />
                          {state !== "collapsed" && item.title}
                        </span>
                        {state !== "collapsed" && (
                          <ChevronDown
                            className={cn(
                              "h-4 w-4 transition-transform",
                              openMenus.includes(item.title) && "rotate-180"
                            )}
                          />
                        )}
                      </SidebarMenuButton>
                      {openMenus.includes(item.title) && (
                        <SidebarMenuSub>
                          {item.children.map((child) => (
                            <SidebarMenuSubItem key={child.title}>
                              <SidebarMenuSubButton
                                asChild
                                className={cn(
                                  "hover:bg-accent/50",
                                  isActive(child.url) &&
                                    "bg-primary/20 text-primary font-medium"
                                )}
                              >
                                <Link to={child.url || "#"}>
                                  <child.icon className="h-3 w-3" />
                                  <span>{child.title}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      )}
                    </>
                  ) : (
                    <SidebarMenuButton
                      asChild
                      className={cn(
                        "hover:bg-accent/50",
                        isActive(item.url) &&
                          "bg-primary/20 text-primary font-medium"
                      )}
                    >
                      <Link to={item.url || "#"}>
                        <item.icon className="h-4 w-4" />
                        {state !== "collapsed" && <span>{item.title}</span>}
                      </Link>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </SidebarComponent>
  );
}