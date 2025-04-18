export interface SidebarItem{
    displayName : string;
    open? : boolean;
    iconName : string;
    route? : string;
    children?: SidebarItem[];
}