export interface MenuResponse {

  titulo: string;
  icono?: string;
  url?: string;
  submenu: MenuResponse[];
}
