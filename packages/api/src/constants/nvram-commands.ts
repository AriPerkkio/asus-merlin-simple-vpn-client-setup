// Router commands
export const GET_ROUTER_IP = 'nvram get wan0_ipaddr';
export const GET_ROUTER_DNS_PRIMARY = 'nvram get wan0_dns1_x';
export const GET_ROUTER_DNS_SECONDARY = 'nvram get wan0_dns2_x';

// VPN Client commands
export const GET_VPN_CLIENTS_DESCRIPTION = (id: number): string =>
    `nvram get vpn_client${id}_desc`;
export const GET_VPN_CLIENTS_STATE = (id: number): string =>
    `nvram get vpn_client${id}_state`;
export const GET_VPN_CLIENTS_DEVICES = (id: number): string =>
    `nvram get vpn_client${id}_clientlist`;
export const DEACTIVATE_VPN_CLIENT = (id: number): string =>
    `service stop_vpnclient${id}`;
export const ACTIVATE_VPN_CLIENT = (id: number): string =>
    `service start_vpnclient${id}`;
